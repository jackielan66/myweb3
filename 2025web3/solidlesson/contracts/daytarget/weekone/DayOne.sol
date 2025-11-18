// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.24;

contract DayOne {
    // public 公用状态
    string public message;
    
    // 构造函数
    constructor(string memory _message) {
        message = _message;
    }
    function setMessage(string memory _message) public {
        message = _message;
    }

    // 返回
    function getMessage() public view returns (string memory) {
        return message;
    }
}