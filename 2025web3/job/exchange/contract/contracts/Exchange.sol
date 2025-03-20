// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./LanToken20.sol";

contract Exchange {
    ///// 加上public后，外面自动生成get方法

    uint256 public testCount = 0;

    // 收费账号
    address public feeAccount;
    // 收费费率
    uint256 public feePercent;

    // 以太坊地址
    address constant ETH_ADDRESS = address(0);

    // 某个代币下         某个账号 所拥有的 代币数量
    mapping (address => mapping (address => uint256)) public tokens;

    constructor(address _feeAccount,uint256 _feePercent){
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    event Deposit(address token,address user,uint256 amount,uint256 balance);

    // 存以太坊币,有payable这个所以存以太币，并且存到这个智能合约的部署的地址，而不是存到某个账号去，存账号要调其他方法
    function depositEther() payable public  {
        tokens[ETH_ADDRESS][msg.sender] += msg.value;
        // emit Deposit()
        // emit
        emit Deposit(ETH_ADDRESS,msg.sender,msg.value,tokens[ETH_ADDRESS][msg.sender]);
    }

    // 存代币
    function depositToken(address _tokenAddress,uint256 _amount) public {
        require(_tokenAddress != address(0),"token address must be valid");

        // 同时在erctoken那边的approve方法里，approve方法里approve的账号要approve给交易所的合约地址

        // 传入实例的地址，就能调到该合约里的方法,token20 从发起者的erc20转钱到当前交易所的合约里yue 的erc20
        LanToken20(_tokenAddress).transferFrom(msg.sender,address(this),_amount);
        // 交易所的token量要增加
        tokens[_tokenAddress][msg.sender] += _amount;

        emit Deposit(_tokenAddress,msg.sender,_amount,tokens[_tokenAddress][msg.sender]);
    }

    event Withdraw(address token,address user,uint256 amount,uint256 balance);

    // 提取以太币
    function withdrawEther(uint256 _amount) public {
        require(tokens[ETH_ADDRESS][msg.sender] >= _amount,"insufficient balance");
        tokens[ETH_ADDRESS][msg.sender] -= _amount;
        // 真正向往用户地址转钱了，用payable来支付。。这里的代码是从当前合约中的地址以太坊币转钱到提取人账号了
        // === 会考 payable(msg.sender).transfer(_amount); 是从当前合约地址转钱到用户地址 
        payable(msg.sender).transfer(_amount);
        emit Withdraw(ETH_ADDRESS,msg.sender,_amount,tokens[ETH_ADDRESS][msg.sender]);
    }

    // 提取代币，从交易所提交到用户的代币合约里
    function withdrawToken(address _tokenAddress,uint256 _amount) public {
        require(_tokenAddress != address(0),"token address must be valid");
        require(tokens[_tokenAddress][msg.sender] >= _amount,"insufficient balance");

        // 交易所这边谁提取谁就变少
        tokens[_tokenAddress][msg.sender] -= _amount;
        // erc20的合约里要，转钱
        // 合约 A 调用合约 B，如果一个合约调用另一个合约，msg.sender 就是调用它的合约地址，而不是原始交易的发送者。
        LanToken20(_tokenAddress).transfer(msg.sender,_amount);
        emit Withdraw(_tokenAddress,msg.sender,_amount,tokens[_tokenAddress][msg.sender]);
    }

    function getBalance(address _token,address _account ) public view returns(uint256){
        return tokens[_token][_account];
    }

    // 订单相关
    struct _Order {
        uint256 id;
        address user;
        address tokenGet;
        uint256 amountGet;

        address tokenGive;
        uint256 amountGive;
        uint256 timestamp;
    }

    mapping (uint256 => _Order) public orders;
    uint256 public orderCount;
    mapping (uint256 => bool) orderCancel;
    mapping (uint256 => bool) orderFill;

    event MakeOrder(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    event TradeOrder(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    event CancelOrder(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    function makeOrder(address _tokenGet,uint256 _amountGet,address _tokenGive,uint256 _amountGive) public {
        orderCount++;
        orders[orderCount] = _Order(
            orderCount,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenGive,
            _amountGive,
            block.timestamp
        );
        emit MakeOrder(
            orderCount,
            msg.sender,
            _tokenGet,
            _amountGet,
            _tokenGive,
            _amountGive,
            block.timestamp
        );
    }
    
    function cancelOrder(uint256 _id) public {
        _Order memory order = orders[_id];
        require(order.id == _id,"order id is not valid");
        // require(order.user == msg.sender,"only user can cancel order");
        orderCancel[_id] = true;
        emit CancelOrder(
            order.id,
            msg.sender,
            order.tokenGet,
            order.amountGet,
            order.tokenGive,
            order.amountGive,
            block.timestamp
        );
    }

    function fillOrder(uint256 _id) public {
        _Order memory order = orders[_id];
        require(order.id == _id,"order id is not valid");
        // require(order.user == msg.sender,"only user can cancel order");
        orderFill[_id] = true;

        // 完成订单的人逻辑
        // 创建一个订单  给 100 个token 换 1个 ehter
        // tokenGet = token address, amountGet
        // 1): make order
        //  抽给 token
        
        // 当前完成定位的人get这么多token
        tokens[order.tokenGet][msg.sender] += order.amountGet;
        // 创建订单的人的token减少
        tokens[order.tokenGet][order.user] -= order.amountGet;

        // 创建订单的人给出的token减少
        tokens[order.tokenGive][msg.sender] -= order.amountGive;
        tokens[order.tokenGive][order.user] += order.amountGive;

        emit TradeOrder(
            order.id,
            order.user,
            order.tokenGet,
            order.amountGet,
            order.tokenGive,
            order.amountGive,
            block.timestamp
        );
    }



    function getTest() public view returns(uint){
        return testCount;
    }

    function setTest(uint _testCount) public {
        testCount = _testCount;
    }

}
