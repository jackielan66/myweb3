import { Address, formatEther } from "viem";
import { useReadContract, useReadContracts } from "wagmi";
import { ABI_CONTRACT } from "../../utils/contractConfig";
import { useRouter } from "next/router";
import StateBadge from "./StateBadge";


function CampaignCard(props: { campaignAddress: Address }) {
    const router = useRouter()
    const { campaignAddress } = props;
    const crowdfundingContract = {
        address: campaignAddress,
        abi: ABI_CONTRACT.Crowdfunding
    } as const

    const { data: name } = useReadContract({
        ...crowdfundingContract,
        functionName: 'name',
        query: {
            enabled: Boolean(campaignAddress),
        },
    })

    const { data: description } = useReadContract({
        ...crowdfundingContract,
        functionName: 'description',
        query: {
            enabled: Boolean(campaignAddress),
        },
    })

    const { data: goal,isLoading:isGoalLoading } = useReadContract({
        ...crowdfundingContract,
        functionName: 'goal',
        query: {
            enabled: Boolean(campaignAddress),
        },
    })
    const { data: deadline } = useReadContract({
        ...crowdfundingContract,
        functionName: 'deadline',
        query: {
            enabled: Boolean(campaignAddress),
        },
    })

    const { data: contractBalance } = useReadContract({
        ...crowdfundingContract,
        functionName: 'getContractBalance',
        query: {
            enabled: Boolean(campaignAddress),
        },
    })

    const { data: state } = useReadContract({
        ...crowdfundingContract,
        functionName: 'state',
        query: {
            enabled: Boolean(campaignAddress),
        },
    })

    

    if  (isGoalLoading) {
        return <div>Loading...</div>
    }

   

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="p-5 flex-grow">
                <h3 className="text-xl font-bold text-gray-800 truncate">{name as string}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description as string}</p>
                <div className="mt-4 space-y-1 text-sm text-gray-500">
                    <StateBadge state={state as number} />
                    <p>Goal: <span className="font-medium">{formatEther(goal||'')} ETH</span></p>
                    <p>Deadline: <span className="font-medium">{deadline as string}</span></p>
                    <p>Balance: <span className="font-medium">{formatEther(contractBalance||'')} ETH</span></p>
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Raised</span>
                            <span>{(Number(formatEther(contractBalance||'')) / Number(formatEther(goal)) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${Math.min(
                                        (Number(formatEther(contractBalance||'')) / Number(formatEther(goal||''))) * 100,
                                        100
                                    ).toFixed(2)}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Detail Button */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
                <button
                    onClick={() => router.push(`/crowdfunding/${campaignAddress}`)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition"
                >
                    <span>View Detail</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CampaignCard;