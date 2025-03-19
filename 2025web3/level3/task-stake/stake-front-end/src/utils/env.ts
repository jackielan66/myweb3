import { Address, zeroAddress } from "viem";

let defaultAddress ='0x01A01E8B862F10a3907D0fC7f47eBF5d34190341'
export const StakeContractAddress = process.env.NEXT_PUBLIC_STAKE_ADDRESS as Address || defaultAddress || zeroAddress 