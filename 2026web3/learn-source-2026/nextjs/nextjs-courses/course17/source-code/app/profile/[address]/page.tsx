import { createPublicClient, http, formatEther } from 'viem';
import { mainnet } from 'viem/chains';

// 1. 在服务端直接连接节点（安全，Key 不暴露）
// 如果没有配置 ALCHEMY_RPC_URL，viem 会使用默认的公共节点 (rate limited)
const client = createPublicClient({
    chain: mainnet,
    transport: http(process.env.ALCHEMY_RPC_URL)
});

export default async function ProfilePage({ params }: { params: Promise<{ address: string }> }) {
    const { address } = await params;

    let balance = BigInt(0);
    let errorMsg = '';

    try {
        // 2. 服务端获取余额，直接生成 HTML
        balance = await client.getBalance({
            address: address as `0x${string}`
        });
    } catch (e: any) {
        console.error("Error fetching balance:", e);
        errorMsg = "Invalid address or RPC error";
    }

    return (
        <div className="p-10 break-all">
            <h1 className="text-2xl font-bold mb-4">Web3 Profile (Server Component)</h1>
            <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="mb-2 font-semibold">Wallet Address:</p>
                <code className="block bg-purple-100 p-2 rounded mb-4">{address}</code>

                {errorMsg ? (
                    <p className="text-red-500">{errorMsg}</p>
                ) : (
                    <p className="text-xl">
                        Balance: <span className="font-mono font-bold text-purple-700">{formatEther(balance)}</span> ETH
                    </p>
                )}

                <p className="mt-4 text-xs text-gray-500">
                    Fetching directly from Ethereum Mainnet via Server Component.
                    <br />
                    RPC URL is hidden from the client.
                </p>
            </div>
        </div>
    );
}
