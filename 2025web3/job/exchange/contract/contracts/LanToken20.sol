// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract LanToken20 {
    ///// 加上public后，外面自动生成get方法

    // 代币名称
    string public name = "LanToken20-0317";

    // 代码符号
    string public symbol = "L20";

    // 代币精度
    uint256 public decimals = 18;

    // 代币总量
    uint256 public totalSupply;

    // 每个账号余额
    mapping(address => uint256) public balanceOf;

    // 授权交易所的数据
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);


    constructor() {
        totalSupply = 1000 * (10 ** decimals);
        // 初始化，谁部署谁就有这些代币总量，发财了
        balanceOf[msg.sender] = totalSupply;
    }

    // 转账代币
    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(address(0) != _to, "Address is not valid");
        _transfer(msg.sender, _to, _value);
        return true;
    }

    
    function _transfer(address _from, address _to, uint256 _value) internal {
        require(balanceOf[_from] >= _value, "Not enough balance");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
    }

    // 授权后，给予第三方交易所使用的
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(address(0) != _from, "Address is not valid");
        require(address(0) != _to, "Address is not valid");

        // 余额要大于可以转移的钱
        require(balanceOf[_from] >= _value, "Not enough balance");

        // 授权的交易所也要大于可以转账的钱
        require(allowance[_from][msg.sender] >= _value, "Not enough allowance");

        // 授权到交易所中的数据减少.
        allowance[_from][msg.sender] -= _value;
        // 从某个账号转到另一个账号
        _transfer(_from, _to, _value);
        // require(allowance[_from][msg.sender] >= _value, "Not enough allowance");
        // _transfer(_from, _to, _value);
        // allowance[_from][msg.sender] -= _value;
        return true;
    }


    // 授权交易所第三方使用
    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(address(0) != _spender, "Address is not valid");
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
