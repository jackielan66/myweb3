import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";


const deploy = async () => {
    const UserRegistry = await hre.viem.deployContract("UserRegistry");

    return { UserRegistry };
};


describe("Week 1", function () {
    it("Should register ", async function () {
        const { UserRegistry } = await loadFixture(deploy);
        await UserRegistry.write.register(["my message",12]);
        expect(await UserRegistry.read.getMyInfo()).to.equal('my message');
        // expect(await UserRegistry.read.getMessage()).to.equal('my message');
    });
});