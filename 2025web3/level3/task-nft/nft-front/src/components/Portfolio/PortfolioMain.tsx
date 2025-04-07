// pages/index.js

import React from "react";
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from "@mui/material";
import { styled } from "@mui/system";

// 自定义样式
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "#1C1C1C",
  padding: "20px",
  color: "white",
  height:"100%"
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  color: "white",
  marginRight: "10px",
  width: "120px",
  backgroundColor: "#333",
  "&:hover": {
    backgroundColor: "#555",
  },
}));

const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#292929",
}));

const PortfolioMain = () => {
  return (
    <Container>
      {/* 筛选按钮 */}
      <Box display="flex" justifyContent="flex-start" marginBottom={2}>
        <ButtonStyle variant="contained">库藏</ButtonStyle>
        <ButtonStyle variant="contained">历史</ButtonStyle>
        <ButtonStyle variant="contained">出价</ButtonStyle>
        <ButtonStyle variant="contained">借贷</ButtonStyle>
      </Box>

      {/* 表格部分 */}
      <Typography variant="h6">所有系列</Typography>
      <TableContainer sx={{ marginTop: 3 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell sx={{ color: "white" }}>稀有度</TableCell>
              <TableCell sx={{ color: "white" }}>挂单价格</TableCell>
              <TableCell sx={{ color: "white" }}>最高出价</TableCell>
              <TableCell sx={{ color: "white" }}>成本</TableCell>
              <TableCell sx={{ color: "white" }}>最大借款</TableCell>
              <TableCell sx={{ color: "white" }}>收购日期</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 假设没有找到数据时显示的空状态 */}
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ color: "gray" }}>
                暂时没有找到NFT资产。
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PortfolioMain;
