// 假设这些类型已经在其他地方声明过（例如：OrderKey, LibOrder.Side, LibOrder.SaleKind, etc.）

export enum Side {
    List,
    Bid
}

export enum SaleKind {
    FixedPriceForCollection,
    FixedPriceForItem
}


type Asset = {
    tokenId: string;   // uint256 -> string
    collection: string; // address -> string
    amount: number;    // uint96 -> number
};



export enum OrderStatue {
    Process,
    Cancel,
    Complete
}

// 主接口类型
export interface IOrder {
    orderKey?: string;
    side: Side;
    saleKind: SaleKind;
    maker: string;  // 地址类型
    nft: Asset;
    price: bigint;
    expiry: number; // uint64 映射到 number
    salt: number;   // uint64 映射到 number
    status?: OrderStatue,
    // 买家
    buyer?: string; 
    // 卖家
    seller?: string;
}
