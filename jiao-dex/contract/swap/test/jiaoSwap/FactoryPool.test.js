// test/FactoryPool.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Factory and Pool Test", function () {
  let factory;
  let token0;
  let token1;
  let owner;
  let user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    // 部署 ERC20 Mock 合约
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    
    // 部署两个测试代币
    token0 = await ERC20Mock.deploy("Token A", "TA", ethers.parseEther("1000000"));
    token1 = await ERC20Mock.deploy("Token B", "TB", ethers.parseEther("1000000"));
    console.log("ERC20Mock deployed to:", token0.target, token1.target);
    // await token0.deployed();
    // await token1.deployed();
    // 部署 Factory 合约
    const Factory = await ethers.getContractFactory("Factory");
    factory = await Factory.deploy();
    // await factory.deployed();

    // 给用户转账一些测试代币
    await token0.transfer(user.address, ethers.parseEther("1000"));
    await token1.transfer(user.address, ethers.parseEther("1000"));
  });

  describe("createPool", function () {
    it("应该成功创建池子", async function () {
      const tickLower = -1000;
      const tickUpper = 1000;
      const fee = 3000; // 0.3%

      // 创建池子
      const tx = await factory.createPool(
        token0.target,
        token1.target,
        tickLower,
        tickUpper,
        fee
      );

      // 等待交易确认
      await tx.wait();

      // 检查事件是否触发
      await expect(tx)
        .to.emit(factory, "PoolCreated")
        .withArgs(
          token0.target < token1.target ? token0.target : token1.target,
          token0.target < token1.target ? token1.target : token0.target,
          0, // index
          tickLower,
          tickUpper,
          fee,
          expect.any(String) // 池子地址
        );

      // 验证池子地址可以通过 getPool 获取
      const poolAddress = await factory.getPool(token0.target, token1.target, 0);
      expect(poolAddress).to.not.equal(ethers.constants.AddressZero);
    });

    it("不应该创建相同的代币地址", async function () {
      await expect(
        factory.createPool(token0.target, token0.target, -1000, 1000, 3000)
      ).to.be.revertedWith("IDENTICAL_ADDRESSES");
    });
  });

  describe("mint", function () {
    let pool;
    const tickLower = -1000;
    const tickUpper = 1000;
    const fee = 3000;
    // 修正：使用正确的 parseUnits 格式
    const initialPrice = ethers.parseEther("1.0"); // 使用 parseEther 而不是 parseUnits

    beforeEach(async function () {
      // 创建池子
      await factory.createPool(token0.target, token1.target, tickLower, tickUpper, fee);
      const poolAddress = await factory.getPool(token0.target, token1.target, 0);
      
      const Pool = await ethers.getContractFactory("Pool");
      pool = Pool.attach(poolAddress);

      // 初始化池子价格 - 如果 initialize 需要特定格式，可能需要调整
      try {
        await pool.initialize(initialPrice);
      } catch (error) {
        // 如果价格格式不对，尝试其他格式
        const alternativePrice = ethers.BigNumber.from("79228162514264337593543950336"); // 1.0 in Q96 format
        await pool.initialize(alternativePrice);
      }
    });

    it("应该成功添加流动性", async function () {
      const mintAmount = ethers.parseEther("100"); // 100 流动性

      // 实现 MintCallback 合约
      const MintCallback = await ethers.getContractFactory("TestMintCallback");
      const mintCallback = await MintCallback.deploy();
      await mintCallback.deployed();

      // 用户授权代币给回调合约
      await token0.connect(user).approve(mintCallback.address, ethers.constants.MaxUint256);
      await token1.connect(user).approve(mintCallback.address, ethers.constants.MaxUint256);

      // 估算需要提供的代币数量
      const estimatedAmount0 = ethers.parseEther("50");
      const estimatedAmount1 = ethers.parseEther("50");

      // 执行 mint
      const tx = await mintCallback.connect(user).mint(
        pool.address,
        user.address,
        mintAmount,
        estimatedAmount0,
        estimatedAmount1
      );

      await expect(tx)
        .to.emit(pool, "Mint")
        .withArgs(
          mintCallback.address,
          user.address,
          mintAmount,
          expect.any(String), // amount0
          expect.any(String)  // amount1
        );
    });
  });
});