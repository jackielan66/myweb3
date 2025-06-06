
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tabs } from "@mui/material";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import { useParams } from "next/navigation";
import { Tab } from '@mui/material';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from "../../../utils/contractConfig";
import { useWriteContract } from "wagmi";
import DataTable from "../../../components/Table";
import { getRandomNftImage } from "../../../utils/tools";
import { MakeOrder, MakeCustomModal } from "../../../components/Order";
import { formatEther } from "viem";
import { Check, CheckBox } from "@mui/icons-material";
import { INFT, IOrder } from "../../../types/global";
import { useNFTsGraph } from "../../../hooks/useGraph";

const StockListTableView = (props: any) => {
    const { myTokenList, refetch: reFetchNFTs,isApproved=false }  =useNFTsGraph()
    const [orderDialogCfg, setOrderDialogCfg] = useState({
        open: false,
        order: {},
        title: "编辑",
        type: 'edit',
    })

    const columns = [
        {
            label: "",
            field: "selection"
        },
        {
            label: "物品",
            field: "collection_name",
            render: (item:INFT) => (
                <div className="flex items-center gap-2">
                    <img src={getRandomNftImage(item.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-500">{item.tokenId}</div>
                </div>
            ),
        },
        { label: "稀有度", field: "rarity?.name" },
        { label: "价格", field: "price" },
        { label: "最高出价", field: "highestBid" },
        { label: "从", field: "from" },
        { label: "至", field: "to" },
        { label: "时间", field: "event_time" },
        {
            label: "操作", field: "type", render: (item:INFT) => {
                return <Box>
                    <Button variant="contained" onClick={() => {
                        setOrderDialogCfg((prev) => {
                            return {
                                ...prev,
                                open: true,
                                order: item
                            }
                        })
                    }}>
                        挂单
                    </Button>
                </Box>
            }
        },
    ];
    const dataSource = useMemo(() => {
        return myTokenList.map((item) => {
            return item
        })
    }, [myTokenList])

    return <>
        {
            orderDialogCfg.open && <MakeCustomModal
                assetsIsApproved={isApproved}
                assets={[orderDialogCfg.order]}
                open={orderDialogCfg.open} handleClose={() => {
                    setOrderDialogCfg((prev) => {
                        return {
                            ...prev,
                            open: false,
                        }
                    })
                }}
                onSuccess={() => {
                    reFetchNFTs()
                }}
            />
        }

        <DataTable columns={columns} data={dataSource} />
    </>


}

export default StockListTableView;