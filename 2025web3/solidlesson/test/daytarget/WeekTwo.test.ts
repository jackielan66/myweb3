import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
const { ethers } = require("hardhat");
import { decodeEventLog } from "viem";
const deploy = async () => {
    const [owner, user1, user2] = await hre.viem.getWalletClients();

    const userRegistry = await hre.viem.deployContract("UserRegistry");

    const UserProfile = await hre.viem.deployContract("UserProfile", ["jackie", 30n]);

    const VisibilityDemo = await hre.viem.deployContract("VisibilityDemo");

    const ErrorHandlingDemo = await hre.viem.deployContract("ErrorHandlingDemo");

    const FunctionSelectorDemo = await hre.viem.deployContract("FunctionSelectorDemo");

    const a = await hre.viem.deployContract("A");
    const b = await hre.viem.deployContract("B");
    const c = await hre.viem.deployContract("C");

    const eventCounter = await hre.viem.deployContract("EventCounter", []);


    return { FunctionSelectorDemo, userRegistry, UserProfile, VisibilityDemo, ErrorHandlingDemo, user1, a, c, b, eventCounter, owner };
};



describe("Week 2 Day 8 继承", function () {
    it("A.getNumber should return 1", async () => {
        const { a, b, c } = await loadFixture(deploy);
        expect(await a.read.getNumber()).to.equal(1n);
    });

    it("B overrides getNumber to 2", async () => {
        const { a, b, c } = await loadFixture(deploy);

        expect(await b.read.getNumber()).to.equal(2n);
    });

    it("C overrides getNumber to 3", async () => {
        const { a, b, c } = await loadFixture(deploy);

        expect(await c.read.getNumber()).to.equal(3n);
    });

    it("getValue override chain", async () => {
        const { a, b, c } = await loadFixture(deploy);

        expect(await a.read.getValue()).to.equal(10n);       // from A
        expect(await b.read.getValue()).to.equal(10n);       // inherited from A
        expect(await c.read.getValue()).to.equal(20n);       // overridden: value * 2
    });

    it("Value mutation works through inheritance", async () => {
        const { a, b, c } = await loadFixture(deploy);

        await b.write.addValue([5n]); // B modifies inherited A.value

        expect(await b.read.getValue()).to.equal(15n);
    });

});

describe("Week2 Day 10 eventCounter", function () {
    it("should emit CountIncreased event", async () => {
        const { eventCounter, owner } = await loadFixture(deploy);

        const tx = await eventCounter.write.increase(); // 调用函数

        const publicClient = await hre.viem.getPublicClient();
        const receipt = await publicClient.getTransactionReceipt({ hash: tx });
        // console.log(receipt, "receipt")
        // 断言事件
        const log = receipt.logs[0];

        expect(log).to.exist;
        // 使用 ABI 解码事件
        const rawLog = receipt.logs[0];
        const abi = hre.artifacts.readArtifactSync("EventCounter").abi;
        const decoded = decodeEventLog({
            abi,
            data: rawLog.data,
            topics: rawLog.topics,
        });

        expect(decoded.eventName).to.equal("CountIncreased");
        expect(decoded.args.sender.toLocaleLowerCase()).to.equal(owner.account.address);
        expect(decoded.args.newCount).to.equal(1n);
        // expect(log.eventName).to.equal("CountIncreased");
        // expect(log.args.sender).to.equal(owner.account.address);
        // expect(log.args.newCount).to.equal(1n);
    });

    it("should update count", async () => {
        const { eventCounter } = await loadFixture(deploy);

        await eventCounter.write.increase();
        const value = await eventCounter.read.count();
        expect(value).to.equal(1n);
    });
});


describe("Week 2 Day 11 — Function Selector", function () {

    it("should return correct function selector", async () => {
        const { FunctionSelectorDemo } = await loadFixture(deploy);

        const selector = await FunctionSelectorDemo.read.getSelector();
        console.log(selector,"selector");
        expect(selector).to.equal("0x55241077"); // keccak256("setValue(uint256)") 前 4 字节
    });

    it("should update value normally with write.setValue", async () => {
        const { FunctionSelectorDemo } = await loadFixture(deploy);

        await FunctionSelectorDemo.write.setValue([123n]);
        expect(await FunctionSelectorDemo.read.value()).to.equal(123n);
    });

    it("fallback should catch unknown selectors", async () => {
        const { FunctionSelectorDemo, owner } = await loadFixture(deploy);

        const publicClient = await hre.viem.getPublicClient();

        // 手动构造一个不存在的 selector
        const badSelector = "0x12345678";

        const tx = await owner.sendTransaction({
            to: FunctionSelectorDemo.address,
            data: badSelector,
        });

        const receipt = await publicClient.getTransactionReceipt({ hash: tx });
        console.log(receipt,"FunctionSelectorDemo receipt")
        expect(receipt.status).to.equal("success");

        // // 解码返回值
        // const returnData = receipt.logs.length === 0
        //     ? receipt.returnData
        //     : receipt.logs[0].data;

        // expect(returnData.startsWith("0x")).to.be.true;
    });
});



