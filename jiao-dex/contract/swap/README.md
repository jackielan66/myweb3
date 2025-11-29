# 怎么运行项目
先运行环境
1. npx hardhat node 
2. npx hardhat run scripts/deploy.js --network localhost


# swap 合约流程

Factory.createPool(...)            // 创建合约实例（create2）
-> Pool (部署完毕)

Pool.initialize(sqrtPriceX96)      // 设置初始价格
Router/Contract -> Pool.mint(...)  // 发起 mint（Pool 回调 Router.mintCallback）
Router/Contract -> Pool.swap(...)  // 发起 swap（Pool 回调 Router.swapCallback）
LP -> Pool.burn(...)               // 退出 liquidity（计入 owed）
LP -> Pool.collect(...)            // 领取 owed token

