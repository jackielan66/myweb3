import {
    Card, Box, CardHeader, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    InputLabel,
    TextField, Select, MenuItem, FormControl
} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { watchContractEvent } from '@wagmi/core'
import { ABI_EXCHANGE, ADDRESS_CONTRACT_ADDRESS } from "../utils/contractCfg";
import { useEffect, useState } from "react";
import { wagmiConfig } from "../utils/wagmi";
import { createPublicClient, http, parseAbiItem } from 'viem'
import { useAccount, useWriteContract } from "wagmi";
import dayjs from 'dayjs';
const Order = () => {
    const account = useAccount();
    const { writeContract } = useWriteContract()


    const publicClient = createPublicClient({
        chain: wagmiConfig.chains[0],
        transport: http()
    })

    const [myMakeOrders, setMyMakeOrders] = useState<any>([]);
    const [otherMakeOrders, setOtherMakeOrders] = useState<any>([]);
    const [finishOrders, setFinishOrders] = useState<any>([]);
    const getLogs = async () => {
        const makeOrderLogs = await publicClient.getLogs({
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            event: parseAbiItem("event MakeOrder(uint256,address,address,uint256,address,uint256,uint256)"),
            fromBlock: 'earliest',  // 或者 'latest' 仅获取最近的事件
            toBlock: 'latest'
        });
        const cancelOrderLogs = await publicClient.getLogs({
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            event: parseAbiItem("event CancelOrder(uint256,address,address,uint256,address,uint256,uint256)"),
            fromBlock: 'earliest',  // 或者 'latest' 仅获取最近的事件
            toBlock: 'latest'
        });
        // 完成的订单
        const tradeLogs = await publicClient.getLogs({
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            event: parseAbiItem("event TradeOrder(uint256,address,address,uint256,address,uint256,uint256)"),
            fromBlock: 'earliest',  // 或者 'latest' 仅获取最近的事件
            toBlock: 'latest'
        });
        let TradeOrderObj = ABI_EXCHANGE.find((item) => item.name === 'TradeOrder');
        const tradeInputs = TradeOrderObj?.inputs || {} as any;
        let tradeList:any[] = [];
        tradeLogs.forEach((item: any) => {
            let obj: any = {}
            item.args.forEach((value: any, index: any) => {
                obj[tradeInputs[index].name] = value
            })
            tradeList.push(obj)
        });
        setFinishOrders(tradeList)
        // console.log(tradeLogs, 'tradeLogs')

        let MakeOrderObj = ABI_EXCHANGE.find((item) => item.name === 'MakeOrder');
        const inputs = MakeOrderObj?.inputs || {} as any;
        let myOrderList: any[] = [];
        let otherOrderList: any[] = [];
        makeOrderLogs.forEach((item: any) => {
            let obj: any = {}
            item.args.forEach((value: any, index: any) => {
                obj[inputs[index].name] = value
            })
            console.log(obj.user,"user")
            console.log(account,"account user")

            console.log(account?.address?.toLowerCase(),"account user")
            if (obj.user.toLowerCase() === account?.address?.toLowerCase()) {
                myOrderList.push(obj)
            } else {
                otherOrderList.push(obj)
            }
        });

        setMyMakeOrders(myOrderList);
        setOtherMakeOrders(otherOrderList);
    }

    useEffect(() => {
        if (account.address) {
            getLogs()
        }
    }, [account.address])

    const unwatch = watchContractEvent(wagmiConfig, {
        abi: ABI_EXCHANGE,
        onLogs(logs) {
            console.log('Logs changed! watch ', logs)
        },
    })

    const makeOrder = () => {
        setOpen(true)
    }

    const handleConfirmCreateOrder = () => {
        console.log('confirm create order', form)
        writeContract({
            abi: ABI_EXCHANGE,
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            functionName: 'makeOrder',
            args: [
                form.tokenGet,
                form.amountGet,
                form.tokenGive,
                form.amountGive,
            ],
        })
    }

    const handleCancelOrder = (id: string) => {
        writeContract({
            abi: ABI_EXCHANGE,
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            functionName: 'cancelOrder',
            args: [
                id
            ],
        })
    }

    const handleFillOrder = (id: string) => {
        writeContract({
            abi: ABI_EXCHANGE,
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            functionName: 'fillOrder',
            args: [
                id
            ],
        })
    }

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        tokenGet: ADDRESS_CONTRACT_ADDRESS.ether,
        amountGet: 1,
        tokenGive: ADDRESS_CONTRACT_ADDRESS.token20,
        amountGive: 18,
    })
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box sx={{ display: "flex", gap: 2, margin: "auto" }}>
            <Card sx={{ flex: 1 }}>
                <CardHeader title={`已完成交易`} />
                <CardContent>
                    <TableContainer>
                        <Table sx={{ minWidth: 400, border: "1px solid #ddd" }} size="small" >
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell align="center">编号</TableCell>
                                    <TableCell align="center">出售TOKEN</TableCell>
                                    <TableCell align="center">购买ETH</TableCell>
                                    <TableCell align="center">时间</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {finishOrders.map((row:any) => (
                                    <TableRow key={row.id} sx={{ borderBottom: "1px solid #ddd" }}>
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="center">{row.amountGive}</TableCell>
                                        <TableCell align="center">{row.amountGet}</TableCell>
                                        <TableCell align="center">{dayjs(Number(row.timestamp)*1000).format('YYYY-MM-DD')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
                <CardHeader title={`交易中-我创建的订单`} />
                <CardContent>
                    <Button variant="contained" onClick={() => makeOrder()}>创建订单</Button>
                    <Table sx={{ minWidth: 400, border: "1px solid #ddd" }} size="small" >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell align="center">编号</TableCell>
                                <TableCell align="center">出售TOKEN</TableCell>
                                <TableCell align="center">购买ETH</TableCell>
                                <TableCell align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myMakeOrders.map((row: any) => (
                                <TableRow key={row.id} sx={{ borderBottom: "1px solid #ddd" }}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.amountGive}</TableCell>
                                    <TableCell align="center">{row.amountGet}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => {
                                            handleCancelOrder(row.id)
                                        }} >取消</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
                <CardHeader title={`交易中-其他人的订单`} />
                <CardContent>
                    <Table sx={{ minWidth: 400, border: "1px solid #ddd" }} size="small" >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell align="center">编号</TableCell>
                                <TableCell align="center">出售TOKEN</TableCell>
                                <TableCell align="center">购买ETH</TableCell>
                                <TableCell align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {otherMakeOrders.map((row: any) => (
                                <TableRow key={row.id} sx={{ borderBottom: "1px solid #ddd" }}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.amountGive}</TableCell>
                                    <TableCell align="center">{row.amountGet}</TableCell>
                                    <TableCell align="center">
                                        <Button type="primary" onClick={() => {
                                            handleFillOrder(row.id)
                                        }} >买入</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"创建订单?"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amountGive"
                        label="出售TOKEN"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={form.amountGive}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                amountGive: Number(e.target.value)
                            })
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="amountGet"
                        label="购买ETHER数量"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={form.amountGet}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                amountGet: Number(e.target.value)
                            })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleConfirmCreateOrder}>创建</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Order