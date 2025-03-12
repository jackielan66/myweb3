# solidity 高级用法


## 合约的七大组成结构有:
    - 状态变量:存储在合约中的变量，用于记录合约的持续状态。
    - 函数:合约中定义的可执行代码块。
    - 函数修饰器: 用于修改函数行为的声明，这在函数定义前使用。

    - 事件:用于记录合约操作的日志，这有助于外部监听并追踪合约的活动。 Solidity 中是一种特殊的功能，用于记录合约执行过程中的关键活动。它们相当于 Solidity 的日志系统。这些事件一旦被触发，就可以通过与合约连接的客户端进行访问和监听，从而使外部系统能够轻松跟踪合约的活动。

    - Error:在合约中定义的错误处理机制，用于管理执行过程中的异常情况.
    - 枚举:用于定义一组命名常量，提高代码的可读性和维护性。
    - 结构体:用于定义更复杂的数据类型。

## 什么时候要定义数据位置：引用类型时候
在Solidity中，声明「引用类型」时必须指定数据位置（data location），这是为了明确变量的存储方式和生命周期。例如，声明一个动态数组时，你可能会使用 uint[] storage。重要的是要注意，虽然通常必须指定数据位置，但声明状态变量时则不需要这样做，因为状态变量默认存储在 storage。 在函数内部声明引用类型时必须指定数据位置，常见的数据位置有三种：

storage：数据永久存储在区块链上，其生命周期与合约本身一致。
memory：数据暂时存储在内存中，是易失的，其生命周期仅限于函数调用期间。
calldata：类似于 memory，但用于存放函数参数，与 memory 不同的是，calldata 中的数据不可修改且相比 memory 更节省 gas。 storage 可以类比为硬盘，而 memory 可类比为 RAM。calldata 可能稍显陌生，它的独特之处在于其不可变性和高效的 gas 使用。因其特性，当引用类型的函数参数不需要修改时，推荐使用 calldata 而非 memory。 为了避免过度复杂化，我们将在「Solidity进阶」中更深入地讨论 calldata 与 memory 的差异。目前，只需了解上述关于 calldata 的基本差异即可：仅用于函数参数，数据不可更改，是易失的，并且比 memory 更节约 gas。这些理解将帮助你更有效地使用Solidity中的数据位置。


## 地址类型
Solidity 的地址类型用关键字 address 表示。它占据 20 字节（160 位），默认值为 0x0，表示空地址。地址类型可以细分为两种：

- address：普通地址类型（不可接收转账）
- address payable：可收款地址类型（可接收转账）

这两种地址类型的主要区别在于，address payable 能接受转账，而 address 不能。接下来，我们将先介绍如何定义地址类型的变量，然后再解释为什么要区分这两种地址类型。

### 成员变量
```
地址类型有三个成员变量，分别为：

balance ：该地址的账户余额，单位是 Wei
code ：该地址的合约代码，EOA 账户为空，CA 账户为非空
codehash ：该地址的合约代码的 hash 值
获取成员变量值

下面展示了如何获取地址的成员变量。其中 this 代表的是当前合约。

function get_balance() public view returns(uint256) {
     return address(this).balance; _//获取地址账户余额_
}

function get_code() public view returns(bytes memory) {
    return address(this).code; _//获取合约代码_
}

function get_codehash() public view returns(bytes32) {
    return address(this).codehash; _//获取合约代码的hash值_
}
```

### 成员函数
地址类型有五个成员函数：
- transfer(uint256 amount)：向指定地址转账，失败时抛出异常（仅 address payable 可以使用）。
- send(uint256 amount)：与 transfer 函数类似，但失败时不会抛出异常，而是返回布尔值（仅 address payable 可以使用）。
- call(...)：调用其他合约中的函数。
- delegatecall(...)：与 call 类似，但使用当前合约的上下文来调用其他合约中的函数，修改的是当前合约的数据存储。

### Summary
1. Solidity 中的地址类型用于进行转账和与其他合约交互。
2. 地址类型由关键字 address 表示，占据 20 字节（160 位）。其默认值为 0x0。
3. 地址类型分为普通地址类型和可收款地址类型。
4. 可收款地址类型能够接收转账，而普通地址类型则不能。
5. 使用 payable() 函数可以将地址字面值显式转换为可收款地址类型。
6. 成员变量 balance 可以获取地址的余额。
7. 函数 transfer() 允许向指定地址进行转账。
8. 函数 send() 类似于 transfer()，但如果转账失败则会抛出异常。
9. 函数 call() 可以调用其他合约中的函数。
10. 函数 delegatecall() 与 call() 类似，但使用当前合约的上下文来调用其他合约中的函数。
11. 函数 staticcall() 也类似于 call()，但不允许改变状态变量的操作。
12. 函数 transfer() 和 send() 只能在 address payable 类型中使用。

## 静态字节数组
Solidity 共有 32 种静态字节数组：bytes1、bytes2、bytes3，依此类推，直至 bytes32。

静态字节数组是值类型
### Summary
1. 静态字节数组是固定长度的字节数组，属于值类型，变量储存的是数值而非数据地址。
2. Solidity 共有 32 种静态字节数组，如 bytes1、bytes2、bytes3，依次类推，最大为 bytes32。
3. 比较运算符用于比较两个变量的大小关系或是否相等，其结果为布尔值。
4. 位运算符用于对二进制位进行操作，返回结果为静态字节数组。
5. 通过 [] 运算符可访问静态字节数组的特定元素，但需注意避免越界访问


## 自定义值类型
「自定义值类型」的定义 通过 type C is V 可以定义新的"自定义值类型"，其中 C 是新定义的类型，V 必须是 Solidity 的原生类型。例如，下面的例子定义了两种新类型：

定义 USER-DEFINED VALUE TYPE
```
type Weight is uint128;
type Price  is uint128;
```

## 数组
### 静态数组的声明
假设 T 是一种类型，那么静态数组的声明格式如下：
如果没值，后面都会默认初始化默认一个值
```
T[arrSize] DataLocation arrName;
```

### 动态数组的声明
假设 T 是一种类型，那么动态数组的声明格式如下：
```
T[] DataLocation arrName
```

静态数组和动态数组是不同的类型,需要注意的是，静态数组和动态数组是不同的类型，因此它们之间不能相互赋值。

## 数组切片（array slice）
语法是 arr[start:end]。 相当与js中Array.proto.slice(start,end)
数组切片只能作用于 calldata
注意点，solidity 字符串也是可以用，如下。
```
// 如果输入"abcdef"，将会输出"abcd"_
function extracFourBytes(string calldata payload) public view {
    string memory leading4Bytes = string(payload[:4]);
    console.log("leading 4 bytes: %s", leading4Bytes);
}
```

## 动态数组成员函数
注意 只有当动态数组的数据位置为存储（storage）时，才可以使用成员函数 push(), push(x), 和 pop()。这三个函数都会影响数组的长度：

- push()：在数组末尾增加一个元素，并赋予零值，使得数组长度增加一。
- push(x)：将元素 x 添加到数组末尾，同样使数组长度增加一。
- pop()：从数组末尾移除一个元素，导致数组长度减少一。

## 多维数组
### 静态多维数组的声明
```
    // 行在后面，列在第一个，与其他语言是相反的。notion
    T[col][row] DataLocation arrName;
```
### 多维数组的初始化
```
静态数组
//必须使用uint(1)和uint(4)显式地将「数组字面值」第一个元素的类型转换成uint_
uint[3][2] memory arr = [[uint(1), 2, 3], [uint(4), 5, 6]];
```

## 动态字节数组
值得注意的是，动态字节数组属于引用类型（reference type），这与静态字节数组的值类型（value type）有本质的不同。这种区别意味着动态字节数组在内存中的处理方式与静态字节数组不同，为开发者提供了更灵活的数据处理选项。


## 合约组成部分


