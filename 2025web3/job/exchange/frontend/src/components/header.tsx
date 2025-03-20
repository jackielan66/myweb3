"use client"
import React, { useState, useEffect, use } from 'react'
import { Box, TextField } from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { ABI_EXCHANGE, ABI_TOKEN20, ADDRESS_CONTRACT_ADDRESS } from "@/utils/contractCfg"
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
            enabled: Boolean(account.address) ,
        }
    });

    const tokenBalanceInExchangeContract = useReadContract({
        abi: ABI_EXCHANGE,
        address:ADDRESS_CONTRACT_ADDRESS.exchange,
        functionName: 'getBalance',
        args: [ADDRESS_CONTRACT_ADDRESS.token20,account.address],
    });

    const etherBalanceInExchangeContract =useReadContract({
        abi: ABI_EXCHANGE,
        address:ADDRESS_CONTRACT_ADDRESS.exchange,
        functionName: 'getBalance',
        args: [ADDRESS_CONTRACT_ADDRESS.ether,account.address],
    });



    // console.log(accotokenBalanceunt.address, "account.address");

    return <>
        <Box sx={{ width: '100%', mb: '20px' }}>
            <div>当前登录账号：{account.address}</div>
            <div>
                钱包中的以太币：{etherBalanceInTokenContract.data?.formatted}
            </div>
            <div>
                钱包中的Token币：{tokenBalanceInTokenContract.data?.formatted}
            </div>
            <div>
                交易所中的以太币：{tokenBalanceInExchangeContract?.data as string }
            </div>
            <div>
                交易所中Token币：{etherBalanceInExchangeContract?.data as string}
            </div>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', mb: '20px' }}>
            <div>Header</div>
            <ConnectButton />
        </Box>
    </>
}

export default Header