
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/Header";
import { PortfolioSidebar, PortfolioMain } from "../../components/Portfolio"
import React, { use, useEffect } from "react";
import useGetUserLoginStatus from "../../hooks/useGetUserLoginStatus";
import MainView from "./components/mainView";
const MyUserCenterPage = () => {
    const [isSigned, handleSign] = useGetUserLoginStatus();

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }} >
                <Box sx={{
                    width: '300px',
                }} >
                    <PortfolioSidebar />
                </Box>
                <Box sx={{ borderLeft: '1px solid #2D2D2D', flex: 1 }}  >
                    <MainView />
                </Box>
            </Box>
        </>

    )
}

export default MyUserCenterPage;