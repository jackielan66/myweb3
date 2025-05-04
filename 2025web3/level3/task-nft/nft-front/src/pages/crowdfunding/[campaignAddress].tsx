import { Address, formatEther, parseEther } from "viem";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { ABI_CONTRACT } from "../../utils/contractConfig";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import { useState } from "react";
import useUpdateContract from "../../hooks/useUpdateContract";
import { StateBadge } from "../../components/crowdfunding";
import { toast } from "react-toastify";

function CrowdfundingDetail() {
    const { campaignAddress } = useParams() || {};
    const crowdfundingContract = {
        address: campaignAddress,
        abi: ABI_CONTRACT.Crowdfunding
    } as const
    const { address: userAddress } = useAccount();

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

    const { data: goal, isLoading: isGoalLoading } = useReadContract({
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

    const { data: contractBalance, isLoading: isContractBalanceLoading } = useReadContract({
        ...crowdfundingContract,
        functionName: 'getContractBalance',
        query: {
            enabled: Boolean(campaignAddress),
        },
    })

    const { data: tiers = [] } = useReadContract({
        ...crowdfundingContract,
        functionName: 'getTiers',
        query: {
            enabled: Boolean(campaignAddress),
        },
    })

    const { data: owner } = useReadContract({
        ...crowdfundingContract,
        functionName: 'owner',
        query: { enabled: Boolean(campaignAddress) },
    });

    const { data: state } = useReadContract({
        ...crowdfundingContract,
        functionName: 'state',
        query: { enabled: Boolean(campaignAddress) },
    });

    const isOwner = userAddress && owner && (userAddress.toLowerCase() === owner.toLowerCase());
    console.log(isOwner, "isOwner")

    console.log(owner, "owner")


    // Modal & form state
    // useState
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tierName, setTierName] = useState("");
    const [tierAmount, setTierAmount] = useState("");

    const { updateContractData } = useUpdateContract()
    const handleCreateTier = async () => {
        if (!tierName || !tierAmount || isNaN(Number(tierAmount)) || Number(tierAmount) <= 0) {
            alert("Please enter valid tier name and amount.");
            return;
        }
        try {
            const res = await updateContractData({
                ...crowdfundingContract,
                functionName: "addTier",
                args: [tierName, parseEther(tierAmount)],
            });
            if (res.status === 'success') {
                toast.success("Tier created successfully");
            } else {
                toast.error(res.message);
            }
        } catch (error) {

        }


        setIsModalOpen(false);
        setTierName("");
        setTierAmount("");
    };

    const handleFund = async (tierIndex: number, amount: bigint) => {
        await updateContractData({
            ...crowdfundingContract,
            functionName: "fund",
            args: [BigInt(tierIndex)],
            value: amount, // 发送指定数量的 wei
        })
    };

    const handleWithdraw = async () => {
        if (!campaignAddress) return;
        await updateContractData({
            ...crowdfundingContract,
            functionName: "withdraw",
            args: [],
        })
    };
    const handleDeleteTier = async (index: number) => {
        if (!campaignAddress) return;

        await updateContractData({
            ...crowdfundingContract,
            functionName: "removeTier",
            args: [BigInt(index)],
        });
    };

    console.log(tiers, "tiers")

    if (isGoalLoading) {
        return <div>Loading...</div>;
    }
    if (isContractBalanceLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-4xl mx-auto p-6 space-y-8">
                <div className=" shadow rounded-lg p-6 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800">{name as string}</h1>
                    <StateBadge state={state as number} />
                    <p className="text-gray-700">{description as string}</p>
                    <p>Goal: <span className="font-semibold">{formatEther(goal || '')}</span></p>
                    <p>Deadline: <span className="font-semibold">{deadline as string}</span></p>
                    <p>Contract Balance: <span className="font-semibold">{formatEther(contractBalance || '')}</span></p>
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Raised</span>
                            <span>{(Number(formatEther(contractBalance || '')) / Number(formatEther(goal || '')) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${Math.min(
                                        (Number(formatEther(contractBalance || '')) / Number(formatEther(goal || ''))) * 100,
                                        100
                                    ).toFixed(2)}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                    {/* Create Tier Button */}
                    {
                        isOwner && <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Create Tier
                        </button>
                    }

                    {isOwner && (
                        <button
                            onClick={handleWithdraw}
                            className="rgt px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1 z-10"
                        >
                            <span>Withdraw</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>

                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Support Tiers</h2>
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {tiers.map((tier, index: number) => (
                            <div key={index} className="min-w-[250px] bg-white border rounded-lg shadow-sm p-4 flex-shrink-0">
                                <h3 className="text-lg text-gray-600 font-medium">#{index + 1}</h3>
                                <h3 className="text-lg text-gray-600 font-medium">{tier.name}</h3>
                                <p className="text-gray-600">Amount: <span className="font-semibold">{formatEther(tier.amount)} ETH</span></p>
                                <p className="text-gray-600">Backers: <span className="font-semibold">{Number(tier.backers)}</span></p>
                                <button
                                    onClick={() => handleFund(index, tier.amount)}
                                    className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Fund
                                </button>
                                {/* Only show Delete button if user is owner */}
                                {isOwner && (
                                    <button
                                        onClick={() => handleDeleteTier(index)}
                                        className="rgt px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1 z-10"
                                        title="Delete Tier"
                                    >
                                        Delete Tier
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Modal */}
            {/* Modal */}
            {isModalOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 z-40"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md text-white">
                            <h2 className="text-xl font-semibold mb-4">Create Tier</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        value={tierName}
                                        onChange={(e) => setTierName(e.target.value)}
                                        className="mt-1 block w-full border border-gray-600 bg-gray-700 text-white rounded-md p-2 focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Amount (ETH)</label>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={tierAmount}
                                        onChange={(e) => setTierAmount(e.target.value)}
                                        className="mt-1 block w-full border border-gray-600 bg-gray-700 text-white rounded-md p-2 focus:ring focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6 space-x-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateTier}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </div>
    )
}

export default CrowdfundingDetail;