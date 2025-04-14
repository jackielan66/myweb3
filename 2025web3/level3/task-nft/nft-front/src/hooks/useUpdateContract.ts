import { useWriteContract } from "wagmi";
import { createPublicClient, http, parseGwei } from 'viem'
import { config } from '../wagmi';

const useUpdateContract = () => {

    const { writeContractAsync, writeContract, error } = useWriteContract();
    const publicClient = createPublicClient({
        chain: config.chains[0],
        transport: http(),
    })

    const updateContractData = async (params: any):Promise<{status:string,message?:string}> => {
        try {
            const { contractAddress, functionName, args, chainId } = params;
            const txHash = await writeContractAsync({
                ...params,
            });
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