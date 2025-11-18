// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UserRegistry {
    struct User {
        string name;
        uint age;
        bool registered;
    }

    mapping(address => User) public users;

    function register(string memory name, uint age) public {
        require(!users[msg.sender].registered, "Already registered");

        users[msg.sender] = User({
            name: name,
            age: age,
            registered: true
        });
    }

    function updateAge(uint newAge) public {
        require(users[msg.sender].registered, "Not registered");
        users[msg.sender].age = newAge;
    }

    function getMyInfo() public view returns(string memory, uint, bool) {
        User memory u = users[msg.sender];
        return (u.name, u.age, u.registered);
    }
}
