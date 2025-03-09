// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.24 and less than 0.9.0
pragma solidity ^0.8.24;

contract HelloWorld {
    string public greet = "Hello World!";

    /*---   01 原始数据类型 start   ----*/
    // 1. bool  布尔类型
    bool public boo = true;

    // 2. uint
    /**
        uint 代表 无符号整数，不能是负数，可以表示 0 到 256 比特位的值，每个可以取值范围如下
        uint8   ranges from 0 to 2 ** 8 - 1
        uint16  ranges from 0 to 2 ** 16 - 1
        ...
        uint256 ranges from 0 to 2 ** 256 - 1
    */
    uint8 public u8 = 1;
    uint256 public u256 = 456;
    uint public u3 = 251; // uint is an alias for uint256

    // 3. int
    /**
        int 代表 有符号整数，可以是负数，可以表示 -128 到 127 比特位的值，每个可以取值范围如下
        int8   ranges from -2 ** 7 to 2 ** 7 - 1
        int16  ranges from -2 ** 15 to 2 ** 15 - 1
        ...
        int256 ranges from -2 ** 255 to 2 ** 255 - 1
    */
    int256 public i256 = -123;
    int8 public i8 = -1;
    int16 public i16 = 16;

    // 4. address
    address public addr = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;

    // 5. bytes
    bytes1 a = 0xb5; //  [10110101]
    bytes1 b = 0x56; //  [01010110]


    // 06:变量
    // 有三种变量类型
    // 1. local variables (函数中的变量),不保存在区块链上
    // 2. state variables (声明在函数外面),保存在区块链上
    // 3. global (provides information about the blockchain) 提供区块链上的信息
    // State variables are stored on the blockchain. 状态变量，保存在区块链上
    string public text = "Hello";
    uint256 public num = 123;

    function doSomething() public {
        // Local variables are not saved to the blockchain. 本地变量
        uint256 i = 456;

        // Here are some global variables
        uint256 timestamp = block.timestamp; // Current block timestamp 全局变量，取时间戳
        address sender = msg.sender; // address of the caller 全局变量取发起人等的地址
    }


    // 07 常量：不能编辑，只读。使用能节省gas
    address public constant MY_ADDRESS02 =
        0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc;
    uint256 public constant MY_UINT = 123;


    // 08 Immutable 与像常量一样，值可以在构造函数设置，但是后面就不能再设置了。
    address public immutable MY_ADDRESS_01;
    uint256 public immutable MY_UINT;

    constructor(uint256 _myUint) {
        MY_ADDRESS_01 = msg.sender;
        MY_UINT = _myUint;
    }

    // 09 读写状态变量
    uint256 public num;
    function set(uint256 _num) public {
        num = _num;
    }
    // public 关键字表示该函数可以被任何人调用，
    // view 关键字表示该函数不会修改区块链上的状态，即不会更改存储变量（storage）。一般是自读
    // pure 关键子表示该函数结果不依赖任何状态变量，只跟传入的参数或者内部变量有关系
    function get() public view returns (uint256) {
        return num;
    }

    // 10 Ether and Wei 交易中的单位。 ether比较长，所以比较大，wei比较小，
    uint256 public oneWei = 1 wei;
    // 1 wei is equal to 1
    bool public isOneWei = (oneWei == 1);

    uint256 public oneGwei = 1 gwei;
    // 1 gwei is equal to 10^9 gwei
    bool public isOneGwei = (oneGwei == 1e9);

    uint256 public oneEther = 1 ether;
    // 1 ether is equal to 10^18 wei
    bool public isOneEther = (oneEther == 1e18);

    // 11 Gas 交易中需要给予的费用，类似手续费
    //    手续费越高，交易的速度越快，没有手续费可能被退回。

    // 12 Gas Limit 交易中允许的最大gas
    //    有两种可以限制  gas limit 交易中最大的gas,自己设置       
    //                  block gas limit (max amount of gas allowed in a block, set by the network)


    // 13 Mapping 
    //    语法  mapping(keyType => valueType)   key 键类型不能是映射、变长数组、合约、枚举或结构体。
    //   跟 value 可以是内置的任何类型
    // Mapping from address to uint
    mapping(address => uint256) public myMap;
    function get(address _addr) public view returns (uint256) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
        return myMap[_addr];
    }
    function set(address _addr, uint256 _i) public {
        // Update the value at this address
        myMap[_addr] = _i;
    }
    function remove(address _addr) public {
        // Reset the value to the default value.
        delete myMap[_addr];
    }

    // 14 Array  
        //  与JS数组差不多一样，除了删的方法
    uint256[] public arr2 = [1, 2, 3];
    function get(uint256 i) public view returns (uint256) {
        return arr[i];
    }

    // Solidity can return the entire array.
    // But this function should be avoided for
    // arrays that can grow indefinitely in length.
    function getArr() public view returns (uint256[] memory) {
        return arr;
    }

    function push(uint256 i) public {
        // Append to array
        // This will increase the array length by 1.
        arr.push(i);
    }

    function pop() public {
        // Remove last element from array
        // This will decrease the array length by 1
        arr.pop();
    }

    function getLength() public view returns (uint256) {
        return arr.length;
    }
    // 数组的删除方法不一样，不能js中 Slice方法，只能通过位置对换，然后pop()踢掉最后一个数组的方法
    function remove(uint256 _index) public {
        require(_index < arr.length, "index out of bound");

        for (uint256 i = _index; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr.pop();
    }

    // 15 Enum 与TS中一样
        // Enum representing shipping status
    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }
    // Default value is the first element listed in
    // definition of the type, in this case "Pending"
    Status public status;

    // 16 Structs 结构体 与 JS Object很像
    struct Todo {
        string text;
        bool completed;
    }
    //  三种初始化结构方法
    //  第一种 像函数一样调用，但是位置必须跟之前定义的顺序一样
    Todo public todo = Todo("Learn Solidity", false);
    //  第二种 像函数一样调用，传入对象key-value的形式
    Todo public todo2 = Todo({ text: "Learn Solidity", completed: false });
     // 第三种 先定义一个空的，然后再赋值
    Todo memory todo3;
    todo3.text = _text;


    // 17 Data Locations  变量的存储位置
    //    1  storage 状态变量 (保存在链上)
    //    2  memory 保存在内存中，不上链，一般在函数调用的时候存在
    //    3  calldata  函数参数中特别数据
    uint256[] public arr;
    mapping(uint256 => address) map;

    struct MyStruct {
        uint256 foo;
    }

    mapping(uint256 => MyStruct) myStructs;

    function f() public {
        // call _f with state variables
        _f(arr, map, myStructs[1]);

        // get a struct from a mapping
        MyStruct storage myStruct = myStructs[1];
        // create a struct in memory
        MyStruct memory myMemStruct = MyStruct(0);
    }

    function _f(
        uint256[] storage _arr,
        mapping(uint256 => address) storage _map,
        MyStruct storage _myStruct
    ) internal {
        // do something with storage variables
    }

    // memory 可以改， gas 成本比storage低，比 calldata 高
    // memory 是一种临时的数据存储位置，用于存储 临时变量。这些变量只在当前函数执行过程中有效，函数执行结束后，数据会被销毁。
    function g(uint256[] memory _arr) public returns (uint256[] memory) {
        // do something with memory array
    }

    // calldata 不能修改、只读、最低gas：
    // 参数位于 calldata 中，不能被修改。它存储的是通过外部调用传递的数据。被设计用来存储函数调用时传入的数据，它不会占用合约的状态存储空间，因此更加节省 Gas。
    function h(uint256[] calldata _arr) external {
        // do something with calldata array
    }


    // 18 Transient Storage  状态存在的时间
    // Storage - data is stored on the blockchain
    // Memory - data is cleared out after a function call
    // Transient storage - data is cleared out after a transaction


    // 19 Function 
    // 待实战

    // 20 Error  如果交易过程中有错误，整个交易会被撤回
    // 抛出错误可以调用 require, revert or assert.
    // require, 
    // revert  比require自定义性更强
    // assert  用于检查不可改变的条件，一般用于合约的内部逻辑不变性或不可接受的错误状态。
    // 如果 assert 条件失败，表示合约存在严重错误，应该停止执行。不会退回 gas
    //   如果失败，抛出异常并消耗所有 Gas：与 require 和 revert 不同，assert 失败时不会退还 Gas，因为它代表着不可接受的错误，是合约的内部错误。
    //   不应该用于外部输入验证：assert 不应该用于检查外部传入的数据（如函数参数），而是用于验证合约的内部状态和逻辑一致性
    

    // 21 Function Modifier
    //    可以理解是函数装饰器，修改或增强函数行为，仅能用于修饰其他函数，无返回值，使用 _; 来表示函数体的执行
    
    uint256 public balance = 100;
    // modifier：检查余额是否足够
    modifier hasSufficientBalance(uint256 amount) {
        require(balance >= amount, "Insufficient balance");
        _;
    }
    // 使用 modifier
    function withdraw(uint256 amount) public hasSufficientBalance(amount) {
        balance -= amount;
    }

    // 22 Event
    //     事件 是一种非常适合在区块链上记录日志和状态变化的工具，它们可以被外部监听器（如前端应用）轻松捕获。
    //          通过事件，合约可以在执行时记录相关信息而不会消耗大量 Gas，尤其适合日志记录和实时监听。
    //          indexed 参数提高了事件过滤的效率，能让外部应用更快速地获取特定的事件数据。
    //          事件是一种非常有用的工具，可以大大简化区块链应用的开发，尤其是在处理用户交互和界面更新时
    event Log(address indexed sender, string message);
    event AnotherLog();

    function test() public {
        emit Log(msg.sender, "Hello World!");
        emit Log(msg.sender, "Hello EVM!");
        emit AnotherLog();
    }

    // 23 Constructor

 }

 