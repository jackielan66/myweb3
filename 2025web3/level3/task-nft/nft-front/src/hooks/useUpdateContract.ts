import { useWriteContract ,useChainId,useSwitchChain} from "wagmi";
import { createPublicClient, http, parseGwei } from 'viem'

const useUpdateContract = () => {

      const chainId = useChainId();
      const { chains } = useSwitchChain();
      let currentChain = chains.find(item => item.id === chainId)

    const { writeContractAsync, writeContract, error } = useWriteContract();
    const publicClient = createPublicClient({
        chain: currentChain,
        transport: http(),
    })

    const updateContractData = async (params: any):Promise<{status:string,message?:string}> => {
        try {
            const { contractAddress, functionName, args, chainId } = params;
            const txHash = await writeContractAsync({
                ...params,
            });
            params._cbAfterMetaMask && params._cbAfterMetaMask();
            const receipt:{status:string} = await publicClient.waitForTransactionReceipt({ hash: txHash });
            // console.log(receipt,"receipt~~~~");
            return receipt;
        } catch (error) {
            // console.log(error);
            return {
                status: 'error'
            };
        }
    }

    return {
        updateContractData,
        error
    }
}

export default useUpdateContract