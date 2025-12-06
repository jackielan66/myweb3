// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


// ✓ 关键点
// event 定义日志格式
// emit Transfer(...) 用来在链上写一条 log
// indexed 可让前端按参数筛选事件（相当于 DB 的 index）

contract EventCounter {
    uint256 public count;

    event CountIncreased(address indexed sender, uint256 newCount);

    function increase() external {
        count++;
        emit CountIncreased(msg.sender, count);
    }
}
