// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LogicV1 {
    uint256 public x;

    function setX(uint256 newValue) external {
        x = newValue;
    }
}

contract TransparentProxy {
    address public implementation;
    address public admin;

    constructor(address impl, address adm) {
        implementation = impl;
        admin = adm;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function upgrade(address newImpl) external onlyAdmin {
        implementation = newImpl;
    }

    fallback() external payable {
        if (msg.sender == admin) {
            revert("Admin cannot access logic");
        }

        address impl = implementation;

        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)

            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}


// 下面是你的 **Day 14 — Solidity 20 分钟学习计划（Week 2）**
// 今天主题：**代理升级合约（Upgradeability）基础 — Transparent Proxy 模式解析**
// 继续保持：
// ✓ 清晰结构
// ✓ 实战代码
// ✓ 严格使用你指定格式的 **Hardhat + Viem 测试用例**
// ✓ 今日英语 + BBC 链接（根据你的偏好）

// ---

// # 🎯 **📘 今日主题：透明代理（Transparent Proxy Pattern）基础解析**

// 你昨天学了 `delegatecall` ，今天我们把它推到可升级合约的实际模式之一：
// **Transparent Upgradeable Proxy（透明代理）**

// 这是当前链上使用最广、最安全的可升级方式之一（OpenZeppelin 也是基于这个）。

// ---

// # ⭐ 透明代理的核心机制

// 透明代理有两个关键角色：

// | 角色        | 权限           |
// | --------- | ------------ |
// | **Admin** | 可以升级实现合约     |
// | **User**  | 可以正常调用逻辑合约函数 |

// **最关键特点：Admin 调用 fallback 不会触发 delegatecall，而普通用户会。**

// 为什么？

// 为了避免 Admin 执行逻辑函数（会冲突）。

// ---

// # 🧠 透明代理调用规则：

// ```
// if caller == admin:
//     treat function calls as admin-only functions (e.g. upgrade)
// else:
//     delegatecall to logic contract
// ```

// ---

// # 🧩 **📄 Day 14 Solidity 合约：TransparentProxyDemo.sol**

// 我们实现一个极简透明代理（便于理解原理）
// （实际项目请用 OZ 的 Proxy）

// ```solidity
// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// contract LogicV1 {
//     uint256 public x;

//     function setX(uint256 newValue) external {
//         x = newValue;
//     }
// }

// contract TransparentProxy {
//     address public implementation;
//     address public admin;

//     constructor(address impl, address adm) {
//         implementation = impl;
//         admin = adm;
//     }

//     modifier onlyAdmin() {
//         require(msg.sender == admin, "Not admin");
//         _;
//     }

//     function upgrade(address newImpl) external onlyAdmin {
//         implementation = newImpl;
//     }

//     fallback() external payable {
//         if (msg.sender == admin) {
//             revert("Admin cannot access logic");
//         }

//         address impl = implementation;

//         assembly {
//             calldatacopy(0, 0, calldatasize())

//             let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)

//             returndatacopy(0, 0, returndatasize())

//             switch result
//             case 0 { revert(0, returndatasize()) }
//             default { return(0, returndatasize()) }
//         }
//     }
// }
// ```

// ---

// # 🧪 **📌 Day 14 — Viem 测试用例（严格遵守你的模板）**

// ✔ import 使用你指定格式
// ✔ loadFixture
// ✔ hre.viem.deployContract
// ✔ walletClients
// ✔ read/write
// ✔ publicClient.getTransactionReceipt（兼容 2.27.0）

// ```javascript
// import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
// import { expect } from "chai";
// import hre from "hardhat";
// const { ethers } = require("hardhat");

// const deploy = async () => {
//     const [admin, user] = await hre.viem.getWalletClients();

//     const logicV1 = await hre.viem.deployContract("LogicV1");

//     const proxy = await hre.viem.deployContract("TransparentProxy", [
//         logicV1.address,
//         admin.account.address,
//     ]);

//     const proxyAsLogicV1 = await hre.viem.getContractAt("LogicV1", proxy.address);

//     return { admin, user, logicV1, proxy, proxyAsLogicV1 };
// };

// describe("Week 2 Day 14 — Transparent Proxy", function () {

//     it("user can call logic via proxy (delegatecall works)", async () => {
//         const { proxyAsLogicV1, user } = await loadFixture(deploy);

//         await proxyAsLogicV1.write.setX([111n], { account: user.account });

//         const result = await proxyAsLogicV1.read.x();
//         expect(result).to.equal(111n);
//     });

//     it("admin cannot access logic functions through proxy fallback", async () => {
//         const { proxyAsLogicV1, admin } = await loadFixture(deploy);

//         await expect(
//             proxyAsLogicV1.write.setX([222n], { account: admin.account })
//         ).to.be.rejectedWith("Admin cannot access logic");
//     });

//     it("admin can upgrade logic implementation", async () => {
//         const { proxy, admin, proxyAsLogicV1 } = await loadFixture(deploy);

//         const logicV2 = await hre.viem.deployContract("LogicV1");

//         await proxy.write.upgrade([logicV2.address], { account: admin.account });

//         await proxyAsLogicV1.write.setX([999n], { account: admin.account, value: 0n })
//             .catch(() => {}); 

//         const { proxyAsLogicV2 } = {
//             proxyAsLogicV2: await hre.viem.getContractAt("LogicV1", proxy.address),
//         };

//         await proxyAsLogicV2.write.setX([333n]);

//         const result = await proxyAsLogicV2.read.x();
//         expect(result).to.equal(333n);
//     });

// });
// ```

// ---

// # 🧠 Day 14 总结（20 分钟）

// 今天你掌握了：

// | 内容                   | 说明                        |
// | -------------------- | ------------------------- |
// | Transparent Proxy 模式 | 最主流的可升级方式                 |
// | admin 行为与 user 行为区别  | admin = 管理，不 delegatecall |
// | delegatecall 的安全边界   | storage layout 必须对齐       |
// | 升级过程                 | upgrade → 新实现合约           |

// 你现在已经具备 **写出自己的可升级合约框架** 的基础能力。

// ---

