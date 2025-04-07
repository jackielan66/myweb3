// pages/index.js

import React from "react";
import { Box, Typography, Button, TextField, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { useAccount } from "wagmi";

// 自定义样式
const SidebarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#1C1C1C",
  padding: "20px",
  color: "white",
  height:"100%"
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  color: "white",
  width: "100%",
  marginTop: "10px",
  backgroundColor: "#333",
  "&:hover": {
    backgroundColor: "#555",
  },
}));

const PortfolioSidebar = () => {
   const userInfo =  useAccount()
    
  return (
    <SidebarContainer>
      {/* 用户头像和钱包地址 */}
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Avatar sx={{ bgcolor: "#4A90E2" }}>🐵</Avatar>
        <Typography variant="body1" sx={{ marginLeft: 1 }}>
            {userInfo.address}
        </Typography>
      </Box>

      {/* 筛选按钮 */}
      <ButtonStyle variant="contained">仅挂单的</ButtonStyle>
      <ButtonStyle variant="contained">显示全部</ButtonStyle>

      {/* 搜索框 */}
      <TextField
        fullWidth
        label="搜索你的系列"
        variant="outlined"
        sx={{ marginTop: 2, backgroundColor: "#292929", borderRadius: "5px" }}
        InputLabelProps={{
          style: { color: "#9E9E9E" },
        }}
        InputProps={{
          style: { color: "white" },
        }}
      />

      {/* 显示NFT系列表头 */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="body2">系列</Typography>
        <Typography variant="body2">底价</Typography>
        <Typography variant="body2">估值</Typography>
        <Typography variant="body2">已挂单</Typography>
      </Box>

      {/* 空数据提示 */}
      <Typography variant="body2" sx={{ marginTop: 2, color: "gray" }}>
        未找到系列。
      </Typography>
    </SidebarContainer>
  );
};

export default PortfolioSidebar;
