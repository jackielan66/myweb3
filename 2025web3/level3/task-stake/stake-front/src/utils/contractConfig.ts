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

// TokenA deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// TokenB deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// Deploying RccToken...
// Rcc deployed to: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
// Deploying RCCStake...
// Box deployed to: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
export enum ADDRESS_CONTRACT {
    'RccToken'= '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    'RccStake' = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    'AddressZero' = '0x0000000000000000000000000000000000000000',
    'TokenA' = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    'TokenB' = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
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