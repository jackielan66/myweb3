import { Box, Button, Container } from "@mui/material";
import React, { use, useCallback, useEffect, useState } from "react";
import { useAccount, useChainId, useSignMessage } from "wagmi";
import { getLoginMessage, getUserStatus, handleUserLogin } from "../api/common-api";
import { toast } from "react-toastify";



const useGetUserLoginStatus = () => {
    const account = useAccount()
    const [isSigned, setIsSigned] = useState(false);
    const chainId = useChainId()

    const { signMessage, signMessageAsync } = useSignMessage()

    const getLoginStatus = () => {
        getUserStatus({
            address: account.address
        }).then(response => {
            if (response.data.is_signed) {
                setIsSigned(true)
            }
        })
    }
    const handleSign = useCallback(() => {
        const innerFn = async () => {
            if (!account.isConnected) {
                toast.error('Please connect wallet')
                return
            }
            try {
                let signature = await signMessageAsync({ message: account.address + ' is my signature' });
                let loginInfo = await getLoginMessage({ address: account.address })
                await handleUserLogin({
                    chain_id: chainId,
                    signature: signature,
                    address: loginInfo.data.address,
                    message: loginInfo.data.message
                })
                getLoginStatus()

            } catch (error) {
                console.error("用户拒绝签名:", error);
                toast.error('用户拒绝签名')
            }
        };

        innerFn()

    }, [])


    useEffect(() => {
        getLoginStatus()
    }, [account.address])

    return [isSigned, handleSign]
}

export default useGetUserLoginStatus;