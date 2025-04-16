import { useCallback, useMemo } from "react";
import { createPublicClient, http } from "viem";
import { useChainId, useSwitchChain } from "wagmi";


const useGetPublicClient = () => {

  const chainId = useChainId();
  const { chains } = useSwitchChain();
  let currentChain = chains.find(item => item.id === chainId)

  // console.log(currentChain, "currentChain~~~~");
  // console.log(chainId, "chainId~~~~");

  // // const publicClient = createPublicClient({
  // //   chain: currentChain,
  // //   transport: http()
  // // });

  // // const publicClient = useCallback(() => {
  // //   if (!chainId) return;
  // //   let currentChain = chains.find(item => item.id === chainId)
  // //   return createPublicClient({
  // //     chain: currentChain,
  // //     transport: http()
  // //   });
  // // }, [chainId]);

  const publicClient = useMemo(() => {
    let currentChain = chains.find(item => item.id === chainId)
    return createPublicClient({
      chain: currentChain,
      transport: http()
    });
  }, [chainId,chains])


  // console.log(publicClient, "publicClient~~~~");


  return {
    publicClient
  }
}

export default useGetPublicClient;