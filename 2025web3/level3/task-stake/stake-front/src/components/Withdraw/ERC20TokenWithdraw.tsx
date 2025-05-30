import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import { useAccount, useBalance, useBlockNumber, useReadContract, useSimulateContract, useWriteContract } from 'wagmi';
import { ABI_CONTRACT, ADDRESS_CONTRACT,convertModel} from '../../utils/contractConfig'
import { formatEther, parseEther } from 'viem';
import { useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createPublicClient, http } from 'viem'
import { config } from '../../wagmi';
import useGetERC20TokenInfo from '../../hooks/useGetTokenInfo';

const ERC20TokenWithdraw: React.FC<{ poolId: string }> = (props) => {
  const { poolId } = props

  const curPoolInfo = useReadContract({
    address: ADDRESS_CONTRACT.RccStake,
    abi: ABI_CONTRACT.RCCStake,
    functionName: 'pool',
    args: [poolId],
    query: {
      enabled: Boolean(poolId),
    },
  });
  const poolInfoModel = convertModel(curPoolInfo.data, 'pool');
  const stTokenBaseInfo = useGetERC20TokenInfo(poolInfoModel.stTokenAddress)


  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const publicClient = createPublicClient({
    chain: config.chains[0],
    transport: http(),
  })
  const account = useAccount();
  const { writeContractAsync, writeContract, error } = useWriteContract();
  // console.log("error,", error)
  const erc20Balance = useBalance({
    address: account.address,
    token:poolInfoModel.stTokenAddress,
    query: {
      enabled: Boolean(account.address) && Boolean(poolInfoModel.stTokenAddress) ,
    },
  })

  const stakingBalanceInfo = useReadContract({
    address: ADDRESS_CONTRACT.RccStake,
    abi: ABI_CONTRACT.RCCStake,
    functionName: 'stakingBalance',
    args: [poolId, account.address],
    query: {
      enabled: Boolean(account.address),
    },
  })

  const withdrawAmountInfo = useReadContract({
    address: ADDRESS_CONTRACT.RccStake,
    abi: ABI_CONTRACT.RCCStake,
    functionName: 'withdrawAmount',
    args: [poolId, account.address],
    query: {
      enabled: Boolean(account.address),
    }
  })
  const withdrawAmountBalanceData = withdrawAmountInfo.data || [] as Array<bigint>;
  const [withdrawTotalAmount = 0, canWithdrawAmount = 0] = withdrawAmountBalanceData
  // console.log(withdrawAmountBalanceData, 'withdrawAmountBalanceData')

  const btnDisable = useMemo(() => {
    if (!amount || !account) {
      return true
    }
    return false
  }, [amount])

  const handleUnStake = async () => {
    console.log(stakingBalanceInfo, 'handleStake')
    if (!account) {
      return
    }

    if (stakingBalanceInfo.data != null) {
      if (parseEther(amount) > stakingBalanceInfo.data) {
        toast.error('Insufficient balance')
        return
      }
    } else {
      return
    }

    try {
      setLoading(true)
      let txHash = await writeContractAsync({
        address: ADDRESS_CONTRACT.RccStake,
        abi: ABI_CONTRACT.RCCStake,
        functionName: 'unstake',
        args: [poolId, parseEther(amount)]
      });
      let receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });
      console.log(receipt, 'receipt')
      stakingBalanceInfo.refetch();
      withdrawAmountInfo.refetch();
      setLoading(false)
      setAmount('')
      if (receipt.status === 'success') {
        toast.success('Transaction receipt !')
      } else {
        toast.error('Transaction failed')
      }
    } catch (error) {
      console.log(error, "error eeror")
      setLoading(false)
    }
  }


  const handleWithdraw = async () => {
    try {
      setLoading(true)
      let txHash = await writeContractAsync({
        address: ADDRESS_CONTRACT.RccStake,
        abi: ABI_CONTRACT.RCCStake,
        functionName: 'withdraw',
        args: [poolId]
      })
      let receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });
      setLoading(false)
      if (receipt.status === 'success') {
        toast.success('提取成功')
      } else {
        toast.error('Transaction failed')
      }
      stakingBalanceInfo.refetch();
      withdrawAmountInfo.refetch();
      erc20Balance.refetch()
    } catch (error) {
      console.log(error, "error eeror")
    }
  }

  const blockNumber = useBlockNumber();

  console.log(poolInfoModel,"poolInfoModel")

  return (
    <Container>
      <Typography variant='h5' align='center' >
         Withdraw {
          stTokenBaseInfo.name
         }
         (当前链上区块号：{blockNumber.data})
         当前可以提现节点{
             poolInfoModel.lastRewardBlock + poolInfoModel.unstakeLockedBlocks
         }
      </Typography>
      <Typography variant='h5' align='center' >
          我的{stTokenBaseInfo.name}的总余额：{
            erc20Balance.data?.formatted
          } {stTokenBaseInfo.symbol}
      </Typography>


      <Box sx={{
        marginTop: '30px',
        border: '1px solid #eee',
        borderRadius: '12px',
        p: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
      }} >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box   >
            <Typography variant='h6' >
              Staked Amount:
            </Typography>
            <Typography variant='body1' >
              {stakingBalanceInfo.data ? formatEther(stakingBalanceInfo.data as bigint) : 0} {stTokenBaseInfo.symbol}
            </Typography>
          </Box>
          <Box sx={{ px: '50px' }} >
            <Typography variant='h6' >
              Available to withdraw:可提款余额
            </Typography>
            <Typography variant='body1' >
              {formatEther(canWithdrawAmount || '')}  {stTokenBaseInfo.symbol}
            </Typography>
          </Box>
          <Box  >
            <Typography variant='h6' >
              Pending Withdraw:待提款余额(时间未到)
            </Typography>
            <Typography variant='body1' >
              {formatEther(withdrawTotalAmount - canWithdrawAmount)}  {stTokenBaseInfo.symbol}
            </Typography>
          </Box>
        </Box>


        <TextField
          type='number'
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
          placeholder='请输入提取的Un Stake' label="Un Stake Amount" ></TextField>
        {
          account.isConnected ? <Button
            disabled={btnDisable}
            loading={loading}
            variant='contained' sx={{ mt: '20px' }} onClick={handleUnStake}>UnStake质押</Button> :
            <ConnectButton></ConnectButton>
        }
      </Box>
      <Box sx={{ mt: '20px', gap: "10px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h6'>
          本次可以提取余额 {formatEther(canWithdrawAmount)} {stTokenBaseInfo.symbol}
        </Typography>
        {
          account.isConnected ? <Button
            loading={loading}
            disabled={canWithdrawAmount <= 0}
            variant='contained' sx={{ mt: '20px' }} onClick={handleWithdraw}>withdraw奖励</Button> :
            <ConnectButton></ConnectButton>
        }
      </Box>
    </Container>
  );
};

export default ERC20TokenWithdraw;
