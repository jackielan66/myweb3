import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
const { ethers } = require("hardhat");

const deploy = async () => {
    const [owner, user1, user2] = await hre.viem.getWalletClients();

    const userRegistry = await hre.viem.deployContract("UserRegistry");

    const UserProfile = await hre.viem.deployContract("UserProfile", ["jackie", 30n]);

    const VisibilityDemo = await hre.viem.deployContract("VisibilityDemo");

    const ErrorHandlingDemo = await hre.viem.deployContract("ErrorHandlingDemo");

    return { userRegistry, UserProfile, VisibilityDemo, ErrorHandlingDemo, user1 };
};


describe("Week 1", function () {
    // it("Should register user registry contract", async function () {
    //     const { userRegistry } = await loadFixture(deploy);
    //     await userRegistry.write.register(["my message", 12n]);
    //     let info = await userRegistry.read.getMyInfo();
    //     expect(info[0]).to.equal('my message nor');
    //     // expect(await UserRegistry.read.getMessage()).to.equal('my message');
    // });

    // 事件触发
    // it("should emit ProfileUpdated event", async () => {
    //     const { UserProfile } = await loadFixture(deploy);

    //     // 获取测试账户
    //     const [owner] = await hre.viem.getWalletClients();

    //     // 调用 updateProfile 并获取交易收据
    //     const hash = await UserProfile.write.updateProfile(["NewJackie", 22n]);

    //     // 获取事件触发
    //     const profileEvents = await UserProfile.getEvents.ProfileUpdated();
    //     expect(profileEvents).to.have.lengthOf(1);
    //     expect(profileEvents[0].args.name).to.equal('NewJackie');
    //     expect(profileEvents[0].args.age).to.equal(22n);

    // });

    // 测试函数可见性
    // it("should test visibility 测试函数可见性 day5", async () => {
    //     const { VisibilityDemo } = await loadFixture(deploy);
    //     // 获取测试账户
    //     const [owner] = await hre.viem.getWalletClients();

    //     expect(await VisibilityDemo.read.getBase()).to.equal(100n);

    //     expect(await VisibilityDemo.read.getSecretExternal()).to.equal(42n);

    //     const r = await VisibilityDemo.read.compute();
    //     // a = baseValue + 10 = 110
    //     // b = secretNumber * 2 = 84
    //     expect(r[0]).to.equal(110n);
    //     expect(r[1]).to.equal(84);

    // })

    // ErrorHandlingDemo 错误边界处理
    it("should test error handling 错误边界处理 day5", async () => {
        const { ErrorHandlingDemo, user1 } = await loadFixture(deploy);
        // 错误边界处理    
        // 使用 Hardhat 的异常断言 expect(.to.be.rejectedWith('Value must be 1 or 2');
        await expect(ErrorHandlingDemo.write.setValue([0n], {
            account: user1.account.address,
        })).to.be.rejectedWith('金额必须大于- Value must be > 0"')
        // evertedWith("Value must be > 0");




    });


});



