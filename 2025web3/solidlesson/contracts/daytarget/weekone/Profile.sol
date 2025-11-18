// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Profile {
    string public name;
    uint public age;

    constructor(string memory initName, uint initAge) {
        name = initName;
        age = initAge;
    }

    // public: 内部外部都可以调用
    function setName(string memory newName) public {
        name = newName;
    }

    // external: 更节省 gas，推荐外部调用
    function setAge(uint newAge) external {
        age = newAge;
    }

    // internal 示例
    function _increaseAge() internal {
        age += 1;
    }

    // private 示例
    function _resetAge() private {
        age = 0;
    }

    function birthdate() public {
        // 生日加1
        _increaseAge();
    }
}
