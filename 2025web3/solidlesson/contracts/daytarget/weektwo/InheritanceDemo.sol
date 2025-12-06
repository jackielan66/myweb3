// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


// 1. 核心概念讲解
// ✔ 单继承：
// contract B is A {}
// ✔ 函数需要标记：
// 父类允许覆盖 → virtual
// 子类确认覆盖 → override
// ✔ 多重继承的线性化
// Solidity 采用 C3 linearization。
// contract C is A, B {}
// 顺序：C → B → A


contract A {
    uint256 public value = 10;

    function getNumber() public pure virtual returns (uint256) {
        return 1;
    }

    function getValue() public view virtual returns (uint256) {
        return value;
    }
}

contract B is A {
    function getNumber() public pure virtual override returns (uint256) {
        return 2;
    }

    // 修改状态变量
    function addValue(uint256 x) public {
        value += x;
    }
}

contract C is B {
    function getNumber() public pure override returns (uint256) {
        return 3;
    }

    function getValue() public view override returns (uint256) {
        return value * 2;
    }
}
