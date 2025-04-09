
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/Header";
import { PortfolioSidebar, PortfolioMain } from "../../components/Portfolio"
import { MakeOrder } from "../../components/Order";
import React, { use, useEffect } from "react";
import { getPortfolioBids, getPortfolioCollections, getPortfolioList, getUserStatus } from "../../api/common-api";
import { useAccount, useChainId } from "wagmi";
import useGetUserLoginStatus from "../../hooks/useGetUserLoginStatus";
import MainView from "./components/mainView";
const MyUserCenterPage = () => {
    const [isSigned, handleSign] = useGetUserLoginStatus();

    return (
        <>
            <Header />
            {
                !isSigned && <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }} ><Button onClick={() => {
                    handleSign()
                }} >请登录</Button></Box>
            }
            {
                isSigned && <Box sx={{ display: 'flex' }} >
                    <Box sx={{
                        width: '300px',
                    }} >
                        <PortfolioSidebar />
                    </Box>
                    <Box sx={{ borderLeft: '1px solid #2D2D2D', flex: 1 }}  >
                        <MainView />
                    </Box>
                </Box>
            }
        </>

    )
}

export default MyUserCenterPage;