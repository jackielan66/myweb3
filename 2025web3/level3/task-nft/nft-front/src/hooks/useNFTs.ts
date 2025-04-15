import { useAccount, useChainId, useReadContract, useSwitchAccount, useSwitchChain, useWriteContract } from "wagmi";
import { Chain, createPublicClient, erc721Abi, http } from 'viem'
import { config } from '../wagmi';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../utils/contractConfig";
import { useCallback, useEffect, useState } from "react";

import { getOwnedTokenIds } from './getOwnedTokenIds'
import { INFT } from "../types/global";
const useNFTs = () => {
    const [tokenList, setTokenList] = useState<INFT[]>([])
    const account = useAccount();
    const chainId = useChainId();
    const { chains } = useSwitchChain()
    // console.log('chainId', chainId);
    // console.log('chains', chains);

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

    async function getLogs(contractAddress: `0x${string}`, ownerAddress: `0x${string}`, chain: Chain) {
        let tokens = await getOwnedTokenIds(contractAddress, ownerAddress, chain) as INFT[];
        setTokenList(tokens)
    }

    const refetch = useCallback(() => {
        if (account.address && chainId != null && chains) {
            let currentChains = chains.find(item => item.id === chainId)
            if (currentChains) {
                getLogs(ADDRESS_CONTRACT.TestERC721, account.address, currentChains)
            }
        }
    }, [account.address, chainId, chains]);

    useEffect(() => {
        refetch()
    }, [account.address, chainId, chains]);



    return {
        tokenList,
        myTokenList: tokenList,
        count: balanceOf.data,
        isApproved: isApprovedForAll.data || false,
        refetch
    }
}

export default useNFTs