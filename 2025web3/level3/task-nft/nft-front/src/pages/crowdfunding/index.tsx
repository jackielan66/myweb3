import { useReadContract } from "wagmi";
import Header from "../../components/Header";
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../../utils/contractConfig";
import useUpdateContract from "../../hooks/useUpdateContract";
import { toast } from "react-toastify";
import { parseEther, parseUnits } from "viem";
import { CampaignCard } from "../../components/crowdfunding";
import { useState } from "react";

function CrowdfundingPage() {

    const { updateContractData } = useUpdateContract()

    const { data: allCampaigns = [], isLoading } = useReadContract({
        abi: ABI_CONTRACT.CrowdfundingFactory,
        address: ADDRESS_CONTRACT.CrowdfundingFactory,
        functionName: 'getAllCampaigns',
    })

    // 控制模态框显示和表单数据
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        _name: "",
        _description: "",
        _goal: "",
        _durationInDays: ""
    });

    const openModal = () => {
        setFormData({
            _name: "",
            _description: "",
            _goal: "",
            _durationInDays: ""
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setLoading(false)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const createCampaign = async () => {
        setLoading(true); // 开始加载
        try {
            const body = {
                _name: formData._name || "",
                _description: formData._description || "",
                _goal: parseEther(formData._goal),
                _durationInDays: parseInt(formData._durationInDays, 10),
            };
            const res = await updateContractData({
                abi: ABI_CONTRACT.CrowdfundingFactory,
                address: ADDRESS_CONTRACT.CrowdfundingFactory,
                functionName: 'createCampaign',
                args: [body._name, body._description, body._goal, body._durationInDays]
            })

            if (res.status === 'success') {

                toast.success('创建成功')
            } else {
                toast.error('创建失败')
            }
        } catch (error) {
            console.log(error, "error")
            toast.error('创建失败')
        }


    }

    console.log(allCampaigns, "allCampaigns")
    return <>
        <Header />
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Campaign
        </button>

        {/* 模态框 */}
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md text-white">
                    <h2 className="text-xl font-bold mb-4">Create Campaign</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="_name"
                                value={formData._name}
                                onChange={handleInputChange}
                                placeholder="Enter name"
                                className="w-full border-gray-600 bg-gray-700 text-white rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                name="_description"
                                value={formData._description}
                                onChange={handleInputChange}
                                placeholder="Enter description"
                                className="w-full border-gray-600 bg-gray-700 text-white rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Goal (ETH)</label>
                            <input
                                type="number"
                                name="_goal"
                                value={formData._goal}
                                onChange={handleInputChange}
                                placeholder="Enter goal in ETH"
                                className="w-full border-gray-600 bg-gray-700 text-white rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Duration (Days)</label>
                            <input
                                type="number"
                                name="_durationInDays"
                                value={formData._durationInDays}
                                onChange={handleInputChange}
                                placeholder="Enter duration in days"
                                className="w-full border-gray-600 bg-gray-700 text-white rounded px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6 space-x-2">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={createCampaign}
                            disabled={loading} // 禁用按钮防止重复提交
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    创建中...
                                </>
                            ) : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        )}
        <div className="flex flex-wrap gap-4" >{
            isLoading ? <>加载中...</> :
                <>{
                    allCampaigns.map((item: any) => {
                        return <CampaignCard key={item.id} campaignAddress={item.campaignAddress} />
                    })
                }
                </>
        }</div>
    </>

}

export default CrowdfundingPage;