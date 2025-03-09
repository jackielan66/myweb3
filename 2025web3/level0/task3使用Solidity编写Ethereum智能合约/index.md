# 什么是智能合约是什么
    运行在以太坊区块链上的程序，用solidity语言开发。

由于每个状态转换都会进行记录并且都不可变，因此在将合同发布到生产环境之前，应对它进行全面测试。 Bug 修复可能会产生巨大成本，甚至会严重损害系统。 

智能合约的主要属性和优点如下：

- 透明：区块链用户可以读取智能合约，并可以使用 API 来访问这些合约。
- 不可变性：智能合约的执行将创建不可更改的日志。
- 分发：该合约的输出由该网络的节点验证。 合约状态可以公开显示。 在某些情况下，甚至可以看到“私有”变量。

# 用例
  - 投票  利用不可改变与透明


# 框架
  - Hardhat：在将 Ethereum 合约部署到公共账本并产生实际成本之前，使用 Hardhat 工具套件对其进行测试。开发人员可在本地进行开发，以便于其工作
  - OpenZeppelin：使用 OpenZeppelin 工具编写、部署和操作去中心化应用程序。 OpenZeppelin 提供了两个产品：合约库和 SDK。

# - Hardhat
    使用hardhat 框架进行合约编译与部署与测试
    
    ## 编译
    编译 npx hardhat compile

    ## 部署
    部署 1:) 编写部署js文件  2:)npx hardhat ignition deploy ignition/modules/Shipping.js --network localhost

    ## 测试
    测试 1：）编写测试用例  3:) 运行测试代码  npx hardhat test test/Shipping.js 