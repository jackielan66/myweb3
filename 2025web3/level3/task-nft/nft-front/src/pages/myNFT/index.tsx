
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/Header";
import { Sidebar, MainContent } from "../../components/myNFT"
import React, { use, useEffect, useState } from "react";
import { useAccount, useChainId, useSignMessage } from "wagmi";
import { getLoginMessage, getUserStatus, handleUserLogin } from "../../api/common-api";
import { toast } from "react-toastify";
import useGetUserLoginStatus from "../../hooks/useGetUserLoginStatus";

export async function getServerSideProps(){
    return {
        props: {
            title: "我的NFT",
            chainId: "1221",
            a:"clearg "
        }
    }
}

const MyNFTPage = () => {
    const {isSigned, handleSign} = useGetUserLoginStatus()
    
    return (
        <>
            <Header />
            {
                isSigned && <Box sx={{ display: 'flex' }} >
                    <Box sx={{ borderLeft: '1px solid #2D2D2D', flex: 1 }}  >
                        <MainContent />
                    </Box>
                </Box>
            }
            {
                !isSigned && <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', height: '100vh' }} >
                    <Button  onClick={() => { handleSign() }}>
                        请先登录
                    </Button>
                </Box>
            }

        </>
    )
}

export default MyNFTPage;