import { useReadContract } from "wagmi";
import { ABI_CONTRACT } from "../utils/contractConfig";
import { erc20Abi } from "viem";


const mapTokenInfo:any={

}
const useGetERC20TokenInfo = (tokenAddress:any) => {
    const erc20baseConfig = {
        address: tokenAddress,
        abi: erc20Abi,
        query: {
            enabled: !!tokenAddress
        }
    }
    const name = useReadContract({
        ...erc20baseConfig,
        functionName: 'name',

    })

    const symbol = useReadContract({
        ...erc20baseConfig,
        functionName: 'symbol',
    })

    let info = {
        name: name.data,
        symbol: symbol.data
    } as unknown as {
        name: string,
        symbol: string
    }
    return info
}

export default useGetERC20TokenInfo;