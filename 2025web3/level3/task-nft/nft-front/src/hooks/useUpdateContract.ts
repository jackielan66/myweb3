import { useWriteContract, useChainId, useSwitchChain, useAccount } from "wagmi";
import { createPublicClient, http, parseGwei, ContractFunctionExecutionError, formatGwei, formatEther, Abi, Address } from 'viem'
import useGetPublicClient from "./useGetPublicClient";
import { simulateContract } from "viem/actions";
import { config } from "../wagmi";
import { toast } from "react-toastify";

const extractReadableError = (err: unknown) => {
    // unknown 类型更安全，因为需要做类型检测
    if (err instanceof ContractFunctionExecutionError) {
        const cause = err.cause as any

        // 尝试逐层提取 message
        return (
            cause?.cause?.shortMessage || // 比如：insufficient funds ...
            cause?.shortMessage ||
            cause?.message ||
            err.shortMessage ||
            err.message
        )
    }

    // 非特定错误也返回
    if (err instanceof Error) return err.message
    return String(err)
}

type Params = {
    address: Address,
    abi: Abi,
    functionName: string,
    args: any[],
    chainId: number,
    _cbAfterMetaMask?: () => void
}
const useUpdateContract = () => {
    const { publicClient } = useGetPublicClient()
    const account = useAccount()
    const { writeContractAsync, writeContract, error } = useWriteContract();

    const updateContractData = async (params: Params): Promise<{ status: string, message?: string }> => {
        try {
            // const estimateGasResult = await publicClient.estimateGas({
            //     ...params
            // })
            // // gas 数量
            // console.log(estimateGasResult, "estimateGasResult~~~~~~~");
            // // 每个gas的价格
            // // const getGasPriceResult = await publicClient.getGasPrice();
            // console.log(getGasPriceResult, "getGasPriceResult~~~~~~~");
            // toast.success("预估Gsa价格：" + formatEther(estimateGasResult * getGasPriceResult))
            console.log(params, "params~~~~~~~")
            const simulateResult = await publicClient.simulateContract({
                ...params,
                account: account.address
            });
            console.log(simulateResult, "simulateResult~~~~ simulation");
            const txHash = await writeContractAsync({
                // ...params
                ...simulateResult.request
            });
            params._cbAfterMetaMask && params._cbAfterMetaMask();
            const receipt: { status: string } = await publicClient.waitForTransactionReceipt({ hash: txHash });
            return receipt;
        } catch (error) {
            console.log(error, "error~~~~");
            let message = extractReadableError(error);


            return {
                message: message,
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