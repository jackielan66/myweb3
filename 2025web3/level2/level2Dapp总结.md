



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








