/**
 * 合约相关配置
 */

import RCCStake from './contracts/RCCStake.sol/RCCStake.json'
import RccToken from './contracts/Rcc.sol/RccToken.json'
import TokenA from './contracts/TokenA.sol/TokenA.json'
import TokenB from './contracts/TokenB.sol/TokenB.json'

export const ABI_CONTRACT = {
    RCCStake: RCCStake.abi,
    RccToken: RccToken.abi,
    TokenA: TokenA.abi,
    TokenB: TokenB.abi,
}

// Deployed Addresses

// TokenA deployed to: 0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1
// TokenB deployed to: 0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE
// Deploying RccToken...
// Rcc deployed to: 0x68B1D87F95878fE05B998F19b66F4baba5De1aed
// Deploying RCCStake...
// Box deployed to: 0x3Aa5ebB10DC797CAC828524e59A333d0A371443c
export enum ADDRESS_CONTRACT {
    'RccToken'= '0x68B1D87F95878fE05B998F19b66F4baba5De1aed',
    'RccStake' = '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
    'AddressZero' = '0x0000000000000000000000000000000000000000',
    'TokenA' = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1',
    'TokenB' = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
}

// 合约部分,默认池ID，第一个为质押池代币为ETH
export const DEF_POOL_ID = 0;


export const convertModel = (params = [], fnName = 'poolBaseInfo') => {
    const returnApi = RCCStake.abi.find((item) => {
        return item.name === fnName
    })
    let obj = {} as any;
    if (!returnApi) {
        return {}
    }
    returnApi.outputs?.forEach((item, index) => {
        obj[item.name] = params[index]
    })
    return obj;
}