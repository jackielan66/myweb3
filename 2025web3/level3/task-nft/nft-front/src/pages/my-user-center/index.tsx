
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/Header";
import { PortfolioSidebar, PortfolioMain } from "../../components/Portfolio"
import { MakeOrder } from "../../components/Order";
import React, { use, useEffect } from "react";
import { getPortfolioBids, getPortfolioCollections, getPortfolioList, getUserStatus } from "../../api/common-api";
import { useAccount, useChainId } from "wagmi";
import useGetUserLoginStatus from "../../hooks/useGetUserLoginStatus";
import MainView from "./components/mainView";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { formatDate } from "../../utils/tools";

export async function getServerSideProps(context: GetServerSideProps) {
    let currentDate = new Date();

    return {
        props: {
            title: "我的个人中心 - NFT market" + formatDate(currentDate),
        }
    }
}

const MyUserCenterPage = (props: { title: string }) => {
    const { title } = props
    // const [isSigned, handleSign] = useGetUserLoginStatus();

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            {/* {
                !isSigned && <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }} ><Button onClick={() => {
                    handleSign()
                }} >请登录</Button></Box>
            } */}
            {
                <Box sx={{ display: 'flex' }} >
                    <PortfolioSidebar />
                    <Box sx={{ borderLeft: '1px solid #2D2D2D', flex: 1 }}  >
                        <MainView />
                    </Box>
                </Box>
            }
        </>

    )
}

export default MyUserCenterPage;