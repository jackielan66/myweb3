import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";


const deploy = async () => {
    const WeekOne = await hre.viem.deployContract("WeekOne", ['my message1']);

    return { WeekOne };
};


describe("Week 1", function () {
    it("Should return message ", async function () {
        const { WeekOne } = await loadFixture(deploy);
        expect(await WeekOne.read.getMessage()).to.equal('my message');
    });
});