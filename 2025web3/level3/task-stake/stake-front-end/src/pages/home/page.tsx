'use client'
import { Box, Button, TextField, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { useStakeContract } from '@/hooks/useContract';
import { useAccount, useWalletClient, useBalance } from "wagmi";
import { parseUnits ,formatUnits} from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from "react-toastify";
import { waitForTransactionReceipt } from "viem/actions";
export default function Home() {
  const stakeContract = useStakeContract();
  const { address, isConnected } = useAccount()
  const [stakedAmount, setStakedAmount] = useState('0')
  const [amount, setAmount] = useState('0')
  const [loading, setLoading] = useState(false)
  const { data } = useWalletClient()
  const { data: balance } = useBalance({
    address: address,
  })
  console.log(balance, "-");

  const handleStake = async () => {
    if (!stakeContract || !data) {
      return
    }
    if (parseFloat(amount) > parseFloat(balance!.formatted)) {
      toast.error('Amount cannot be greater than current balance')
      return
    }
    try {
      setLoading(true)
      console.log(stakeContract,"stakeContract")
      const tx = await stakeContract.write.depositETH([], { value: parseUnits(amount, 18) })
      const res = await waitForTransactionReceipt(data, { hash: tx })
      console.log(res, 'tx')
      toast.success('Transaction receipt !')
      setLoading(false)
      getStakedAmount()
    } catch (error) {
      console.log(error,"error")
      setLoading(false)
      toast.error('Stake failed')
    }
  }

  const getStakedAmount = useCallback(async () => {
    if (!stakeContract || !address) {
      return
    }
    const res = await stakeContract?.read.stakingBalance([0, address])
    setStakedAmount(formatUnits(res as bigint, 18))
  }, [stakeContract, address])

  useEffect(() => {

    if (stakeContract && address) {
      getStakedAmount()
    }

  }, [stakeContract, address])

  // 
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
      <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>Rcc Stake</Typography>
      <Typography sx={{}}>Stake ETH to earn tokens.</Typography>
      <Box sx={{ border: '1px solid #eee', borderRadius: '12px', p: '20px', width: '600px', mt: '30px' }}>
        <Box display={'flex'} alignItems={'center'} gap={'5px'} mb='10px'>
          <Box>Staked Amount: </Box>
          <Box>{stakedAmount} ETH</Box>
        </Box>
        <TextField onChange={(e) => {
          setAmount(e.target.value)
        }} sx={{ minWidth: '300px' }} placeholder="请输入amount" label="Amount" variant="outlined" />
        <Box mt='30px'>
          {
            !isConnected ? <ConnectButton /> : <LoadingButton variant='contained' loading={loading} onClick={handleStake}>Stake</LoadingButton>
          }

        </Box>
      </Box>
    </Box>

  );
}