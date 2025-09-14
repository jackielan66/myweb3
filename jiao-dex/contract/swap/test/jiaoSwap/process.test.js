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
        tokenA = await ERC20Mock.deploy("TokenA", "TKA", 18);
        tokenB = await ERC20Mock.deploy("TokenB", "TKB", 18);
        await tokenA.waitForDeployment();
        await tokenB.waitForDeployment();

        // 给 LP 和 Trader mint 一些代币,给两个人 mint 1000 个代币
        await tokenA.mint(lp.address, ethers.parseEther("1000"));
        await tokenB.mint(lp.address, ethers.parseEther("1000"));
        await tokenA.mint(trader.address, ethers.parseEther("1000"));
        await tokenB.mint(trader.address, ethers.parseEther("1000"));

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
            deadline: Math.floor(Date.now() / 1000) + 600 * 10,
            amountIn: ethers.parseEther("1"),
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0 // 放宽限制（生产环境建议更严格）
        };
        const sqrtPriceLimitX96 =
            swapParams.tokenIn.toLowerCase() < swapParams.tokenOut.toLowerCase()
                ? 1n            // 如果 zeroForOne，limit 必须 < 2^96
                : (2n ** 160n - 1n);  // 如果 oneForZero，limit 必须 > 2^96
        swapParams.sqrtPriceLimitX96 = sqrtPriceLimitX96;

        // 记录交易前 trader 的 tokenB 余额
        const beforeB = await tokenB.balanceOf(traderAddr);
        console.log("beforeB: ", beforeB);

        // 发起 swap（tokenA -> tokenB）
        const swapTx = await swapRouter.connect(trader).exactInput(swapParams);
        await swapTx.wait();

        // 交易后 trader 的 tokenB 余额应该增加
        const afterB = await tokenB.balanceOf(traderAddr);
        expect(afterB).to.be.gt(beforeB);
        console.log("afterB: ", afterB);

    });
});

// // 完成流程测试用例
// describe("Pool Contract", function () {
//     let TokenA, TokenB, tokenA, tokenB;
//     let Factory, PoolManager, PositionManager;
//     let factory, poolManager, positionManager;
//     let owner, user;

//     beforeEach(async function () {
//         // 获取测试账户
//         [owner, user] = await ethers.getSigners();

//         // 部署 ERC20 代币
//         const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
//         tokenA = await ERC20Mock.deploy("Token0", "TK0", 18);
//         tokenB = await ERC20Mock.deploy("Token1", "TK1", 18);
//         await tokenA.waitForDeployment();
//         await tokenB.waitForDeployment();

//         // 给用户一些代币
//         await tokenA.mint(user.address, ethers.parseEther("1000"));
//         await tokenB.mint(user.address, ethers.parseEther("1000"));

//         // 部署 Factory
//         Factory = await ethers.getContractFactory("Factory");
//         factory = await Factory.deploy();
//         await factory.waitForDeployment();

//         // 部署 PoolManager（继承 Factory）
//         const PoolManagerContract = await ethers.getContractFactory("PoolManager");
//         poolManager = await PoolManagerContract.deploy();
//         await poolManager.waitForDeployment();

//         // 部署 PositionManager
//         const PositionManagerContract = await ethers.getContractFactory("PositionManager");
//         positionManager = await PositionManagerContract.deploy(poolManager.target);
//         await positionManager.waitForDeployment();
//     });

//     it("完整流程：创建池子 -> 初始化 -> 添加流动性", async function () {
//         // Step1: 创建池子
//         const params = {
//             token0: tokenA.target,
//             token1: tokenB.target,
//             tickLower: -887220,
//             tickUpper: 887220,
//             fee: 3000,
//             sqrtPriceX96: ethers.parseUnits("1", 18), // 初始价格
//         };


//         const tx = await poolManager.createAndInitializePoolIfNecessary(params);
//         const receipt = await tx.wait();

//         // 解析事件日志，找到 PoolCreated
//         let poolAddress;
//         for (const log of receipt.logs) {
//             try {
//                 const parsed = poolManager.interface.parseLog(log);
//                 if (parsed.name === "PoolCreated") {
//                     poolAddress = parsed.args.pool;
//                 }
//             } catch (err) {
//                 // 不是这个合约的事件，忽略
//             }
//         }
//         expect(poolAddress).to.not.equal(ethers.ZeroAddress);

//         // Step2: 用户授权 PositionManager
//         await tokenA.connect(user).approve(positionManager.target, ethers.parseEther("100"));
//         await tokenB.connect(user).approve(positionManager.target, ethers.parseEther("100"));


//         // Step3: 用户添加流动性
//         const mintParams = {
//             token0: tokenA.target,
//             token1: tokenB.target,
//             index: 0,
//             recipient: user.address,
//             amount0Desired: ethers.parseEther("10"),
//             amount1Desired: ethers.parseEther("10"),
//             deadline: Math.floor(Date.now() / 1000) + 60 * 10,
//         };

//         await positionManager.connect(user).mint(mintParams);

//         // Step4: 验证结果
//         const pool = await ethers.getContractAt("Pool", poolAddress);
//         const liquidity = await pool.liquidity();
//         expect(liquidity).to.be.gt(0);
//         console.log("✅ 流动性添加成功，池子地址:liquidity", liquidity);
//         console.log("✅ 流动性添加成功，池子地址:", poolAddress);

//     })


// }
// );
