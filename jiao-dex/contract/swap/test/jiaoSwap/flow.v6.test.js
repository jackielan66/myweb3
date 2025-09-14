// test/flow.v6.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("完整调用流程学习 (ethers v6)", function () {
  let deployer, lp, trader;
  let ERC20Mock, tokenA, tokenB;
  let PoolManager, poolManager;
  let PositionManager, positionManager;
  let SwapRouter, swapRouter;
  let poolAddress, pool;

  // Pool params (wide range so sqrtPrice=1 is inside)
  const tickLower = -887220;
  const tickUpper = 887220;
  const fee = 3000;

  beforeEach(async function () {
    [deployer, lp, trader] = await ethers.getSigners();

    // 1) 部署两个 ERC20 Mock（确保合约有 mint(address,uint256)）
    ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    tokenA = await ERC20Mock.deploy("Token A", "TKA");
    await tokenA.waitForDeployment();
    tokenB = await ERC20Mock.deploy("Token B", "TKB");
    await tokenB.waitForDeployment();

    // 给 LP 和 Trader mint 一些代币
    await tokenA.mint(await lp.getAddress(), ethers.parseEther("1000"));
    await tokenB.mint(await lp.getAddress(), ethers.parseEther("1000"));
    await tokenA.mint(await trader.getAddress(), ethers.parseEther("1000"));
    await tokenB.mint(await trader.getAddress(), ethers.parseEther("1000"));

    // 2) 部署 PoolManager（继承 Factory）
    PoolManager = await ethers.getContractFactory("PoolManager");
    poolManager = await PoolManager.deploy();
    await poolManager.waitForDeployment();

    // 3) 部署 PositionManager（需要 poolManager 地址）
    PositionManager = await ethers.getContractFactory("PositionManager");
    positionManager = await PositionManager.deploy(poolManager.target);
    await positionManager.waitForDeployment();

    // 4) 部署 SwapRouter（需要 poolManager 地址）
    SwapRouter = await ethers.getContractFactory("SwapRouter");
    swapRouter = await SwapRouter.deploy(poolManager.target);
    await swapRouter.waitForDeployment();

    // 5) 创建并初始化池子（通过 PoolManager 的一键方法）
    // PoolManager 要求 token0 < token1（地址比较），这里按地址排序
    const addrA = await tokenA.getAddress();
    const addrB = await tokenB.getAddress();
    const [token0Addr, token1Addr] =
      addrA.toLowerCase() < addrB.toLowerCase() ? [addrA, addrB] : [addrB, addrA];

    // sqrtPriceX96：选择 1 的 sqrt 表示 price = 1，sqrtPriceX96 = 2^96
    const sqrtPriceX96 = 2n ** 96n;

    // 调用 createAndInitializePoolIfNecessary（传 struct）
    await poolManager.createAndInitializePoolIfNecessary({
      token0: token0Addr,
      token1: token1Addr,
      tickLower: tickLower,
      tickUpper: tickUpper,
      fee: fee,
      sqrtPriceX96: sqrtPriceX96
    });

    // 读取 pool 地址（index 0，因为刚创建）
    poolAddress = await poolManager.getPool(token0Addr, token1Addr, 0);
    const Pool = await ethers.getContractFactory("Pool");
    pool = Pool.attach(poolAddress);
  });

  it("full lifecycle: create pool -> mint -> swap -> burn -> collect", async function () {
    // -------------------------
    // A. 检查池子已创建 & 已初始化
    // -------------------------
    expect(poolAddress).to.not.equal(ethers.ZeroAddress);

    const sqrt = await pool.sqrtPriceX96();
    expect(sqrt).to.equal(2n ** 96n); // 我们初始化传入的值

    // -------------------------
    // B. LP 授权并 mint（添加流动性，铸 NFT）
    // -------------------------
    const lpAddr = await lp.getAddress();

    // LP 批准 PositionManager 拉走其 token（mintCallback 中会调用 transferFrom）
    await tokenA.connect(lp).approve(positionManager.target, ethers.parseEther("200"));
    await tokenB.connect(lp).approve(positionManager.target, ethers.parseEther("200"));

    // Mint 参数：注意包含 deadline（PositionManager 使用 checkDeadline）
    const mintParams = {
      token0: await tokenA.getAddress(),
      token1: await tokenB.getAddress(),
      index: 0, // 我们创建的 pool 在 index 0
      amount0Desired: ethers.parseEther("10"),
      amount1Desired: ethers.parseEther("10"),
      recipient: lpAddr,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10 // 10 分钟后过期
    };

    // 发起 mint
    const mintTx = await positionManager.connect(lp).mint(mintParams);
    await mintTx.wait();

    // NFT（positionId）从 1 开始，owner 应为 recipient（lp）
    const nftOwner = await positionManager.ownerOf(1);
    expect(nftOwner).to.equal(lpAddr);

    // pool 的流动性应有增加（ > 0）
    const poolLiquidity = await pool.liquidity();
    expect(poolLiquidity).to.be.gt(0);

    // -------------------------
    // C. Trader 授权并进行 swap（TokenA -> TokenB）
    // -------------------------
    const traderAddr = await trader.getAddress();

    // Trader 给 SwapRouter 授权用于在回调时 transferFrom
    await tokenA.connect(trader).approve(swapRouter.target, ethers.parseEther("20"));

    // exactInput 参数（结构体需和 SwapRouter 定义一致）
    const swapParams = {
      tokenIn: await tokenA.getAddress(),
      tokenOut: await tokenB.getAddress(),
      indexPath: [0], // 走 pool index 0
      recipient: traderAddr,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10,
      amountIn: ethers.parseEther("5"),
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0 // 放宽限制（生产环境建议更严格）
    };

    // 记录交易前 trader 的 tokenB 余额
    const beforeB = await tokenB.balanceOf(traderAddr);

    // 发起 swap（tokenA -> tokenB）
    const swapTx = await swapRouter.connect(trader).exactInput(swapParams);
    await swapTx.wait();

    // 交易后 trader 的 tokenB 余额应该增加
    const afterB = await tokenB.balanceOf(traderAddr);
    expect(afterB).to.be.gt(beforeB);

    // -------------------------
    // D. LP 移除流动性（burn）
    // -------------------------
    // LP 调用 burn（移除其 position 的全部流动性）
    const burnTx = await positionManager.connect(lp).burn(1);
    await burnTx.wait();

    // 查询 position 结构体，观察 tokensOwed（注意返回是 BigInt）
    const pos = await positionManager.positions(1);
    // pos is a tuple. tokensOwed0 is at index matching your PositionInfo struct; we'll check fields by name if available
    // In ethers v6 you can access by .tokensOwed0 if solidity returns named fields; otherwise index
    const owed0 = pos.tokensOwed0 ?? pos[8]; // fallback by index if needed
    const owed1 = pos.tokensOwed1 ?? pos[9];

    // owed could be zero if no fees have been accrued; at least check types
    expect(typeof owed0).to.equal("bigint");
    expect(typeof owed1).to.equal("bigint");

    // -------------------------
    // E. LP collect（领取 owed）
    // -------------------------
    const lpBeforeA = await tokenA.balanceOf(lpAddr);
    const lpBeforeB = await tokenB.balanceOf(lpAddr);

    const collectTx = await positionManager.connect(lp).collect(1, lpAddr);
    await collectTx.wait();

    const lpAfterA = await tokenA.balanceOf(lpAddr);
    const lpAfterB = await tokenB.balanceOf(lpAddr);

    // lp 的余额应该没有减少（至少 >= 前），如果有 owed，应该增加
    expect(lpAfterA).to.be.at.least(lpBeforeA);
    expect(lpAfterB).to.be.at.least(lpBeforeB);

    // 如果 position.liquidity == 0，collect 会销毁 NFT（ownerOf 将 revert），这里我们避免再次调用 ownerOf
    // 但我们可以检查 positions mapping 没有流动性
    const posAfter = await positionManager.positions(1);
    const liquidityAfter = posAfter.liquidity ?? posAfter[6];
    expect(liquidityAfter).to.equal(0);
  });
});
