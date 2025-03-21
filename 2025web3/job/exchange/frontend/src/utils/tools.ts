import { } from 'react';
import { formatUnits, parseUnits } from 'viem';

export const toEther = (value: string, decimals: number = 18) => {
    if (value) return formatUnits(value, decimals)
    return '0'

};

export const toWei = (value: string, decimals: number = 18) => {
    return parseUnits(value, decimals)
};