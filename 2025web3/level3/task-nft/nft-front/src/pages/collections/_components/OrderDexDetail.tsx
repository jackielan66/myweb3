
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
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

const OrderDexDetail = (props: any) => {
  const { data } = props;
  const urlParams = useParams<{ address: string }>() || {};
  const router = useRouter();


  useEffect(() => {

  }, [urlParams.address, router.query.chain_id]);

  // console.log(currentDexInfo,currentDexInfo);

  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="portfolio tabs"
          textColor="inherit"
          TabIndicatorProps={{ style: { background: '#a78bfa' } }} // 指示条颜色
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tab iconPosition="start" label="物品" />
          <Tab iconPosition="start" label="活动" />
          <Tab iconPosition="start" label="分析" />
        </Tabs>

        {/* Tab 内容区域 */}
        {/* <TabPanel value={value} index={0}>暂无库存内容</TabPanel>
                <TabPanel value={value} index={1}>暂无历史记录</TabPanel>
                <TabPanel value={value} index={2}>暂无出价</TabPanel>
                <TabPanel value={value} index={3}>暂无借贷数据</TabPanel>
        */}


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
      </Box >

    </>

  )
}

export default OrderDexDetail;