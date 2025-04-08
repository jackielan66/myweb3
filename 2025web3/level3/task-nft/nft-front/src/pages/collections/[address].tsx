
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tabs } from "@mui/material";

import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCollectionsAddress, getCollectionsRanking, getCollectionsItems } from "../../api/common-api";
import { styled } from "@mui/system";
import OrderDexStats from "./_components/OrderDexStats";
import OrderDexDetail from "./_components/OrderDexDetail";
import { useParams } from "next/navigation";
import { Tab } from '@mui/material';

const TabPanel = ({ children, value, index }: any) => {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

// 生成随机钱包地址头像的函数
function getRandomAvatarUrl(): string {
    const services = [
        // Ethereum Blockies
        (addr: string) => `https://eth-blockies.herokuapp.com/${addr}.png`,
        // Dicebear Pixel Art
        (addr: string) => `https://api.dicebear.com/6.x/pixel-art/svg?seed=${addr}`,
        // Dicebear Avatars
        (addr: string) => `https://api.dicebear.com/6.x/avataaars/svg?seed=${addr}`,
    ];

    // 生成随机的钱包地址
    const randomAddr = '0x' + Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)).join('');

    // 随机选择一个服务
    const randomService = services[Math.floor(Math.random() * services.length)];

    return randomService(randomAddr);
}


const TableHeader = styled(TableHead)(({ theme }) => ({
    backgroundColor: "#292929",
}));

const CollectionAddressPage = () => {
    const urlParams = useParams<{ address: string }>() || {};
    const router = useRouter();
    const [currentDexInfo, setCurrentDexInfo] = useState({});
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCollectionsAddress({
                    address: urlParams.address,
                    chain_id: router.query.chain_id
                }); // 使用封装的 GET 请求
                if (result?.data?.result) {
                    setCurrentDexInfo(result.data.result); // 假设 API 返回的数据
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchDataItem = async () => {
            try {
                let params = {
                    address: urlParams.address,
                    // chain_id: router.query.chain_id,
                    filters: { "sort": 1, "status": [1, 2], "markets": [], "chain_id": router.query.chain_id,
                         "page": 1, "page_size": 20 }

                }

                const result = await getCollectionsItems({
                    address: params.address,
                    filters: '%7B%22sort%22:1,%22status%22:[1,2],%22markets%22:[],%22chain_id%22:31337,%22page%22:1,%22page_size%22:20%7D'
                    // JSON.stringify(params.filters)
                }); // 使用封装的 GET 请求
                if (result?.data?.result) {
                    setCurrentDexInfo(result.data.result); // 假设 API 返回的数据
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataItem()

    }, [urlParams.address, router.query.chain_id]);

    // console.log(currentDexInfo,currentDexInfo);

    const [value, setValue] = useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Header />
            <OrderDexStats data={currentDexInfo} />
            <OrderDexDetail data={currentDexInfo} />
        </>

    )
}

export default CollectionAddressPage;