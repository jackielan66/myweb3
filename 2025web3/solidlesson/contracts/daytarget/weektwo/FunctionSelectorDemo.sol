// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


// ✅ 📘 今日学习主题：函数选择器 & ABI 编码
// 1️⃣ 函数选择器是什么？
// 在 Solidity 中，每个函数都有 4 字节的唯一 ID：
// functionSelector = bytes4(keccak256("functionName(type1,type2)"))
// 调用合约时的 calldata：
// | 4 bytes selector | encoded arguments ... |
// 例如：
// transfer(address,uint256)
// selector = 0xa9059cbb
// 这可以让你理解底层合约调用、代理合约、fallback、攻击检测等高级主题。


contract FunctionSelectorDemo {
    uint256 public value;

    function setValue(uint256 newValue) external {
        value = newValue;
    }

    function getSelector() external pure returns (bytes4) {
        return this.setValue.selector;
    }

    // 手动解析 selector 用于 fallback 调度
     // 修复：移除未使用的参数名称 calldata data -> _
    fallback(bytes calldata /**data**/) external returns (bytes memory) {
        bytes4 selector;
        assembly {
            selector := calldataload(0)
        }

        if (selector == this.setValue.selector) {
            revert("Use normal call, not fallback");
        }

        return abi.encodePacked("Unknown selector: ", selector);
    }
}
