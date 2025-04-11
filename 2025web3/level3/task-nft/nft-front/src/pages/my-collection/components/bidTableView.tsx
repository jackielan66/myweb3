
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
import useNFTs from "../../../hooks/useNFTs";
import useMintTokens from "../../../hooks/useMintTokens";
import BidModal from "./bidModal"
import { toast } from "react-toastify";

const BidTableView = (props: any) => {
    const { tokenList } = useNFTs()
    const { mintTokens } = useMintTokens()
    const [orderDialogCfg, setOrderDialogCfg] = useState({
        open: false,
        order: {},
        title: "出价",
        type: 'edit',
        assets:[]
    })
    const { writeContractAsync } = useWriteContract()
    const handleCancel = async (item) => {
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
            // console.log(error, "error eeror")
        }
    }
    const columns = [
        {
            label: "物品",
            field: "collection_name",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <img src={getRandomNftImage(item.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-500">{item.tokenId}</div>
                </div>
            ),
        },

        {
            label: "操作", field: "type", render: (item) => {
                return <Box>
                    <Button variant="contained" onClick={() => {
                        
                        if (tokenList.map(item=>item.tokenId).includes(item.tokenId)) {
                            toast.error("NFT belong to you ")
                            return
                        }
                        setOrderDialogCfg({
                            open: true,
                            order: item,
                            title: "出价",
                            type: 'edit',
                            assets:[item]
                        })
                    }}>出价</Button>
                </Box>
            }
        },
    ];

    const dataSource = mintTokens.map((item) => {
        return {
            ...item
        }
    })

    return <>
        <BidModal open={orderDialogCfg.open}
            title={orderDialogCfg.title}
            order={orderDialogCfg.order}
            assets={orderDialogCfg.assets}
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

export default BidTableView;