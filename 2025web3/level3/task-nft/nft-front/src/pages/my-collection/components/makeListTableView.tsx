
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import { useParams } from "next/navigation";
import { Tab } from '@mui/material';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../../../utils/contractConfig";
import { useWriteContract } from "wagmi";
import DataTable from "../../../components/Table";
import { getRandomNftImage } from "../../../utils/tools";
import { MakeOrder } from "../../../components/Order";
import { formatEther } from "viem";
import { IOrder } from "../../../types/global";

const MakeListTableView = (props: any) => {
    const { orderList = [] } = props;
    const [orderDialogCfg, setOrderDialogCfg] = useState({
        open: false,
        order: {},
        title: "编辑",
        type: 'edit',
    })
    const { writeContractAsync } = useWriteContract()
    const handleCancel = async (item:IOrder) => {
        try {
            await writeContractAsync({
                address: ADDRESS_CONTRACT.EasySwapOrderBook,
                abi: ABI_CONTRACT.EasySwapOrderBook,
                functionName: 'cancelOrders',
                args: [[item.orderKey]]
            })
            // fetchPoolList()
            // handleClose()
        } catch (error) {
            console.log(error, "error eeror")
        }
    }
    const columns = [
        {
            label: "物品",
            field: "collection_name",
            render: (item:IOrder) => (
                <div className="flex items-center gap-2">
                    <img src={getRandomNftImage(item.nft.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    <div className="text-sm text-gray-500">{item.nft.tokenId}</div>
                </div>
            ),
        },
        { label: "稀有度", field: "rarity?.name" },
        { label: "价格", field: "price", render: (item:IOrder) => `${formatEther(item.price)} ETH` },
        { label: "最高出价", field: "highestBid" },
        { label: "从", field: "from" },
        { label: "至", field: "to" },
        { label: "时间", field: "event_time", render: (item:IOrder) => item.expiry },
        {
            label: "操作", field: "type", render: (item:IOrder) => {
                return <Box>
                    <Button variant="contained" onClick={() => {
                        handleCancel(item)
                    }}>取消</Button>
                    <Button variant="contained" onClick={() => {
                        setOrderDialogCfg((prev) => {
                            return {
                                ...prev,
                                open: true,
                                order: item
                            }
                        })
                    }}>
                        编辑
                    </Button>
                </Box>
            }
        },
    ];

    return <>
        <MakeOrder open={orderDialogCfg.open}
            title={orderDialogCfg.title}
            order={orderDialogCfg.order}
            type={'edit'}
            onCancel={() => {
                setOrderDialogCfg((prev) => {
                    return {
                        ...prev,
                        open: false,
                    }
                })
            }} />
        <DataTable columns={columns} data={orderList} />
    </>


}

export default MakeListTableView;