// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserProfile {
    string public name;
    uint public age;

// 加上 indexed 后可以被区块链检索
// 最多 3 个 indexed 字段。
    event ProfileUpdated(address indexed user, string name, uint age,uint timestamp);

    constructor(string memory initName, uint initAge) {
        name = initName;
        age = initAge;
    }

    function updateProfile(string memory newName, uint newAge) public {
        name = newName;
        age = newAge;

        emit ProfileUpdated(msg.sender, newName, newAge,block.timestamp);
    }
}
