import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import { useAccount, useBalance, useReadContract, useSimulateContract, useWriteContract } from 'wagmi';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from '../../utils/contractConfig'
import { formatEther, parseEther } from 'viem';
import React, { useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createPublicClient, http } from 'viem'
import { config } from '../../wagmi';
const NativeCurrencyClaim: React.FC<{ poolId: string }> = (props) => {
  const { poolId  } = props
  const [loading, setLoading] = useState(false)

  const publicClient = createPublicClient({
    chain: config.chains[0],
    transport: http(),
  })

  const account = useAccount();
  const { writeContractAsync, writeContract, error } = useWriteContract();

  const rccTokenAddressBalance = useBalance({
    address: account.address,
    token: ADDRESS_CONTRACT.RccToken,
    query: {
      enabled: Boolean(account.address),
    },
  })

  // console.log(poolListInfo, "  poolListInfo ")


  const useMapInfo = useReadContract({
    address: ADDRESS_CONTRACT.RccStake,
    abi: ABI_CONTRACT.RCCStake,
    functionName: 'user',
    args: [poolId, account.address],
    query: {
      enabled: Boolean(account.address),
    },
  })
  console.log(useMapInfo, "  useMapInfo ")





  const handleClaim = async () => {

    try {
      setLoading(true);
      const tx = await writeContractAsync({
        address: ADDRESS_CONTRACT.RccStake,
        abi: ABI_CONTRACT.RCCStake,
        functionName: 'claim',
        args: [poolId]
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
      if (receipt.status === 'success') {
        toast.success('领取成功')
      } else {
        toast.error('Transaction failed')
      }
      setLoading(false)
      useMapInfo.refetch()

    } catch (error) {
      console.log(error, "error eeror")
    }

  }

  return (
    <div>
  
      <main>
        <Container>
          <Typography variant='h3' align='center' >
             钱包中所有RCC数量{rccTokenAddressBalance.data?.formatted} {rccTokenAddressBalance.data?.symbol}
          </Typography>
          <Typography variant='h6' align='center' >
            RCC reward 领取Rcc的代币奖励
          </Typography>
          <Typography variant='h6' align='center' >
            领取RccToken
          </Typography>

          <Box sx={{
            marginTop: '30px',
            border: '1px solid #eee',
            borderRadius: '12px',
            p: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >
            <Typography variant='subtitle1' >
              质押的代币数量:{useMapInfo.data && formatEther(useMapInfo.data[0] || '')} ETH
            </Typography>
            <Typography variant='subtitle1' >
              finishedRCC: 已认领的 RCC 数量
              :{useMapInfo.data && useMapInfo.data[1]}
            </Typography>
            <Typography variant='subtitle1' >
              pendingRCC: 待领取的 RCC 数量
              :{useMapInfo.data && useMapInfo.data[2]}
            </Typography>
          </Box>
          <Box sx={{
            gap: '20px',
            display: 'flex',
            justifyContent: 'center',
            mt: '20px'
          }} >
            <Button color='primary'
              loading={loading}
              disabled={!useMapInfo.data || !useMapInfo.data[2]}
              variant='contained' onClick={() => {
                handleClaim()
              }} >claim</Button>
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default NativeCurrencyClaim;
