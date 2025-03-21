"use client"
import React, { useState, useEffect, use } from 'react'
import {
    Box,
    DialogContent, DialogActions, Dialog,
    TextField, Card, CardContent, Typography, CardActions, Button, DialogTitle
} from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi';
import { ABI_EXCHANGE, ABI_TOKEN20, ADDRESS_CONTRACT_ADDRESS } from "@/utils/contractCfg"
import { toEther, toWei } from "@/utils/tools";
const Header = () => {
    const account = useAccount();
    const etherBalanceInTokenContract = useBalance({
        address: account.address,
    });
    const tokenBalanceInTokenContract = useBalance({
        address: account.address,
        token: ADDRESS_CONTRACT_ADDRESS.token20,
        query: {
            enabled: Boolean(account.address),
        }
    });
    const tokenBalanceInExchangeContract = useReadContract({
        abi: ABI_EXCHANGE,
        address: ADDRESS_CONTRACT_ADDRESS.exchange,
        functionName: 'getBalance',
        args: [ADDRESS_CONTRACT_ADDRESS.token20, account.address],
    });
    const etherBalanceInExchangeContract = useReadContract({
        abi: ABI_EXCHANGE,
        address: ADDRESS_CONTRACT_ADDRESS.exchange,
        functionName: 'getBalance',
        args: [ADDRESS_CONTRACT_ADDRESS.ether, account.address],
    });

    const { writeContractAsync } = useWriteContract()

    const depositToExchangeContract = async (value: string) => {
        const writeResult = await writeContractAsync({
            abi: ABI_EXCHANGE,
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            functionName: 'depositEther',
            value: toWei(value)
        });
        console.log(writeResult, 'writeResult')
    }

    const depositTokenToExchangeContract = async (value: string) => {
        // 先授权
        // await writeContractAsync({
        //     abi: ABI_TOKEN20,
        //     address: ADDRESS_CONTRACT_ADDRESS.token20,
        //     functionName: 'approve',
        //     args: [
        //         ADDRESS_CONTRACT_ADDRESS.exchange,
        //         toWei('300')
        //     ]
        // });
        const writeResult = await writeContractAsync({
            abi: ABI_EXCHANGE,
            address: ADDRESS_CONTRACT_ADDRESS.exchange,
            functionName: 'depositToken',
            args: [
                ADDRESS_CONTRACT_ADDRESS.token20,
                value
            ]
        });
        console.log(writeResult, 'writeResult 存钱到交易所')
    }

    const [dialogCfg, setDialogCfg] = useState({
        open: false,
        type: '',
        title: '',
        inputValue: '',
    })

    const handleDialogClose = () => {
        setDialogCfg({
            ...dialogCfg,
            open: false
        })
    }
    const mapTitle: Record<string, string> = {
        'depositEtherToExchange': "存ETH到交易所",
        "depositTokenToExchange": "存TOEKN到交易所"
    }
    const handleDialogOpen = (type: string) => {
        setDialogCfg({
            open: true,
            type,
            title: mapTitle[type],
            inputValue: ''
        })
    }
    const handleConfirmDeposit = () => {
        if (dialogCfg.type === 'depositEtherToExchange') {
            depositToExchangeContract(dialogCfg.inputValue)
        }
        if (dialogCfg.type === 'depositTokenToExchange') {
            depositTokenToExchangeContract(dialogCfg.inputValue)
        }
    }

    return <>
        <Box sx={{ width: '100%', mb: '10px' }}>
            <Card>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        当前登录账号：
                    </Typography>
                    <Typography>
                        {account.address}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        <Box sx={{ width: '100%', mb: '20px', display: 'flex', gap: '20px' }}>
            <Card sx={{ flex: 1 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        钱包中的以太币：
                    </Typography>
                    <Typography variant="h5" component="div">
                        {etherBalanceInTokenContract.data?.formatted}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Eth</Typography>
                </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        钱包中的Token币：
                    </Typography>
                    <Typography variant="h5" component="div">
                        {tokenBalanceInTokenContract.data?.formatted}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        交易所中的以太币：
                    </Typography>
                    <Typography variant="h5" component="div">
                        {toEther(etherBalanceInExchangeContract?.data as string)}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Eth</Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" onClick={() => {
                        handleDialogOpen('depositEtherToExchange');
                    }} >存ETH</Button>
                </CardActions>
            </Card>
            <Card sx={{ flex: 1 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        交易所中Token币：
                    </Typography>
                    <Typography variant="h5" component="div">
                        {tokenBalanceInExchangeContract?.data as string}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => {
                        handleDialogOpen('depositTokenToExchange');
                    }} >存TOKEN</Button>
                </CardActions>
            </Card>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', mb: '20px' }}>
            <div>Header</div>
            <ConnectButton />
        </Box>
        <Dialog
            open={dialogCfg.open}
            keepMounted
            onClose={handleDialogClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{dialogCfg.title}</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="amountGet"
                    label="请输入金额"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={dialogCfg.inputValue}
                    placeholder='请输入'
                    onChange={(e) => {
                        setDialogCfg({
                            ...dialogCfg,
                            inputValue: e.target.value
                        })
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>取消</Button>
                <Button onClick={handleConfirmDeposit}>存钱</Button>
            </DialogActions>
        </Dialog>
    </>
}

export default Header