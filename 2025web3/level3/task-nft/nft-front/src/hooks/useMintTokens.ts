import { createPublicClient, erc721Abi, http } from 'viem'
import { mainnet } from 'viem/chains'
import { config } from '../wagmi';
import { useEffect ,useState} from 'react';
import { ADDRESS_CONTRACT } from '../utils/contractConfig';
import { INFT } from '../types/global';

const fromBlock = 'earliest' // 起始区块
const toBlock = 'latest' // 到最新区块
async function getMintTokens(contractAddress: `0x${string}`): Promise<INFT[]> {

  const client = createPublicClient({
    chain: config.chains[0],
    transport: http()
  });

  const name = await client.readContract({
    address: contractAddress,
    abi: erc721Abi,
    functionName: 'name',
  });

  const symbol = await client.readContract({
    address: contractAddress,
    abi: erc721Abi,
    functionName: 'symbol',
  });

  // 1. 获取所有转入该地址的 Transfer 事件
  const incomingLogs = await client.getLogs({
    address: contractAddress,
    event: {
      type: 'event',
      name: 'Transfer',
      inputs: [
        { type: 'address', name: 'from', indexed: true },
        { type: 'address', name: 'to', indexed: true },
        { type: 'uint256', name: 'tokenId', indexed: true }
      ]
    },
    args: {
      from:ADDRESS_CONTRACT.AddressZero 
    },
    fromBlock: fromBlock,
    toBlock: toBlock
  })
  // return new Promise((resolve, reject) => {
  //   resolve(incomingLogs.map(item=>{
  //     return {
  //       tokenId:item.args.tokenId,
  //       name,
  //       symbol,
  //       address: contractAddress
  //     }
  //   }))
  // })
  return incomingLogs.map(item=>{
    return {
      tokenId:item.args.tokenId || '',
      name:name||'',
      symbol:symbol||'',
      address: contractAddress
    }
  })
}


let storeData:any[] = []
export default function useMintTokens (contractAddress: `0x${string}`=ADDRESS_CONTRACT.TestERC721){

  let [mintTokens, setMintTokens]= useState<INFT[]>(storeData);

  useEffect(() => {
    if(storeData.length>0){
      // setMintTokens(res)
      return 
    }
    if(contractAddress  ){
      getMintTokens(contractAddress).then((res)=>{
        setMintTokens(res)
        storeData = res;
      })
    }
  }, [contractAddress])

  return {
    mintTokens
  }
}