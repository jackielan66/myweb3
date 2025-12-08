// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ErrorHandlingDemo {
    // public 公用状态
    uint256 public value;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // 1. require 校验输入
    function setValue(uint256 newValue) public {
        require(newValue > 0, "Value must be > 0");
        value = newValue;
    }

    // 2. require 校验权限
    function onlyOwnerSet(uint256 newValue) public {
        require(msg.sender == owner, "Not owner");
        value = newValue;
    }

    // 3. revert 主动触发错误（例如复杂条件）
    function conditionalRevert(uint256 num) public {
        if (num == 0 || num == 999) {
            revert("Invalid number");
        }
        value = num;
    }

    // 4. assert 用于内部逻辑
    function doubleValue() public returns (uint256) {
        uint256 before = value;
        value = value * 2;
        assert(value == before * 2); // 内部逻辑保证必须成立
        return value;
    }
}
