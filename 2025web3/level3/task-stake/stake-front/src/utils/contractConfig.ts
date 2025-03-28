/**
 * 合约相关配置
 */

import RCCStake from './contracts/RCCStake.sol/RCCStake.json'
import RccToken from './contracts/Rcc.sol/RccToken.json'

export const ABI_CONTRACT = {
    RCCStake: RCCStake.abi,
    RccToken: RccToken.abi,
}

// Deployed Addresses

// RccTokenModule#RccToken - 0x95401dc811bb5740090279Ba06cfA8fcF6113778
// Deploying RCCStake...
// Box deployed to: 0x998abeb3E57409262aE5b751f60747921B33613E
export enum ADDRESS_CONTRACT {
    'RccToken'= '0x95401dc811bb5740090279Ba06cfA8fcF6113778',
    'RccStake' = '0x998abeb3E57409262aE5b751f60747921B33613E',
    'AddressZero' = '0x0000000000000000000000000000000000000000'
}

// 合约部分,默认池ID，第一个为质押池代币为ETH
export const DEF_POOL_ID = 0;