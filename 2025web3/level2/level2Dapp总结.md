# 前端


# ethers.js
```
与更早出现的 web3.js 相比，它有以下优点：

代码更加紧凑：ethers.js 大小为 116.5 kB，而 web3.js 为 590.6 kB。
更加安全：Web3.js 认为用户会在本地部署以太坊节点，私钥和网络连接状态由这个节点管理（实际并不是这样）；ethers.js 中，Provider 提供器类管理网络连接状态，Wallet 钱包类管理密钥，安全且灵活。
原生支持 ENS。

```
## Ethers.js 语法

### Provider类
读取链上节点信息，不接触用户私钥，只能读取，不能写入

属性:
- jsonRpcProvider，可以让用户连接到特定节点服务商的节点。

方法：
- getNetwork() 查询 provider 连接到了哪条链.
- getBlockNumber() 查询当前区块高度
- getTransactionCount() 查询某个钱包的历史交易次数。
- getFeeData() 查询当前建议的 gas 设置，返回的数据格式为 bigint。
- getBlock() 查询区块信息，参数为要查询的区块高度,
- getCode() 查询某个地址的合约 bytecode，参数为合约地址.
```
    const ethers = require('ethers');
    // 获取某个某个节点PRC地址(远程地址) 
    const localProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    // 获取此节点下某个智能合约的余额
    const balance = await localProvider.getBalance('0x5FbDB2315678afecb367f032d93F642f64180aa3');

```


这一讲，我们将介绍 ethers.js 的 Provider 类，然后利用它连接上 Infura 节点，读取链上的信息。
连接链节点用的。

Provider 类是对以太坊网络连接的抽象，为标准以太坊节点功能提供简洁、一致的接口。在 ethers 中，Provider 不接触用户私钥，只能读取链上信息，不能写入，这一点比 web3.js 要安全。

除了默认提供者 defaultProvider 以外，ethers 中最常用的是 jsonRpcProvider，可以让用户连接到特定节点服务商的节点。


### Contract类
在 ethers 中，Contract 类是部署在以太坊网络上的合约（EVM 字节码）的抽象。通过它，开发者可以非常容易的对合约进行读取 call 和交易 transaction，并可以获得交易的结果和事件。以太坊强大的地方正是合约，所以对于合约的操作要熟练掌握。

#### 创建Contract变量
只读和可读写Contract
Contract 对象分为两类，只读和可读写。只读 Contract 只能读取链上合约信息，执行 call 操作，即调用合约中 view 和 pure 的函数，而不能执行交易 transaction。创建这两种 Contract 变量的方法有所不同：

只读 Contract：参数分别是合约地址，合约 abi 和 provider 变量（只读）。
```
const contract = new ethers.Contract(`address`, `abi`, `provider`);
```
可读写 Contract：参数分别是合约地址，合约 abi 和 signer 变量。Signer 签名者是 ethers 中的另一个类，用于签名交易，之后我们会讲到。
```
const contract = new ethers.Contract(`address`, `abi`, `signer`);
```
注意 ethers 中的 call 指的是只读操作，与 solidity 中的 call 不同。

#### 读取合约
```
    // 调合约内部 pure 跟 view 方法，不操作数据
    const contract = new ethers.Contract(`address`, `abi`, `provider`);

```


#### 发送交易
```
// 相等调用合约内部纯取方法，改变合约内部的状态，所以第一步需要要验证签名即钱包对象
const contract = new ethers.Contract(address, abi, signer);
const tx = await contract.METHOD_NAME(args [, overrides])
// 等待链上确认交易
await tx.wait()
其中 METHOD_NAME 为调用的函数名，args 为函数参数，[, overrides] 是可以选择传入的数据，包括：

gasPrice：gas 价格
gasLimit：gas 上限
value：调用时传入的 ether（单位是 wei）
nonce：nonce
注意： 此方法不能获取合约运行的返回值，如有需要，要使用 Solidity 事件记录，然后利用交易收据去查询。

```



## Signer签名者类
Signer 类是抽象类，不能直接实例化，我们需要使用它的子类：Wallet 钱包类。

## Wallet钱包类
### 创建钱包实例
- 方法 1：创建随机的 wallet 对象
```
    // 创建随机的wallet对象
    const wallet1 = ethers.Wallet.createRandom()
    // 创建随机私钥的 Wallet 对象。这种方法创建的钱包是单机的，我们需要用 connect(provider) 函数，连接到以太坊节点。这种方法创建的钱包可以用 mnemonic 获取助记词。
```

- 方法 2：用私钥创建 wallet 对象
```
// 从助记词创建wallet对象
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)
```

### 钱包方法
- 获取钱包地址
```
    wallet1.getAddress();
```

- 获取钱包在链上的交互次数
```
 const txCount2 = await provider.getTransactionCount(wallet2)
```

- 发送ETH
```
    // 创建交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
        to: address1,
        value: ethers.parseEther("0.001")
    }

    //发送交易，获得收据
    const txRes = await wallet2.sendTransaction(tx)
    const receipt = await txRes.wait() // 等待链上确认交易
    console.log(receipt) // 打印交易的收据
```



// 如果这个钱包没sepolia测试网ETH了，去水龙头领一些
    // 1. https://faucets.chain.link/


## 检索事件
```
const transferEvents = await contract.queryFilter("事件名", [起始区块高度，结束区块高度])
```

## 监听合约事件
- contract.on

- contract.once

## BigInt

程序运行时候要的最小单位 wei，人类要看到是最大单位 ether

- ethers.formatUnits(onewei, 0)  格式化,wei转化成大单位，可以理解界面中显示是大单位

- ethers.parseUnits("1.0", "ether").toString() 解析：大单位转wei。例如将ether转换为wei：parseUnits(变量, 单位),parseUnits默认单位是 ether


```
const oneGwei = ethers.getBigInt("1000000000"); // 从十进制字符串生成

```
这些数字表示不同以太坊单位对应的小数位数。
- wei: 0
- kwei: 3
- mwei: 6
- gwei: 9
- szabo: 12
- finney: 15
- ether: 18

## staticCall  模拟交易的结果用
 发送交易之前检查交易是否会失败，节省大量 gas
 ```
const tx = await contract.函数名.staticCall( 参数, {override})
    console.log(`交易会成功吗？：`, tx)

 ```


 ## HD 钱包
 HD 钱包（Hierarchical Deterministic Wallet，多层确定性钱包）是一种数字钱包 ，通常用于存储比特币和以太坊等加密货币持有者的数字密钥。通过它，用户可以从一个随机种子创建一系列密钥对，更加便利、安全、隐私。要理解 HD 钱包，我们需要简单了解比特币的BIP32，BIP44，和BIP39。


## 批量归集
在链上交互、撸毛之后，就需要将多个钱包的资产进行归集管理。你可以用 HD 钱包或者保存多份密钥的方式操作多个钱包，然后用 ethers.js 脚本完成归集。下面我们分别示范归集 ETH（原生代币）和 WETH（ERC20 代币）。

# Viem 使用方法
## getContract 获取合约实例
```
   getContract({
        abi,
        address,
        client: {
          public: publicClient, // 可以读
          wallet: walletClient, // 可以写合约  
        },
   })
```

## readContract
 

# wagmi 
1. createConfig

- chains:[] 目前链接是哪些节点


- transports 
自定义transports，修改传输节点，避免使用wagmi默认的节点传输导致太慢问题，所以自己定制

  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/...'),
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'),
  },


2. useSwitchChain 切链

3. useReadContracts单个读取合约  useReadContracts 批量读取合约

4. useWriteContract 写合约

5. useWaitForTransactionReceipt 根据合约转账记录，实时监听数据是否真正上链了,

6. useSendTransaction 原生代币转账

7. useSignMessage 签名
    直接调用会返回一个后端签名信息，这个就可以证明这个合约是你的
    更多场景应用？
    这个还有哪些场景，请举例下

文件内容提到了签名的概念，特别是使用ECDSA（椭圆曲线数字签名算法）进行签名。以下是文件中提到的关键点：

身份认证：签名可以证明你拥有某个地址的私钥。

不可否认性：签名确认你确实发布过该消息，无法否认。

完整性：签名确保信息在传输过程中没有被篡改。

交易签名和消息签名：签名可以用于交易和消息的验证。

这些概念在区块链和加密通信中非常重要，用于确保数据的安全性和真实性。

怎么自定义钱包链接

 8. useChainId 获取配置中wagmi.ts 配置中 chains数组的第一个链id

 9. useWalletClient 返回一个以太坊钱包对象,来检索账号，执行交易、签名信息等

 10. useBalance 返回原生代币或者token的余额








