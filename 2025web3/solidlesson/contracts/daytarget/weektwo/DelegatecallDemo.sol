// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


contract LogicV1 {
    uint256 public x;

    function setX(uint256 newX) external {
        x = newX;
    }
}

contract Proxy {
    uint256 public x;
    address public implementation;

    constructor(address impl) {
        implementation = impl;
    }

    function upgrade(address newImpl) external {
        implementation = newImpl;
    }

    function _delegate(address impl) internal {
        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)

            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }

    fallback() external {
        _delegate(implementation);
    }
}



// 下面是你的 **Day 13 — Solidity 20 分钟学习计划（Week 2）**
// 主题：**delegatecall（Solidity 最强 & 最危险的底层特性）**
// 依旧包含：
// ✓ 清晰学习结构
// ✓ 实战合约
// ✓ 你指定格式的 **Hardhat + Viem** 测试用例
// ✓ **每日英语语法点 + BBC Learning 链接**

// ---

// # 🎯 **📘 今日主题：delegatecall 深入理解（核心概念 + 风险 + 实战）**

// `delegatecall` = “在 *别人的代码* 中执行 *自己的 storage*”。

// 理解它，你就能理解：

// * 代理合约（Proxy）
// * 可升级合约（UUPS、Transparent Proxy）
// * Minimal Proxy（EIP-1167）
// * DEFI 黑客漏洞中最常见的攻击方式之一

// ---

// # 🧨 **1️⃣ delegatecall 的核心机制（必须掌握）**

// 当 A 使用 `delegatecall` 调用 B：

// * **执行 B 的代码**
// * **但 storage 写入的是 A 的 storage**
// * msg.sender = 原调用者
// * address(this) = A 的地址

// 简化公式：

// ```
// (delegatecall) = execute(B.logic) with A.storage
// ```

// ---

// # 🧩 **📄 Day 13 合约：DelegatecallDemo.sol**

// 我们做一个最基础的代理（不是 OpenZeppelin 的，纯手写，便于理解底层）

// ```solidity
// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// contract LogicV1 {
//     uint256 public x;

//     function setX(uint256 newX) external {
//         x = newX;
//     }
// }

// contract Proxy {
//     uint256 public x;
//     address public implementation;

//     constructor(address impl) {
//         implementation = impl;
//     }

//     function upgrade(address newImpl) external {
//         implementation = newImpl;
//     }

//     function _delegate(address impl) internal {
//         assembly {
//             calldatacopy(0, 0, calldatasize())

//             let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)

//             returndatacopy(0, 0, returndatasize())

//             switch result
//             case 0 { revert(0, returndatasize()) }
//             default { return(0, returndatasize()) }
//         }
//     }

//     fallback() external {
//         _delegate(implementation);
//     }
// }
// ```

// 你会看到：

// * 调用 Proxy 的 `setX()` → 实际执行 LogicV1 的函数
// * 但是写入 storage → Proxy.x（不是 LogicV1.x）

// 这是所有可升级合约的基础。

// ---

// # 🧪 **📌 Day 13 — Viem 测试用例（严格符合你的格式）**

// ```javascript
// import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
// import { expect } from "chai";
// import hre from "hardhat";
// const { ethers } = require("hardhat");

// const deploy = async () => {
//     const [owner] = await hre.viem.getWalletClients();

//     const logicV1 = await hre.viem.deployContract("LogicV1");

//     const proxy = await hre.viem.deployContract("Proxy", [logicV1.address]);

//     // 通过 Proxy 创建合约实例（用 LogicV1 的 ABI）
//     const proxyAsLogicV1 = await hre.viem.getContractAt(
//         "LogicV1",
//         proxy.address
//     );

//     return { owner, logicV1, proxy, proxyAsLogicV1 };
// };

// describe("Week 2 Day 13 — delegatecall basics", function () {

//     it("proxy should use logicV1 to set x", async () => {
//         const { proxyAsLogicV1, proxy } = await loadFixture(deploy);

//         await proxyAsLogicV1.write.setX([123n]);

//         const value = await proxyAsLogicV1.read.x();
//         expect(value).to.equal(123n);

//         // 逻辑合约 storage 不变
//         const logicValue = await hre.viem.getContractAt("LogicV1", proxyAsLogicV1.address).read.x();
//         expect(logicValue).to.equal(123n);
//     });

//     it("proxy storage should change, not logic storage", async () => {
//         const { logicV1, proxyAsLogicV1 } = await loadFixture(deploy);

//         await proxyAsLogicV1.write.setX([999n]);
//         const proxyValue = await proxyAsLogicV1.read.x();
//         expect(proxyValue).to.equal(999n);

//         const logicValue = await logicV1.read.x();
//         expect(logicValue).to.equal(0n);
//     });

// });
// ```

// ---

// # 🧠 今日总结（20 分钟）

// 你掌握了：

// * `delegatecall` 执行逻辑合约 + 写入代理 storage
// * 为什么 proxy 需要 ABI 重绑定（getContractAt）
// * 为什么可升级需要保证 storage layout 100% 对齐
// * 为什么很多 DEFI 漏洞来自 delegatecall storage 冲突

// 这部分内容对你以后的 **可升级合约、Vault、安全审计** 都是核心基础。

// ---

// # 📘 今日英语小练习（符合你要求：包含已学语法）

// **Grammar：过去完成时（Past Perfect Tense）**
// 结构：**had + past participle**

// 例句（与你的开发场景相关）：

// * *Before I deployed the contract, I had reviewed the storage layout twice.*
// * *The system had failed before we applied the new proxy upgrade.*




