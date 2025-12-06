
// 1. 核心概念
// ✔ 定义 modifier
// modifier onlyOwner() {
//     require(msg.sender == owner, "Not owner");
//     _;
// }
// _; 表示“把要执行的函数内容放在这里”。
// ✔ 使用方式
// function setValue(uint256 x) public onlyOwner {
//     value = x;
// }
// ✔ modifier 可带参数
// modifier greaterThan(uint256 min) {
//     require(min > 0, "min too small");
//     _;
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ModifierDemo {
    address public owner;
    uint256 public value;

    constructor() {
        owner = msg.sender;
    }

    // 基础权限控制
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // 参数校验
    modifier validValue(uint256 x) {
        require(x > 0 && x < 10000, "Invalid value");
        _;
    }

    function setValue(uint256 x) public onlyOwner validValue(x) {
        value = x;
    }

    function transferOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
}
