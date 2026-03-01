async function getStockPrice() {
    // 显式禁用缓存，这就变成了 Dynamic Rendering (SSR)
    // 使用 Coindesk API 模拟实时数据
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json', {
        cache: 'no-store'
    });
    return res.json();
}

export default async function StockPage() {
    const data = await getStockPrice();
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Stock (SSR Demo)</h1>
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">数据来源: CoinDesk API</p>
                <p className="text-xl">
                    当前 Bitcoin 价格: <span className="font-mono font-bold text-green-600">{data.bpi.USD.rate}</span> USD
                </p>
                <p className="text-xs text-gray-400 mt-4">Target: Request Time Generation</p>
            </div>
        </div>
    );
}
