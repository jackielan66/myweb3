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

const Order = () => {
    const account = useAccount();
    const { writeContract } = useWriteContract()


    const publicClient = createPublicClient({
        chain: wagmiConfig.chains[0],
        transport: http()
    })

    const [myMakeOrders, setMyMakeOrders] = useState<any>([]);

    const [logs, setLogs] = useState<any>([]);
    const getLogs = async () => {
        const makeOrderLogs = await publicClient.getLogs({
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            event: parseAbiItem("event MakeOrder(uint256,address,address,uint256,address,uint256,uint256)"),
            fromBlock: 'earliest',  // 或者 'latest' 仅获取最近的事件
            toBlock: 'latest'
        });
        let MakeOrderObj = ABI_EXCHANGE.find((item) => item.name === 'MakeOrder');
        const inputs = MakeOrderObj?.inputs || {} as any;
        const list = makeOrderLogs.map((item: any) => {
            let obj: any = {}
            item.args.forEach((value: any, index: any) => {
                obj[inputs[index].name] = value
            })
            return obj
        });
        setMyMakeOrders(list);
    }

    useEffect(() => {
        getLogs()
    }, [])

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

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        tokenGet: '',
        amountGet: 1,
        tokenGive: '',
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
                        <Table sx={{ minWidth: 400, border: "1px solid #ddd" }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell align="center">编号</TableCell>
                                    <TableCell align="center">姓名</TableCell>
                                    <TableCell align="center">年龄</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[{ id: 1, name: "张三", age: 25 }, { id: 2, name: "李四", age: 30 }].map((row) => (
                                    <TableRow key={row.id} sx={{ borderBottom: "1px solid #ddd" }}>
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.age}</TableCell>
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
                                <TableCell align="center">tokenGet</TableCell>
                                <TableCell align="center">tokenGive</TableCell>
                                <TableCell align="center">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myMakeOrders.map((row:any) => (
                                <TableRow key={row.id} sx={{ borderBottom: "1px solid #ddd" }}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.amountGet}</TableCell>
                                    <TableCell align="center">{row.amountGive}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={()=>{
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
                    <Typography variant="body2">这是卡片  的内容。</Typography>
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
                    <FormControl fullWidth>
                        <InputLabel id="tokenGet">tokenGet</InputLabel>
                        <Select
                            value={form.tokenGet}
                            label="tokenGet"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    tokenGet: e.target.value
                                })
                            }}
                        >
                            <MenuItem value={ADDRESS_CONTRACT_ADDRESS.token20}>{ADDRESS_CONTRACT_ADDRESS.token20}</MenuItem>
                            <MenuItem value={ADDRESS_CONTRACT_ADDRESS.ether}>{ADDRESS_CONTRACT_ADDRESS.ether}</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amountGet"
                        label="amountGet"
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
                    <FormControl fullWidth>
                        <InputLabel id="tokenGive">tokenGive</InputLabel>
                        <Select
                            value={form.tokenGive}
                            label="tokenGive"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    tokenGive: e.target.value
                                })
                            }}
                        >
                            <MenuItem value={ADDRESS_CONTRACT_ADDRESS.token20}>{ADDRESS_CONTRACT_ADDRESS.token20}</MenuItem>
                            <MenuItem value={ADDRESS_CONTRACT_ADDRESS.ether}>{ADDRESS_CONTRACT_ADDRESS.ether}</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="tokenGive"
                        label="tokenGive"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={form.tokenGive}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                tokenGive: e.target.value
                            })
                        }}
                    /> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amountGive"
                        label="amountGive"
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