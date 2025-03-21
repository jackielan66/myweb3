## web3 2025

# 学习总结
 
    
    -2   // 18 Transient Storage  状态存在的时间    
        https://github.com/RemoteCodeCamp/openWeb3/blob/main/09.Solidity%20%E7%BB%8F%E5%85%B8%E7%94%A8%E4%BE%8B.md
        这里面的代码怎么看不懂，里面的 18 Transient Storage 案例部分

 
下面这些网站是干嘛的
- https://chainlist.org/

- https://github.com/AmazingAng/WTF-Solidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md


# 以太坊的钱包的原理，以及他是如何通过私钥达到全网公用的，比较有些钱包是本地生成的，没有联网


# 区块链主链、测试链、侧链一般怎么区分
- 侧链是一个独立的区块链，与主链保持一定程度的互操作性（如资产桥接），但它有自己的共识机制和运行规则。先在侧链完成上数据，这样gas低，然后再合躲到主链
Polygon PoS（以太坊的侧链）、Ronin（Axie Infinity 游戏专用侧链）、Gnosis Chain（原 xDai 侧链）
    



- js对超大浮点数计算还是有问题，所以区块链中代码中用wei来运行，这样浮点数就少了

- solidity 中状态变量如果加了个public 的话，会自动加一个get方法，但没有set方法


- ERC交易所合约有哪些东西
  1 可以往合约地址转钱，但是在metamask，看不到记录，因为metamask只能看到外部账号转账记录
  2 合约地址必须有withdraw，否则无法取出钱来 


- 交易所与ERC20交互给流程
  用户先授权给交易erc20多少量给交易所
  然后交易所可以通过订单池发起交易然后在这些授权的量上进行交易。

- todo 
    hardhat 测试用例要怎么写，并且打印出来  

- payable 关键词识别
  // 存以太坊币,有payable这个所以存以太币，并且存到这个智能合约的部署的地址，而不是存到某个账号去，存账号要调其他方法
  function depositEther() public payable {

  }

- nextjs
  ·_document· is only rendered on the server, so event handlers like onClick cannot be used in this file.








