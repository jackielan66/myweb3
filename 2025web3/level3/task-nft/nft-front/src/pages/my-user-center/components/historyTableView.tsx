
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import { useParams } from "next/navigation";
import { Tab } from '@mui/material';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../../../utils/contractConfig";
import { useWriteContract } from "wagmi";
import DataTable from "../../../components/Table";
import { formatDate, getRandomNftImage } from "../../../utils/tools";
import { MakeOrder } from "../../../components/Order";
import { formatEther } from "viem";
import useGetEventLog from "../../../hooks/useGetEventLog";
import { IOrder, OrderStatue, Side } from "../../../types/global";
import useUpdateContract from "../../../hooks/useUpdateContract";
import { toast } from "react-toastify";

const HistoryTableView = (props: {
    address: `0x${string}`
}) => {
    const { address } = props;
    const { allOrderList, refetch: refetchLog } = useGetEventLog();
    const [orderDialogCfg, setOrderDialogCfg] = useState({
        open: false,
        order: {},
        title: "编辑",
        type: 'edit',
    })
    const { updateContractData } = useUpdateContract()
    const handleCancel = async (item: IOrder) => {
        try {

            const receipt = await updateContractData({
                address: ADDRESS_CONTRACT.EasySwapOrderBook,
                abi: ABI_CONTRACT.EasySwapOrderBook,
                functionName: 'cancelOrders',
                args: [[item.orderKey]]
            })
            if (receipt.status === 'success') {
                toast.success('取消成功')
                refetchLog()
            } else {
                toast.error('取消失败')
            }
        } catch (error) {
            console.log(error, "error eeror")
        }
    }
    const columns = [
        {
            label: "类型",
            field: "orp",
            render: (item: IOrder) => {
                
                return item.side === Side.Bid ? "出价" : "购买";
            },
        },
        {
            label: "物品",
            field: "collection_name",
            render: (item: IOrder) => (
                <div className="flex items-center gap-2">
                    <img src={getRandomNftImage(item.nft.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    <div className="text-sm text-gray-500">{item.nft.tokenId}</div>
                </div>
            ),
        },
        { label: "价格", field: "price", render: (item: IOrder) => `${formatEther(item.price)} ETH` },
        { label: "时间", field: "event_time", render: (item: IOrder) => formatDate(item.expiry) },
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
                return item.status === OrderStatue.Process && <Box>
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

    const dataSource = allOrderList.filter((item) => {
        return item.maker === address
    });

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
        <DataTable columns={columns} data={dataSource} />
    </>


}

export default HistoryTableView;