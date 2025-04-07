/**
 * 合约相关配置
 */

import EasySwapOrderBook from './contracts/EasySwapOrderBook.sol/EasySwapOrderBook.json'
import EasySwapVault from './contracts/EasySwapVault.sol/EasySwapVault.json'
import TestERC721 from './contracts/test/TestERC721.sol/TestERC721.json'
// import TokenB from './contracts/TokenB.sol/TokenB.json'

export const ABI_CONTRACT = {
    EasySwapOrderBook: EasySwapOrderBook.abi,
    EasySwapVault: EasySwapVault.abi,
    TestERC721: TestERC721.abi,
    // TokenB: TokenB.abi,
}

// Deployed Addresses


const esDex_name = "EasySwapOrderBook";
const esDex_address = "0x0B306BF915C4d645ff596e518fAf3F9669b97016"

const esVault_name = "EasySwapVault";
const esVault_address = "0x9A676e781A523b5d0C0e43731313A708CB607508"

const erc721_name = "TestERC721"
const erc721_address = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82"


export enum ADDRESS_CONTRACT {
    'EasySwapOrderBook' = esDex_address,
    'EasySwapVault'= esVault_address,
    'TestERC721' = erc721_address,
    'AddressZero' = '0x0000000000000000000000000000000000000000',
    'TokenA' = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    'TokenB' = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
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