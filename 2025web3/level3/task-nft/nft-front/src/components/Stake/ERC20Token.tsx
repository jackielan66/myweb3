
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import { Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import { useAccount, useBalance, useReadContract, useSimulateContract, useTransactionReceipt, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { ABI_CONTRACT, ADDRESS_CONTRACT, convertModel, DEF_POOL_ID } from '../../utils/contractConfig'
import { formatEther, parseEther } from 'viem';
import React, { use, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import useGetERC20TokenInfo from '../../hooks/useGetTokenInfo';

const ERC20Token: React.FC<{ poolId: string }> = (props: {
    poolId: string
}) => {
    const { poolId } = props
    const account = useAccount();
    const curPoolInfo = useReadContract({
        address: ADDRESS_CONTRACT.RccStake,
        abi: ABI_CONTRACT.RCCStake,
        functionName: 'pool',
        args: [poolId],
        query: {
            enabled: Boolean(poolId),
        },
    })
    const poolInfoModel = convertModel(curPoolInfo.data, 'pool');
    const stTokenBaseInfo = useGetERC20TokenInfo(poolInfoModel.stTokenAddress)


    // console.log(curPoolInfo, "  curPoolInfo ")
    console.log(poolInfoModel, "  poolInfoModel ")
    console.log(stTokenBaseInfo, "  stTokenBaseInfo ")


    const { writeContractAsync, writeContract, error } = useWriteContract();
    const [txHash, setTxHash] = useState('');
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false);

    const result1 = useTransactionReceipt({
        hash: txHash,
        query: {
            enabled: Boolean(txHash),
        },
    });
    const result2 = useWaitForTransactionReceipt({
        hash: txHash,
        query: {
            enabled: Boolean(txHash),
        },
    })

    const balance = useBalance({
        address: account.address,
        token: poolInfoModel.stTokenAddress,
        query: {
            enabled: Boolean(account.address),
        },
    })

    const currentUserInfoRccStakeInfo = useReadContract({
        address: ADDRESS_CONTRACT.RccStake,
        abi: ABI_CONTRACT.RCCStake,
        functionName: 'stakingBalance',
        args: [poolId, account.address],
        query: {
            enabled: Boolean(account.address) && Boolean(poolId),
        },
    })

    const [isApproval, setIsApproval] = useState(false);

    const btnDisable = useMemo(() => {
        if (!amount || !account || !balance.data?.formatted) {
            return true
        }
        return false
    }, [balance.data, amount])

    // TOKEN 授权给交易所数量
    const handleTokenApproveStakePool = async (tokenAddress: any) => {
        setLoading(true)
        try {
            await writeContractAsync({
                address: tokenAddress,
                // 通用类ERC20 ABI
                abi: ABI_CONTRACT.TokenA,
                functionName: 'approve',
                args: [
                    // 授权当前交易所合约操作余额
                    ADDRESS_CONTRACT.RccStake,
                    parseEther(amount)
                ]
            })
            toast.success('授权成功')
            setIsApproval(true);
            setLoading(false);

        } catch (error) {
            setLoading(false)
            toast.error('approve failed')
        }
    }
    const handleStake = async () => {
        if (!isApproval) {
           
            return toast.error('approve first')
        }
        if (!account || !amount || !balance.data?.formatted) {
            return
        }
        if (balance.data?.formatted) {
            if (Number(amount) > Number(balance.data?.formatted)) {
                toast.error('Insufficient balance')
                return
            } else {
                console.log('amount normal', amount)
            }
        } else {
            return
        }

        try {
            setLoading(true)
            // await writeContractAsync({
            //     address: poolInfoModel.stTokenAddress,
            //     // 通用类ERC20 ABI
            //     abi: ABI_CONTRACT.TokenA,
            //     functionName: 'approve',
            //     args: [
            //         // 授权当前交易所合约操作余额
            //         ADDRESS_CONTRACT.RccStake,
            //         parseEther(amount)
            //     ]
            // })

            const tx = await writeContractAsync({
                address: ADDRESS_CONTRACT.RccStake,
                abi: ABI_CONTRACT.RCCStake,
                functionName: 'deposit',
                args: [poolId, parseEther(amount)],
            })
            setTxHash(tx)

        } catch (error) {
            console.log(error, "error eeror")
            setLoading(false)
        }
    }

    // 接收交易成功，显示回调用
    useEffect(() => {
        if (result2.data?.status === "success") {
            toast.success('Stake success');
            setLoading(false)
            setTxHash('')
            setAmount('')
            currentUserInfoRccStakeInfo.refetch()
            balance.refetch()
        }
    }, [result2.data, result1.data])


    return (
        <>
            <Container>
                <Typography variant='h5' align='center' >
                    Stake {stTokenBaseInfo?.name} ({stTokenBaseInfo?.symbol})
                </Typography>
                <Typography variant='h5' align='center' >
                    当前质押 {stTokenBaseInfo?.name}
                </Typography>

                <Box sx={{
                    border: '1px solid #eee',
                    borderRadius: '12px',
                    p: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <Typography variant='subtitle1' >
                        Current User Staked Amount:{currentUserInfoRccStakeInfo.data ? formatEther(currentUserInfoRccStakeInfo.data as bigint) : 0} {stTokenBaseInfo?.symbol}
                    </Typography>
                    <TextField
                        type='number'
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value)
                        }}
                        placeholder='请输入要质押的代币数量' label="Amount" ></TextField>
                    {
                        account.isConnected ?
                            <Box sx={{
                                display: 'flex',
                                m: '20px',
                                gap: '0 20px',
                            }} >
                                <Button
                                loading={loading}
                                disabled={btnDisable}
                                variant='contained' onClick={() => {
                                    handleTokenApproveStakePool(poolInfoModel.stTokenAddress)
                                }} >
                                    approve
                                </Button>
                                <Button loading={loading}
                                    disabled={!isApproval || btnDisable}
                                    variant='contained'
                                    onClick={handleStake}>Stake质押</Button>


                            </Box>
                            :
                            <ConnectButton></ConnectButton>
                    }
                </Box>
            </Container>

        </>
    );
};

export default ERC20Token;
