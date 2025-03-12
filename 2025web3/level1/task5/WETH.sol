// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// WETH 是包装 ETH 主币，作为 ERC20 的合约。 标准的 ERC20 合约包括如下几个

// 3 个查询
// balanceOf: 查询指定地址的 Token 数量
// allowance: 查询指定地址对另外一个地址的剩余授权额度
// totalSupply: 查询当前合约的 Token 总量
// 2 个交易
// transfer: 从当前调用者地址发送指定数量的 Token 到指定地址。
// 这是一个写入方法，所以还会抛出一个 Transfer 事件。
// transferFrom: 当向另外一个合约地址存款时，对方合约必须调用 transferFrom 才可以把 Token 拿到它自己的合约中。
// 2 个事件
// Transfer
// Approval
// 1 个授权
// approve: 授权指定地址可以操作调用者的最大 Token 数量。

contract WETH {
    string public name = "Wrapped Ether";
    string public symbol = "WETH";
    uint8 public decimals = 18;



    mapping (address => uint256) _balanceOf;
    uint256 _totalSupply;

    // 2个事件
   event Transfer(address indexed _from, address indexed _to, uint256 _value);
   event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    // 三个查询方法
    function balanceOf(address account) public view returns (uint256){
        return _balanceOf[account];
    }
    
    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return 0;
    }

    function totalSupply() public view returns (uint256){
        return _totalSupply;
    }

    // 两个交易
    function transfer(address _to, uint256 _value) public returns (bool success){

    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){

    }

    // 1 个授权
    function approve(address _spender, uint256 _value) public returns (bool success){

    }

    function deposit() public payable{
        _balanceOf[msg.sender] += msg.value;
    }

    fallback() external payable {
        deposit();
    }
    receive() external payable {
        deposit();
    }

}
