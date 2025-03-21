// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("ExchangeModule", (m) => {


  const exchange = m.contract("Exchange", ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',1]);
  const lanToken20 = m.contract("LanToken20", []);

  return { exchange, lanToken20 };
});
