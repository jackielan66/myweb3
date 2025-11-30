// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VisibilityDemo {
    uint256 private secretNumber = 42;
    uint256 internal baseValue = 100;

    // public：对内对外都可以
    function getBase() public view returns (uint256) {
        return baseValue;
    }

    // external：外部便宜，内部需要 this 调用
    function getSecretExternal() external view returns (uint256) {
        return secretNumber;
    }

    // internal：继承可见
    function addInternal(uint256 x) internal view returns (uint256) {
        return baseValue + x;
    }

    // private：仅本合约
    function doubleSecret() private view returns (uint256) {
        return secretNumber * 2;
    }

    // 测试内部调用 internal/private
    function compute() public view returns (uint256 a, uint256 b) {
        a = addInternal(10);     // internal 可直接调用
        b = doubleSecret();      // private 可直接调用
    }

    // 用 external 的内部调用方式（需要 this）
    function callExternal() public view returns (uint256) {
        return this.getSecretExternal(); // 注意 gas 更贵
    }
}
