
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


// 所有人都可以存钱
// ETH
// 只有合约 owner 才可以取钱
// 只要取钱，合约就销毁掉 selfdestruct
// 扩展：支持主币以外的资产
// ERC20
// ERC721

contract Bank{

    event Deposit(address sender, uint256 amount);
    event WITHDRAW(address sender, uint256 amount);

    // owner 合约部署人员，即合约的拥有者
     address immutable owner;

    // receive 固定写法；external payable{ 用来接收 ETH 转账的，msg消息体为空的情况
    // 需求1 所有人都可以存钱
    receive() external payable{
        emit Deposit(msg.sender, msg.value);
    }

    // payable关键词 函数才能接收以太币
    constructor() payable{
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner,"only owner");
        _;
    }

    // 查询余额
    function getBalance() public view returns(uint256){
        // 该地址的账户余额，单位是 Wei
        return address(this).balance;
    }

    function withdraw() public onlyOwner{
        emit WITHDRAW(msg.sender, getBalance());
        selfdestruct(payable(msg.sender));
    }

}