const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("完整调用流程学习 (ethers v6)", function () {
  let TokenA, TokenB, tokenA, tokenB;
  let Factory, PoolManager, PositionManager;
  let factory, poolManager, positionManager;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // 部署两个代币
    TokenA = await ethers.getContractFactory("ERC20Mock");
    TokenB = await ethers.getContractFactory("ERC20Mock");
    tokenA = await TokenA.deploy("TokenA", "TKA", 18);
    tokenB = await TokenB.deploy("TokenB", "TKB", 18);
    await tokenA.waitForDeployment();
    await tokenB.waitForDeployment();

    // 给用户一些代币
    await tokenA.mint(user.address, ethers.parseEther("1000"));
    await tokenB.mint(user.address, ethers.parseEther("1000"));

    // 部署 Factory
    Factory = await ethers.getContractFactory("Factory");
    factory = await Factory.deploy();
    await factory.waitForDeployment();

    // 部署 PoolManager（继承 Factory）
    const PoolManagerContract = await ethers.getContractFactory("PoolManager");
    poolManager = await PoolManagerContract.deploy();
    await poolManager.waitForDeployment();

    // 部署 PositionManager
    const PositionManagerContract = await ethers.getContractFactory("PositionManager");
    positionManager = await PositionManagerContract.deploy(poolManager.target);
    await positionManager.waitForDeployment();
  });

  it("完整流程：创建池子 -> 初始化 -> 添加流动性", async function () {
    // Step1: 创建池子
    const params = {
      token0: tokenA.target,
      token1: tokenB.target,
      tickLower: -887220,
      tickUpper: 887220,
      fee: 3000,
      sqrtPriceX96: ethers.parseUnits("1", 18), // 初始价格
    };

    const tx = await poolManager.createAndInitializePoolIfNecessary(params);
    const receipt = await tx.wait();

    // 解析事件日志，找到 PoolCreated
    let poolAddress;
    for (const log of receipt.logs) {
      try {
        const parsed = poolManager.interface.parseLog(log);
        if (parsed.name === "PoolCreated") {
          poolAddress = parsed.args.pool;
        }
      } catch (err) {
        // 不是这个合约的事件，忽略
      }
    }

    expect(poolAddress).to.not.equal(ethers.ZeroAddress);

    // Step2: 用户授权 PositionManager
    await tokenA.connect(user).approve(positionManager.target, ethers.parseEther("100"));
    await tokenB.connect(user).approve(positionManager.target, ethers.parseEther("100"));

    // Step3: 用户添加流动性
    const mintParams = {
      token0: tokenA.target,
      token1: tokenB.target,
      tickLower: -887220,
      tickUpper: 887220,
      fee: 3000,
      recipient: user.address,
      amount0Desired: ethers.parseEther("10"),
      amount1Desired: ethers.parseEther("10"),
    };

    await positionManager.connect(user).mint(mintParams);

    // Step4: 验证结果
    const pool = await ethers.getContractAt("Pool", poolAddress);
    const liquidity = await pool.liquidity();
    expect(liquidity).to.be.gt(0);

    console.log("✅ 流动性添加成功，池子地址:", poolAddress);
  });
});
