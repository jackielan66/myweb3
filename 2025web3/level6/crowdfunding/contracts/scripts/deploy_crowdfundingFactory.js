const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. 获取合约工厂
  const CrowdfundingFactory = await ethers.getContractFactory("CrowdfundingFactory");

  // 2. 部署合约（`deploy()` 返回的已经是部署后的合约实例）
  console.log("Deploying CrowdfundingFactory...");
  const crowdfundingFactory = await CrowdfundingFactory.deploy();

  // 3. 等待合约部署完成（`deploy()` 已经包含等待）
  console.log("Waiting for deployment confirmation...");
  await crowdfundingFactory.waitForDeployment(); // 替代 `.deployed()`

  // 4. 获取合约地址（`.getAddress()` 替代 `.address`）
  const contractAddress = await crowdfundingFactory.getAddress();
  console.log("CrowdfundingFactory deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });