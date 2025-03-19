import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useAccount, useBalance, useWriteContract, useTransactionReceipt } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { stakeAbi } from '@/assets/abis/stake';
import { StakeContractAddress } from '../../utils/env'
import { parseUnits, formatUnits } from 'viem'
import { waitForTransactionReceipt } from "viem/actions";
const MyPage: NextPage = () => {

  const account = useAccount();
  const { isConnected } = account;

  // 确保 txHash 类型为 `0x${string}`
  const [txHash, setTxHash] = useState<string>('');

 
  const receiptData = useTransactionReceipt({
     // ts-ignore
    hash: txHash, // 现在类型匹配
  });
  

  const balanceEth = useBalance({
    address: account.address,
    query: {
      enabled: !!account.address
    }
  })

  const { writeContractAsync, status } = useWriteContract()

  const [stakeAmount, setStakeAmount] = useState('')
  useEffect(() => {
    console.log('myPage')



  }, [])

  console.log("account", account)
  console.log("balanceEth", balanceEth)
  console.log("receiptData", receiptData)


  async function handleStake() {
    if (account.isConnected) {
      // 写合约
      try {
        const res = await writeContractAsync({
          abi: stakeAbi,
          address: StakeContractAddress,
          functionName: 'depositETH',
          args: [],
          value: parseUnits(stakeAmount, 18)
        })
        setTxHash(res)
        // const res = await waitForTransactionReceipt(data, { hash: tx })
        
        // const receiptRes = await useTransactionReceipt({
        //   hash: res,
        // })
        // console.log(receiptRes, 'res writeContractAsync')
        console.log(res, 'res writeContractAsync')
      } catch (error) {
        console.log(error)
      }

    }

  }

  return (
    <Box>myPage
      <Box>
        {isConnected ? <h1>已连接</h1> : <ConnectButton></ConnectButton>}
      </Box>
      <Box>
        <Typography>当前登录账号地址：  {account.address}</Typography>
        <Typography>当前原生币余额：  {balanceEth.data?.formatted}</Typography>

        <TextField onChange={(event) => {
          setStakeAmount(event.target.value);
          // console.log(event.target.value)
        }} label="请输入" variant="outlined" />
        <Button onClick={() => {
          handleStake()
        }} > stake</Button>
      </Box>

    </Box>
  )
}

export default MyPage