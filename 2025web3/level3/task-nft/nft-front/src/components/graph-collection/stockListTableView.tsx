
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tabs } from "@mui/material";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import { useParams } from "next/navigation";
import { Tab } from '@mui/material';
import { useAccount, useWriteContract } from "wagmi";
import DataTable from "../../components/Table";
import { formatDate, getRandomNftImage, secureAddress } from "../../utils/tools";
import { BuyCustomModal } from "../../components/Order";
import { formatEther } from "viem";
import useNFTs from "../../hooks/useNFTs";
import { Check, CheckBox } from "@mui/icons-material";
import useGetEventLog from "../../hooks/useGetEventLog";
import { IOrder, OrderStatue, Side } from "../../types/global";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAllOrderGraph } from "../../hooks/useGraph";

const StockListTableView = (props: any) => {
    const account = useAccount()
    // const { allOrderList, refetch: refetchOrder } = useGetEventLog()
    const { allOrderListUseGraph: allOrderList, refetch: refetchOrder } = useAllOrderGraph()
    const [orderDialogCfg, setOrderDialogCfg] = useState<{
        open: boolean,
        order: IOrder | {},
        title: string,
        type: 'edit' | 'add'
    }>({
        open: false,
        order: {},
        title: "购买",
        type: 'edit',
    });

    const columns = [
        {
            label: "",
            field: "selection",
            // render: (item) => {
            //     return <CheckBox
            //         checked={item.checked}
            //         onChange={() => {
            //         }}
            //     />
            // },
        },
        {
            label: "类型",
            field: "side",
            render: (item: IOrder) => {
                return <div>{item.side == 0 ? "挂单" : "出价"}</div>
            }
        },
        {
            label: "物品",
            field: "collection_name",
            render: (item: IOrder) => (
                <div className="flex items-center gap-2">
                    <img src={getRandomNftImage(item.nft?.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    <div className="text-sm text-gray-500">{item.nft?.tokenId}</div>
                </div>
            ),
        },
        { label: "稀有度", field: "nft.amount", render: (item: IOrder) => item.nft?.amount },
        {
            label: "价格", field: "price",
            render: (item: IOrder) => {
                return item.price ? formatEther(item.price) + ' ETH' : ' '
            }
        },
        { label: "最高出价", field: "highestBid" },
        {
            label: "从-至", field: "seller", render: (item: IOrder) => {
                return <Box>
                    <Typography>{secureAddress(item.seller)}</Typography>
                    <Typography>{secureAddress(item.buyer)}</Typography>
                </Box>
            }
        },
        { label: "有效期", field: "expire", render: (item: IOrder) => formatDate(Number(item.expiry) * 1000) },
        {
            label: "状态", field: "status", render: (item: IOrder) => {
                if (item.status == OrderStatue.Cancel) {
                    return <div className="text-red-500">取消</div>
                }
                if (item.status == OrderStatue.Complete) {
                    return <div className="text-green-500">交易完成</div>
                }
                if (item.status == OrderStatue.Process) {
                    return <div className="text-yellow-500">进行中</div>
                }
            }
        },
        {
            label: "操作", field: "type", render: (item: IOrder) => {
                let currentLoginAddress = (account.address || '').toLowerCase()
                return <Box>
                    {/* {
                        item.maker
                    }
                    <div>fen</div>
                    {
                        account.address
                    } */}
                    {
                        account.isConnected && item.status == OrderStatue.Process && item.side == 0 && item.maker != currentLoginAddress && <Button variant="contained" onClick={() => {
                            setOrderDialogCfg((prev) => {
                                return {
                                    ...prev,
                                    open: true,
                                    order: item
                                }
                            })
                        }}>
                            购买
                        </Button>
                    }
                    {
                        account.isConnected && item.status == OrderStatue.Process && item.side == 1 && item.maker != currentLoginAddress && <Button variant="contained" onClick={() => {
                            setOrderDialogCfg((prev) => {
                                return {
                                    ...prev,
                                    open: true,
                                    order: item
                                }
                            })
                        }}>
                            出价
                        </Button>
                    }
                    {
                        !account.isConnected && <ConnectButton></ConnectButton>
                    }

                </Box>
            }
        },
    ];

    const dataSource = useMemo(() => {
        return allOrderList
    }, [allOrderList, account.address]);

    return <>
        {
            orderDialogCfg.open && <BuyCustomModal
                title={"购买物资"}
                assets={[orderDialogCfg.order]}
                // @ts-ignore
                orderList={[orderDialogCfg.order]}
                open={orderDialogCfg.open} handleClose={() => {
                    setOrderDialogCfg((prev) => {
                        return {
                            ...prev,
                            open: false,
                        }
                    })
                }}
                onSuccess={() => {
                    refetchOrder()
                }}
            />
        }

        <DataTable columns={columns} data={dataSource} />
    </>
}

export default StockListTableView;