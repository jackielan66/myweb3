"use client"
import React, { useState, useEffect, use } from 'react'
import { Box, TextField, Card, CardContent, Typography } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { ABI_EXCHANGE, ABI_TOKEN20, ADDRESS_CONTRACT_ADDRESS } from "@/utils/contractCfg"
import { toEther } from '@/utils/tools';
import { formatUnits } from 'viem';
const Header = () => {
    useEffect(() => {
        console.log('Header')
    }, []);

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



    // console.log(accotokenBalanceunt.address, "account.address");

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
        <Box sx={{ width: '100%', mb: '20px', display: 'flex' ,gap:'20px' }}>

            <Card   sx={{flex:1}}>
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
            <Card  sx={{flex:1}}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        钱包中的Token币：
                    </Typography>
                    <Typography variant="h5" component="div">
                        {tokenBalanceInTokenContract.data?.formatted}
                    </Typography>
                </CardContent>
            </Card>
            <Card  sx={{flex:1}}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        交易所中的以太币：
                    </Typography>
                    <Typography variant="h5" component="div">
                        {tokenBalanceInExchangeContract?.data as string}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Eth</Typography>
                </CardContent>
            </Card>
            <Card  sx={{flex:1}}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        交易所中Token币：
                    </Typography>
                    <Typography variant="h5" component="div">
                        {etherBalanceInExchangeContract?.data as string}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', mb: '20px' }}>
            <div>Header</div>
            <ConnectButton />
        </Box>
    </>
}

export default Header