import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { createPublicClient, erc721Abi, http } from 'viem'
import { config } from '../wagmi';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../utils/contractConfig";
import { useCallback, useEffect, useState } from "react";
const fromBlock = 'earliest' // 起始区块
const toBlock = 'latest' // 到最新区块
import { getOwnedTokenIds } from './getOwnedTokenIds'
const useNFTs = () => {
    const [tokenList, setTokenList] = useState([])
    const account = useAccount()
    const balanceOf = useReadContract({
        address: ADDRESS_CONTRACT.TestERC721,
        abi: erc721Abi,
        functionName: 'balanceOf',
        args: account.address ? [account.address] : undefined,
        query: {
            enabled: !!account.address
        }
    })
    async function getLogs(contractAddress: `0x${string}`, ownerAddress: `0x${string}`) {
        let tokens = await getOwnedTokenIds(contractAddress, ownerAddress)
        setTokenList(tokens)
    }

    useEffect(() => {
        refetch()
    }, [account.address])

    const refetch = useCallback(() => {
        if (account.address) {
            getLogs(ADDRESS_CONTRACT.TestERC721, account.address)
        }
    }, [])

    return {
        tokenList,
        count: balanceOf.data,
        refetch
    }
}

export default useNFTs