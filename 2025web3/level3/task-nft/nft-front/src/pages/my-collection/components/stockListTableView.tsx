
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tabs } from "@mui/material";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import { useParams } from "next/navigation";
import { Tab } from '@mui/material';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../../../utils/contractConfig";
import { useAccount, useWriteContract } from "wagmi";
import DataTable from "../../../components/Table";
import { formatDate, getRandomNftImage } from "../../../utils/tools";
import { BuyCustomModal } from "../../../components/Order";
import { formatEther } from "viem";
import useNFTs from "../../../hooks/useNFTs";
import { Check, CheckBox } from "@mui/icons-material";
import useGetEventLog from "../../../hooks/useGetEventLog";
import { Side } from "../../../utils/constant";

const StockListTableView = (props: any) => {
    const account = useAccount()
    const { makeOrders, bidOrderList, sellOrderList } = useGetEventLog()
    const { tokenList, refetch: reFetchNFTs } = useNFTs()
    const [orderDialogCfg, setOrderDialogCfg] = useState({
        open: false,
        order: {},
        title: "购买",
        type: 'edit',
    })

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
            render: (item) => {
                return <div>{item.side == 0 ? "挂单" : "出价"}</div>
            }
        },
        {
            label: "物品",
            field: "collection_name",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <img src={item.image_url || getRandomNftImage(item.nft?.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-500">{item.nft?.tokenId}</div>
                </div>
            ),
        },
        { label: "稀有度", field: "nft.amount", render: (item) => item.nft?.amount },
        {
            label: "价格", field: "price",
            render: (item) => {
                return formatEther(item.price) + ' ETH'
            }
        },
        { label: "最高出价", field: "highestBid" },
        { label: "从", field: "from" },
        { label: "至", field: "to" },
        { label: "有效期", field: "expire", render: (item) => formatDate(Number(item.expiry) * 1000) },
        {
            label: "操作", field: "type", render: (item) => {
                return <Box>
                    {
                        item.side == 0 && item.maker != account.address  && <Button variant="contained" onClick={() => {
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

                </Box>
            }
        },
    ];

    const dataSource = useMemo(() => {
        return [...sellOrderList, ...bidOrderList].filter(item => {
            // 过滤调自己挂单
            if (item.side === Side.List && item.maker === account.address) {
                return false
            }
            return true
        }).
            sort((a, b) => Number(b.expiry) - Number(a.expiry))
    }, [sellOrderList, bidOrderList, account.address]);

    return <>
        {
            orderDialogCfg.open && <BuyCustomModal
                title={orderDialogCfg.title}
                assets={[orderDialogCfg.order]}
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
                    // reFetchNFTs()
                }}
            />
        }

        <DataTable columns={columns} data={dataSource} />
    </>
}

export default StockListTableView;