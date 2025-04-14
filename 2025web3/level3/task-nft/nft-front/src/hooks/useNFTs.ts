import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { createPublicClient, erc721Abi, http } from 'viem'
import { config } from '../wagmi';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../utils/contractConfig";
import { useCallback, useEffect, useState } from "react";
const fromBlock = 'earliest' // 起始区块
const toBlock = 'latest' // 到最新区块
import { getOwnedTokenIds } from './getOwnedTokenIds'
import { INFT } from "../types/global";
const useNFTs = () => {
    const [tokenList, setTokenList] = useState<INFT[]>([])
    const account = useAccount()

    const isApprovedForAll = useReadContract({
        address: ADDRESS_CONTRACT.TestERC721,
        abi: erc721Abi,
        functionName: 'isApprovedForAll',
        args: account.address ? [account.address, ADDRESS_CONTRACT.EasySwapVault] : undefined,
        query: {
            enabled: !!account.address
        }
    })

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
        let tokens = await getOwnedTokenIds(contractAddress, ownerAddress) as INFT[];
        setTokenList(tokens)
    }

    const refetch = useCallback(() => {
        if (account.address) {
            getLogs(ADDRESS_CONTRACT.TestERC721, account.address)
        }
    }, [account.address]);

    useEffect(() => {
        refetch()
    }, [account.address]);



    return {
        tokenList,
        myTokenList: tokenList,
        count: balanceOf.data,
        isApproved: isApprovedForAll.data || false,
        refetch
    }
}

export default useNFTs