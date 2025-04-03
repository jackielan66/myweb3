
import { useEffect, useMemo, useState } from 'react';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from '../utils/contractConfig';
import { useReadContract } from 'wagmi';
// 获取 Stake的基本信息
export default function useStakeBase() {
    let contractConfig = {
        address: ADDRESS_CONTRACT.RccStake,
        abi: ABI_CONTRACT.RCCStake
    }

    let startBlockField = useReadContract({
        ...contractConfig,
        functionName: 'startBlock',
    })
    let endBlockField = useReadContract({
        ...contractConfig,
        functionName: 'endBlock',
    })

    let rccPerBlockField = useReadContract({
        ...contractConfig,
        functionName: 'rccPerBlock',
    })

    const startBlock = useMemo(() => {
        if (startBlockField.data) {
            return startBlockField.data.toString()
        }
        return ''
    }, [startBlockField.data])

    const endBlock = useMemo(() => {
        if (endBlockField.data) {
            return endBlockField.data.toString()
        }
        return ''
    }, [endBlockField.data])

    const rccPerBlock = useMemo(() => {
        if (rccPerBlockField.data) {
            return rccPerBlockField.data.toString()
        }
        return ''
    }, [rccPerBlockField.data])

    return {
        startBlock,
        endBlock,
        rccPerBlock
    }
}