// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


// ✅ 📘 今日主题：ABI Encoding 完整掌握
// ABI 编码是 EVM 调用、合约交互、代理合约、ERC-20/721/1155 全部标准的基础。
// 📌 1️⃣ 今日目标（20 分钟）
// 🔹 学懂 4 种 ABI 编码方式：
// 方法	说明
// abi.encode()	标准编码（每个元素 32 字节）
// abi.encodePacked()	紧凑编码（bytes 拼接），可能碰撞
// abi.encodeWithSelector()	selector + 编码参数
// abi.encodeWithSignature()	同上，但自动计算 selector

contract ABIDemo {
    function encodeNormal(uint256 a, address b) external pure returns (bytes memory) {
        return abi.encode(a, b);
    }

    function encodePackedData(uint256 a, address b) external pure returns (bytes memory) {
        return abi.encodePacked(a, b);
    }

    function encodeWithSel(uint256 a) external pure returns (bytes memory) {
        return abi.encodeWithSelector(this.encodeWithSel.selector, a);
    }

    function encodeWithSig(uint256 a) external pure returns (bytes memory) {
        return abi.encodeWithSignature("encodeWithSig(uint256)", a);
    }

    // helper，解析前 4 字节
    function getSelector(bytes calldata data) external pure returns (bytes4 sel) {
        assembly {
            sel := calldataload(data.offset)
        }
    }
}
