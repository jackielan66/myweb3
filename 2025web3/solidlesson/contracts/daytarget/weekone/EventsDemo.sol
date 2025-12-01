// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ✔ Event 是区块链日志
// 事件不会存储在链上的 storage，但会被记录在交易日志（log）里
// 👉 Gas 便宜
// 👉 前端/后端可以监听
// 👉 广泛用于：Transfer、Swap、Bid、Stake、Unstake 等
// ✔ indexed
// 最多 3 个参数可加 indexed
// 用于过滤事件，前端可按 topic 查询。


contract EventsDemo {
    uint256 public value;
    address public owner;

    // indexed: 方便根据用户过滤
    event ValueChanged(address indexed user, uint256 oldValue, uint256 newValue);
    event OwnerChanged(address oldOwner, address newOwner);

    constructor() {
        owner = msg.sender;
    }

    function setValue(uint256 newValue) public {
        uint256 old = value;
        value = newValue;

        emit ValueChanged(msg.sender, old, newValue);
    }

    function changeOwner(address newOwner) public {
        require(msg.sender == owner, "Not owner");
        address oldOwner = owner;
        owner = newOwner;

        emit OwnerChanged(oldOwner, newOwner);
    }
}
