import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
const { ethers } = require("hardhat");

const deploy = async () => {
    const userRegistry = await hre.viem.deployContract("UserRegistry");

    const UserProfile = await hre.viem.deployContract("UserProfile", ["jackie", 30n]);

    return { userRegistry, UserProfile };
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
    it("should emit ProfileUpdated event", async () => {
        const { UserProfile } = await loadFixture(deploy);

        // 获取测试账户
        const [owner] = await hre.viem.getWalletClients();

        // 调用 updateProfile 并获取交易收据
        const hash = await UserProfile.write.updateProfile(["NewJackie", 22n]);

        // 获取事件触发
        const profileEvents = await UserProfile.getEvents.ProfileUpdated();
        expect(profileEvents).to.have.lengthOf(1);
        expect(profileEvents[0].args.name).to.equal('NewJackie');
        expect(profileEvents[0].args.age).to.equal(22n);

    });
});



