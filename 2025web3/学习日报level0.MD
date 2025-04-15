## web3 2025

比较好的dapp 入门教程【2888】5、Web3.0-DApp开发课程资料

整理下去中心化的业务流程。

tang老师推荐的项目
    https://github.com/pancakeswap/pancake-frontend
    https://bodhi.wtf/
    https://www.apollographql.com/docs/react


事件使用the graph 查询
使用The Graph子图查询，而不使用查询日志事件
GraphQL 语法，哪些场景使用
The Graph (GRT) 

部署到币安测试链   

为什么：本地hardhat模拟的10个账号，在sepolia网站无法接收余额

### **项目经验**

#### **KaerStake - 去中心化质押与奖励合约**
*开发时间：2024年 - 至今*

**项目描述：**
KaerStake是一个去中心化多池质押合约，用户可以进行多个池子加密货币的质押与奖励领取。用户主要质押是 ERC-20 代币，并且到达一定条件后，可以进行提取的操作，根据平台一些奖励规则，可以领取平台给的奖励的功能，旨在为用户提供更灵活的 DeFi 质押体验。

**核心职责：**
- **DAPP前端设计与开发：**
  - 设计并实现了质押与解质押功能，使用户可以方便地将代币存入流动性池并根据平台的奖励规则领取奖励。
  - 与MetaMask及其他钱包插件集成，实现了用户与智能合约的安全交互，确保交易操作的顺利完成。
  - 使用Wagmi库与链上合约进行交互，精确获取质押池的相关信息，提升用户的交互体验。

- **用户体验优化：**
  - 设计简洁且响应式的UI界面，使用户可以在任何设备上流畅使用平台。
  - 通过TailwindCSS 和 Material UI优化页面样式，提升整体用户体验与界面的可操作性。

**技术栈：**React, Next.js, Wagmi, Ethers.js, TailwindCSS, Material UI, Hardhat



为什么开发这个:
虽然现在平台的知名度还不高，但我们看到了去中心化金融（DeFi）领域巨大的市场潜力。我们也想进入这个市场。通过奖励来吸引客户。
主要是吸引客户来

# 学习总结
 
    -2   // 18 Transient Storage  状态存在的时间    
        https://github.com/RemoteCodeCamp/openWeb3/blob/main/09.Solidity%20%E7%BB%8F%E5%85%B8%E7%94%A8%E4%BE%8B.md
        这里面的代码怎么看不懂，里面的 18 Transient Storage 案例部分

    -3 学习nextjs原理，按里面的知识点理下 https://github.com/RemoteCodeCamp/front_l0

 
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



- react 中 Suspense 组件怎么使用
recoilRoot 状态库的使用
https://recoiljs.org/docs/api-reference/core/RecoilRoot/


- const tx = await writeContractAsync({
        address: ADDRESS_CONTRACT.RccStake,
        abi: ABI_CONTRACT.RCCStake,
        functionName: 'claim',
        args: [DEF_POOL_ID]
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
      if (receipt.status === 'success') {
        toast.success('领取成功')
      } else {
        toast.error('Transaction failed')
      }
问题如果 receipt 失败，数据会上链吗



coinbase 是什么





pledge 业务逻辑.md

路由
首页
- MARKET
    展示

闪电贷：
DEFI 抵押(存入)一种代币，借出另外一个代币。。

多签协议是什么

    
查询池基本信息列表   
    // 基本信息
    struct PoolBaseInfo{
        uint256 settleTime;         // 结算时间
        uint256 endTime;            // 结束时间
        uint256 interestRate;       // 池的固定利率，单位是1e8 (1e8)
        uint256 maxSupply;          // 池的最大限额
        uint256 lendSupply;         // 当前实际存款的借款
        uint256 borrowSupply;       // 当前实际存款的借款
        uint256 martgageRate;       // 池的抵押率，单位是1e8 (1e8)
        address lendToken;          // 借款方代币地址 (比如 BUSD..)
        address borrowToken;        // 借款方代币地址 (比如 BTC..)
        PoolState state;            // 状态 'MATCH, EXECUTION, FINISH, LIQUIDATION, UNDONE'
        IDebtToken spCoin;          // sp_token的erc20地址 (比如 spBUSD_1..)
        IDebtToken jpCoin;          // jp_token的erc20地址 (比如 jpBTC_1..)
        uint256 autoLiquidateThreshold; // 自动清算阈值 (触发清算阈值)
    }





获取所有token
 https://pledge.rcc-tec.xyz/api/v22/token?chainId=56



RCC STATE 项目
Deployed Addresses
RccTokenModule#RccToken - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

Deploying RCCStake...
Box deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0


添加质押值，
Pool
stTokenAddress: 质押代币的地址。
poolWeight: 质押池的权重，影响奖励分配。
lastRewardBlock: 最后一次计算奖励的区块号。
accRCCPerST: 每个质押代币累积的 RCC 数量。
stTokenAmount: 池中的总质押代币量。
minDepositAmount: 最小质押金额。
unstakeLockedBlocks: 解除质押的锁定区块数。

必要参数质押token地址，到什么区块可以解锁质押

nextjs .next 这个文件夹是干嘛的
nextjs pages 可以定义组件，并且让路径访问不到吗

钱包怎么请求签名

3.2 User
stAmount: 用户质押的代币数量。
finishedRCC: 已分配的 RCC 数量。
pendingRCC: 待领取的 RCC 数量。
requests: 解质押请求列表，每个请求包含解质押数量和解锁区块。


deployer:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
esDex address: 0x0B306BF915C4d645ff596e518fAf3F9669b97016
esVault address: 0x9A676e781A523b5d0C0e43731313A708CB607508
testERC721 address: 0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82



docker run -d \
  --name easyswap \
  -p 33009:3306 \
  -e MYSQL_DATABASE=easyswap \
  -e MYSQL_USER=easyuser \
  -e MYSQL_PASSWORD=easypasswd \
  -e MYSQL_ROOT_PASSWORD=your_root_password \
  mysql:latest

database = "easyswap"
password = "easypasswd"
port = 33009 #4000
max_open_conns = 1500
host = "127.0.0.1"
log_level = "info"
max_conn_max_lifetime = 300
user = "easyuser"
max_idle_conns = 10


docker exec -i mysql mysql -ueasyuser -p easypasswd easyswap < your_script.sql
mysql -ueasyuser -peasypasswd

docker run -d \
  --name redis_pledger \
  -p 6379:6379 \
  -e REDIS_PASSWORD= \
  redis:latest

[[kv.redis]]
pass = ""
host = "127.0.0.1:6379"
type = "node"


docker cp ./pledge.sql mysql_pledge_v21:/tmp/pledge_v21.sql

# 进入容器
docker exec -it mysql_pledge_v21 bash

# 在容器内执行（输入密码后导入）
mysql -u pledge_v21 -p pledge_v21 < /tmp/pledge_v21.sql


# 删除表
docker exec -it mysql_pledge_v21 mysql -u pledge_v21 -p
USE pledge_v21;
DROP TABLE IF EXISTS admin, multi_sign, poolbases, pooldata, token_info;

