
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

const NativeCurrency: React.FC<{ poolId: string }> = (props: {
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
  const poolInfoModel = convertModel(curPoolInfo.data, 'pool')

  // console.log(curPoolInfo, "  curPoolInfo ")
  console.log(poolInfoModel, "  poolInfoModel ")

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
    query: {
      enabled: Boolean(account.address),
    },
  })

  const rccStakeInfo = useReadContract({
    address: ADDRESS_CONTRACT.RccStake,
    abi: ABI_CONTRACT.RCCStake,
    functionName: 'stakingBalance',
    args: [poolId, account.address],
    query: {
      enabled: Boolean(account.address) && Boolean(poolId),
    },
  })


  console.log(rccStakeInfo, "  rccStakeInfo ")

  const btnDisable = useMemo(() => {
    if (!amount || !account || !balance.data?.formatted) {
      return true
    }
    return false
  }, [balance.data, amount])

  const handleStake = async () => {
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
      const tx = await writeContractAsync({
        address: ADDRESS_CONTRACT.RccStake,
        abi: ABI_CONTRACT.RCCStake,
        functionName: 'depositETH',
        value: parseEther(amount)
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
      rccStakeInfo.refetch()
      balance.refetch()
    }
  }, [result2.data, result1.data])

  return (
    <>
      <Container>
        <Typography variant='h3' align='center' >
          Rcc Stake
        </Typography>
        <Typography variant='h5' align='center' >
          Stake ETH to earn Rcc tokens.
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
            Staked Amount:{rccStakeInfo.data ? formatEther(rccStakeInfo.data as bigint) : 0} ETH
          </Typography>
          <TextField
            type='number'
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
            }}
            placeholder='请输入要质押的代币数量' label="Amount" ></TextField>
          {
            account.isConnected ? <Button loading={loading}
              disabled={btnDisable}
              variant='contained' sx={{ mt: '20px' }} onClick={handleStake}>Stake质押</Button> :
              <ConnectButton></ConnectButton>
          }
        </Box>
      </Container>

    </>
  );
};

export default NativeCurrency;
