/**
 * 合约相关配置
 */

import EasySwapOrderBook from './contracts/EasySwapOrderBook.sol/EasySwapOrderBook.json'
import EasySwapVault from './contracts/EasySwapVault.sol/EasySwapVault.json'
import TestERC721 from './contracts/test/TestERC721.sol/TestERC721.json'
// import TokenB from './contracts/TokenB.sol/TokenB.json'
import Crowdfunding from './contracts/Crowdfunding/Crowdfunding.sol/Crowdfunding.json'
import CrowdfundingFactory from './contracts/Crowdfunding/CrowdfundingFactory.sol/CrowdfundingFactory.json'

export const ABI_CONTRACT = {
    EasySwapOrderBook: EasySwapOrderBook.abi,
    EasySwapVault: EasySwapVault.abi,
    TestERC721: TestERC721.abi,
    Crowdfunding: Crowdfunding.abi,
    CrowdfundingFactory: CrowdfundingFactory.abi,
}

// Deployed Addresses


// const esDex_name = "EasySwapOrderBook";
// const esDex_address = "0x0165878A594ca255338adfa4d48449f69242Eb8F"

// const esVault_name = "EasySwapVault";
// const esVault_address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"

// const erc721_name = "TestERC721"
// const erc721_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

// deployer:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// esDex address: 0x0165878A594ca255338adfa4d48449f69242Eb8F
// esVault address: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// testERC721 address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

// sepo测试s address

// Compiled 1 Solidity file successfully (evm target: paris).
// deployer:  0x7Dd1fB42126DfeCfA0307bB203955FF8a0AC67f9
// esDex address: 0x1a616d28Eb88b8148Ebf9490769871807f26B7A0
// esVault address: 0xDa143B447dF27D72f09C9d97C2cCF49FC781F7dE
// testERC721 address: 0x365579aa941BBf7ecc265366bc465366b5A49a72
const esDex_address = "0x1a616d28Eb88b8148Ebf9490769871807f26B7A0"

const esVault_name = "EasySwapVault";
const esVault_address = "0xDa143B447dF27D72f09C9d97C2cCF49FC781F7dE"

const erc721_name = "TestERC721"
const erc721_address = "0x365579aa941BBf7ecc265366bc465366b5A49a72"
export enum ADDRESS_CONTRACT {
    'EasySwapOrderBook' = esDex_address,
    'EasySwapVault' = esVault_address,
    'TestERC721' = erc721_address,
    'AddressZero' = '0x0000000000000000000000000000000000000000',
    'TokenA' = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    'TokenB' = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    // 'CrowdfundingFactory'= '0xEc0D35a0B4e2C44Dc332917b34A6611F22f5f32D',
    'CrowdfundingFactory'='0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e'
}

// 合约部分,默认池ID，第一个为质押池代币为ETH
export const DEF_POOL_ID = 0;


export const convertModel = (params = [], fnName = 'poolBaseInfo') => {
    // const returnApi = RCCStake.abi.find((item) => {
    //     return item.name === fnName
    // })
    // let obj = {} as any;
    // if (!returnApi) {
    //     return {}
    // }
    // returnApi.outputs?.forEach((item, index) => {
    //     obj[item.name] = params[index]
    // })
    // return obj;
}