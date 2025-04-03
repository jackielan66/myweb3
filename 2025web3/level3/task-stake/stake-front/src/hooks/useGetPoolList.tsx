import { readContract } from "viem/actions"
import { createPublicClient, http } from 'viem'
import { config } from "../wagmi"
import { ABI_CONTRACT, ADDRESS_CONTRACT, convertModel } from "../utils/contractConfig"
import { useEffect, useState } from "react"
import { useChainId, useReadContract } from "wagmi"
import { formatUnits } from 'viem';


export const useGetPoolList = () => {
    const wagmiContract = {
        abi: ABI_CONTRACT.RCCStake,
        address: ADDRESS_CONTRACT.RccStake,
    } as const

    const chainId = useChainId();
    const [poolList, setPoolList] = useState<any>([]);
    const fetchPoolList = async () => {
        const publicClient = createPublicClient({
            chain: config.chains[0],
            transport: http()
        })

        const poolLength = await publicClient.readContract({
            ...wagmiContract,
            functionName: 'poolLength',
        }) as number;
        console.log(poolLength, "poolLength");
        let results = []

        if (poolLength > 0) {
            for (let index = 0; index < poolLength; index++) {
                console.log(index, "index");
                let obj = {
                    ...wagmiContract,
                    functionName: 'pool',
                    args: [index]
                }
                let res = await publicClient.readContract(obj);
                results.push(convertModel(res, 'pool'));
            }
        }
        setPoolList(results);
    }

    useEffect(() => {
        fetchPoolList()
    }, [chainId])
    return { poolList, fetchPoolList }
}