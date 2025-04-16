
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/Header";
import React, { use, useEffect } from "react";
import Head from "next/head";
import { CollectionStats } from "../../components/Collection";
import { ADDRESS_CONTRACT } from "../../utils/contractConfig";
import { Sidebar, MainView } from "../../components/graph-collection";
import { IOrder,OrderStatue } from "../../types/global";
import { useAllOrderGraph } from "../../hooks/useGraph";
type H_ORDER = IOrder & { _sortKey?: number };


const GraphCollectionPage = () => {
    const { data: orderData } = useAllOrderGraph();
    // console.log('orderData !~~', orderData);
    const [data, setData] = React.useState<{
        name: string,
        image_uri: string,
        volume_24h: string | number,
        volume_total: string | number,
        owner_amount: string | number,
        total_supply: string | number,
    }>({
        name: 'aabbb',
        image_uri: 'https://images.blur.io/_blur-prod/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/7522-a0e3ae3f8d77961e?w=128',
        volume_24h: 0,
        volume_total: 0,
        owner_amount: 0,
        total_supply: 0,
    });
    useEffect(() => {
        // 随机数字大于0
        const random = Math.random() * 1000;
        const volume_24h = random - Math.floor(Math.random() * 100);
        const total_supply = Math.floor(Math.random() * 1000) + '';
        const owner_amount = Math.floor(Math.random() * 100);
        setData({
            name: ADDRESS_CONTRACT.EasySwapOrderBook,
            image_uri: 'https://images.blur.io/_blur-prod/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/7522-a0e3ae3f8d77961e?w=128',
            volume_24h: volume_24h,
            volume_total: random,
            owner_amount: owner_amount,
            total_supply: total_supply,
        })
    }, [])

    return (
        <>
            <Head>
                <title>GRAPH 集合中心</title>
                <meta name="description" content="集合中心" />
            </Head>
            <Header />
            <CollectionStats data={data}></CollectionStats>
            <Box sx={{ display: 'flex' }} >
                <Box sx={{
                    width: '300px',
                }} >
                    <Sidebar />
                </Box>
                <Box sx={{ borderLeft: '1px solid #2D2D2D', flex: 1 }}  >
                    <MainView />
                </Box>
            </Box>
        </>

    )
}

export default GraphCollectionPage;