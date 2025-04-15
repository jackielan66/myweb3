import { useCallback } from "react";
import { createPublicClient, http } from "viem";
import { useChainId, useSwitchChain } from "wagmi";


const useGetPublicClient = () => {
  
  const chainId = useChainId();
  const { chains } = useSwitchChain();
  let currentChain = chains.find(item => item.id === chainId)


  const publicClient = createPublicClient({
    chain: currentChain,
    transport: http()
  });
  
  // useCallback(() => {
  //   let currentChain = chains.find(item => item.id === chainId)
  //   return createPublicClient({
  //     chain: currentChain,
  //     transport: http()
  //   });
  // }, [chainId]);


  return {
    publicClient
  }
}

export default useGetPublicClient;