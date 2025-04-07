
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from "@mui/material";

import Header from "../components/Header";
import { PortfolioSidebar, PortfolioMain } from "../components/Portfolio"
import { MakeOrder } from "../components/Order";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCollectionsRanking } from "../api/common-api";
import { styled } from "@mui/system";

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

const CollectionPage = () => {
    const [params, setParams] = useState({
        limit: 10,
        range: '15m',
    })
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCollectionsRanking(params); // 使用封装的 GET 请求
                if (result?.data?.result) {
                    setData(result.data.result); // 假设 API 返回的数据
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [params]);

    console.log(data);


    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }} >
                <TableContainer sx={{ marginTop: 3 }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}></TableCell>
                                <TableCell sx={{ color: "white" }}>最高出价</TableCell>
                                <TableCell sx={{ color: "white" }}>1天内变化</TableCell>
                                <TableCell sx={{ color: "white" }}>15天内成交量</TableCell>
                                <TableCell sx={{ color: "white" }}>1天内成交量</TableCell>
                                <TableCell sx={{ color: "white" }}>7天内成交量</TableCell>
                                <TableCell sx={{ color: "white" }}>所有者</TableCell>
                                <TableCell sx={{ color: "white" }}>供应量</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.length > 0 && data.map((collection: any, index: number) => {

                                    return <TableRow
                                        sx={{
                                            cursor: "pointer"
                                        }}
                                        key={collection.address}
                                        className="h-[88px] border-gray-800 group hover:bg-gray-800 cursor-pointer relative"
                                        onClick={() => {
                                            // setState({
                                            //     chain_id: collection.chain_id,
                                            //     collection_address: collection.address,
                                            // });
                                            router.push(
                                                `/collections/${encodeURIComponent(collection.address)}`
                                            );
                                        }}>
                                        <TableCell className="w-[200px]">
                                            {collection.name}
                                        </TableCell>
                                        <TableCell className="w-[120px]">
                                            {collection.floor_price}
                                        </TableCell>
                                        <TableCell className="w-[120px]">
                                            {collection.floor_price_change}
                                        </TableCell>
                                        <TableCell className="w-[120px]">
                                            {collection.item_sold}
                                        </TableCell>
                                        <TableCell className="w-[120px]">
                                            {collection.item_sold}
                                        </TableCell>
                                        <TableCell className="w-[120px]">
                                            {collection.item_sold}
                                        </TableCell>
                                        <TableCell className="w-[120px]">
                                            {/* {collection.owners} */}
                                            <img src={getRandomAvatarUrl()} alt={collection.name} className="w-[40px] h-[40px] rounded-md" />
                                        </TableCell>
                                        <TableCell className="w-[120px]">
                                            {collection.item_num}
                                        </TableCell>
                                    </TableRow>
                                })
                            }
                            {
                                data.length == 0 && <TableRow><TableCell colSpan={6} align="center" sx={{ color: "gray" }}>
                                    暂时没有找到NFT资产。
                                </TableCell>
                                </TableRow>
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>

    )
}

export default CollectionPage;