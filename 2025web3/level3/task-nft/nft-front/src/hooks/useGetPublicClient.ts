import { useCallback, useMemo } from "react";
import { createPublicClient, http } from "viem";
import { useChainId, useSwitchChain } from "wagmi";


const useGetPublicClient = () => {
  const chainId = useChainId();
  const { chains } = useSwitchChain();

  const publicClient = useMemo(() => {
    let currentChain = chains.find(item => item.id === chainId)
    return createPublicClient({
      chain: currentChain,
      transport: http()
    });
  }, [chainId, chains])

  return {
    publicClient
  }
}

export default useGetPublicClient;