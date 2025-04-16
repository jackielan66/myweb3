import { useAccount, useChainId, useReadContract, useSwitchAccount, useSwitchChain, useWriteContract } from "wagmi";
import { Chain, createPublicClient, erc721Abi, http } from 'viem'
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../../utils/contractConfig";
import { useCallback, useEffect, useMemo, useState } from "react";
import { gql, request } from 'graphql-request'
import { getOwnedTokenIds } from '../getOwnedTokenIds'
import { INFT } from "../../types/global";
import { useQuery } from '@tanstack/react-query'

const query = gql`{
    transfers(where: {from: "0x0000000000000000000000000000000000000000"}) {
    from
    id
    to
  }
}`
const getQuery = (address = '') => {
    return gql`{
        incomingLogs: transfers(where:{to:"${address}"}) {
                    from
                    id
                    to
                    tokenId
                }
        outgoingLogs: transfers(where:{from:"${address}"}) {
                    from
                    id
                    to
                    tokenId
                }
        
    }`
}
const url = 'https://api.studio.thegraph.com/query/109241/my-sepolia-nft-721/version/latest'
const headers = { Authorization: 'Bearer 674c89e765e754d7fc54ad5ddf41e95e' }

const useNFTsGraph = () => {
    const account = useAccount();
    const chainId = useChainId();
    const { chains } = useSwitchChain()

    const { data,refetch:refetchQql } = useQuery({
        queryKey: ['data'],
        async queryFn() {
            return await request(url, getQuery(account.address), {}, headers)
        },
        enabled: !!account.address
    })
    console.log(data, "data  useNFTsGraph account.address fromData")

    const myTokenList = useMemo(() => {
        const { incomingLogs = [], outgoingLogs = [] } = (data || {}) as any;
        const mapTokenInfo: any = {};
        // console.log('incomingLogs', incomingLogs)
        // 处理转入事件
        incomingLogs.forEach((log: any) => {
            if (log.tokenId !== undefined) {
                let tokenId = log.tokenId;
                if (mapTokenInfo[tokenId]) {
                    mapTokenInfo[tokenId].count += 1
                } else {
                    mapTokenInfo[tokenId] = {
                        tokenId: log.tokenId,
                        count: 1,
                        name: "ERC721",
                        symbol: "ERC721 SYMBOL",
                        address: ADDRESS_CONTRACT.TestERC721
                    }
                }
            }
        })

        // 处理转出事件
        outgoingLogs.forEach((log: any) => {
            // ownedTokens.delete(log.args.tokenId!)
            if (log.tokenId !== undefined) {
                let tokenId = (log.tokenId).toString()
                if (tokenId != undefined) {
                    if (mapTokenInfo[tokenId]) {
                        mapTokenInfo[tokenId].count -= 1
                    }
                }
            }
        })

        return Object.values(mapTokenInfo).filter((item: any) => item.count > 0)
    }, [data]) as INFT[];

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

    const refetch = useCallback(() => {
        if (account.address && chainId != null && chains) {
            refetchQql()
        }
    }, [account.address,chainId]);

    useEffect(() => {
        refetch()
    }, [account.address, chainId, chains]);


    return {
        myTokenList: myTokenList,
        count: balanceOf.data,
        isApproved: isApprovedForAll.data || false,
        refetch
    }
}

export default useNFTsGraph