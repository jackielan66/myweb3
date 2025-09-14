const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pool Contract", function () {
    let factory, token0, token1, pool;
    let owner, user1, user2;

    beforeEach(async function () {
        // 获取测试账户
        [owner, user1, user2] = await ethers.getSigners();

        // 部署 ERC20 代币
        const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
        token0 = await ERC20Mock.deploy("Token0", "TK0", 18);
        token1 = await ERC20Mock.deploy("Token1", "TK1", 18);

        // 部署 Factory
        const Factory = await ethers.getContractFactory("Factory");
        factory = await Factory.deploy();

        // --- 关键改动：在测试里先对 token 地址排序 ---
        let [addrA, addrB] =
            token0.target.toLowerCase() < token1.target.toLowerCase()
                ? [token0.target, token1.target]
                : [token1.target, token0.target];

        // 创建 Pool
        const tx = await factory.createPool(
            addrA,
            addrB,
            -887220, // tickLower
            887220,  // tickUpper
            3000     // fee
        );
        await tx.wait();

        // 获取 Pool 地址
        const poolAddr = await factory.getPool(addrA, addrB, 0);
        const Pool = await ethers.getContractFactory("Pool");
        pool = Pool.attach(poolAddr);
    });

    it("should initialize pool correctly", async function () {
        // 初始化池子，这个是此时测试，这里直接写死，当前这个池子的价格
        await pool.initialize("79228162514264337593543950336"); // sqrtPriceX96 ~ 1

        const token0Addr = await pool.token0();
        const token1Addr = await pool.token1();

        expect([token0Addr, token1Addr]).to.include(token0.target);
        expect([token0Addr, token1Addr]).to.include(token1.target);

        const fee = await pool.fee();
        expect(fee).to.equal(3000);
    });

    it("mint po", async function () {
        
    });
}
);
