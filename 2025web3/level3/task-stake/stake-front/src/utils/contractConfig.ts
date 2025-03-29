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

// RccTokenModule#RccToken - 0x0B306BF915C4d645ff596e518fAf3F9669b97016
// Box deployed to: 0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE
export enum ADDRESS_CONTRACT {
    'RccToken'= '0x0B306BF915C4d645ff596e518fAf3F9669b97016',
    'RccStake' = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
    'AddressZero' = '0x0000000000000000000000000000000000000000'
}

// 合约部分,默认池ID，第一个为质押池代币为ETH
export const DEF_POOL_ID = 0;