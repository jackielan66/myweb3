// pages/index.js

import React, { use, useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Tab } from "@mui/material";
import { styled } from "@mui/system";
import { getActivities } from "../../../api/common-api";
import { useChainId, useAccount } from "wagmi";
import { formatEther } from "viem";
import DataTable from "../../../components/Table";
import useNFTs from "../../../hooks/useNFTs";
import { INFT } from "../../../types/global";

function formatTime(seconds: number): string {
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);

  const date = new Date(seconds * 1000);

  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  //   const seconds = Math.floor(diff / 1000);

  if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return `${seconds}秒前`;
  }
}

const nftImages = [
  "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500&auto=format",
  "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500&auto=format",
  "https://i.seadn.io/gcs/files/c6cb0b1d6f2ab61c0efacf00e62e2230.jpg?w=500&auto=format",
  "https://i.seadn.io/gcs/files/a8a2c681f0437294a88d4fd4cd161a0d.png?w=500&auto=format",
  "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500&auto=format",
  "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?w=500&auto=format",
  "https://i.seadn.io/gae/Qe-nxjnG1ZNrxQvVvR4aI5SyLuqT4oKw7XJYVLBJNJzNOScPbpClW6e1wm2sUYPzQWBc2WBCFzGHGFsj1fHxZTBs3VVJ2u-0YnQF?w=500&auto=format",
  "https://i.seadn.io/gae/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI?w=500&auto=format",
  "https://i.seadn.io/gae/PHxWz47uWRKHGnUBk-CkWZdUiE6kzX_sgvQN1YKBn45qZbI3Dj3RXwwh-9Xb2xlwqkEUF9_o-ySm_uqEICe0v-nfE3mQB3skjENYXA?w=500&auto=format",
  "https://i.seadn.io/gae/6X867ZmCsuYcjHpx-nmNkXeHaDFd2m-EDEEkExVLKETphkfcrpRJOyzFxRQlc-29J0e-9mB9uDGze0O9yracSA9ibnQm2sIq5i2Yuw?w=500&auto=format",
  "https://i.seadn.io/gae/d784iHHbqQFVH1XYD6HoT4u3y_Fsu_9FZUltWjnOzoYv7qqB5dLUqpGyHBd8Gq3h4mykK5PtkYzdGGoryWJaiFzGyx0_cWbwwE_W?w=500&auto=format",
  "https://i.seadn.io/gae/8g0poMCQ5J9SZHMsQ3VD3C_8zoXzMJThmm0AwA11RuKGS4lqXPzrZlqKVUZ5PzhWS_GqLTOFoZLgXq6XTVQUqkz1XPq6AmwLd9Wz?w=500&auto=format",
  "https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?w=500&auto=format",
  "https://i.seadn.io/gae/obxP_zMXHWA8qZK4GkdD3HGQGLXJGXfs6GPbHCXxeqQWcjVEfqMoaix7dY7uUc8yHGQA4iBIKZpsTIxv0qEQqtYYxHdBCHe6_qhY?w=500&auto=format",
  "https://i.seadn.io/gae/9EPP0IGrMUgR8FgFd-RTo4epMm55JUEOVaUvGY9CKQM9J47Ni6OxOTbQKeDwS_8BXo5IKL4H_Q0tZ8pK2UsE1eEpyVB6_T_GvgD9=w600",
  "https://i.seadn.io/gae/KbTJGEK-dRFtvh56IY6AaWFqJJylvCjYqjMJKF8ymx4iWzU8lYS3nMXoHHHVE1Zqb8QWGRJz3qB9uPcBDJMv-vqpUs7GS-qjRANj?w=500&auto=format",
  "https://i.seadn.io/gae/UA7blhz93Jk8BwqDf6EX6Rc8teS_T5KGGXz9p8XkI6u8oQhh4WkHrPKqQqQd7E3nPTvZ-_uFX_WTLKgiDHd6MuuUQb_J2OHE4Iqn?w=500&auto=format",
  "https://i.seadn.io/gae/6ev2GVLx3BDJq89890xrLuoS6kNT7H0C_cC5-Tg4uBM0PSvKGkqIxF0K1E0fS9kJey9B5AGFnQwU3e9HzJ75f-Z0hpRVL-O-mQlZ?w=500&auto=format",
  "https://i.seadn.io/gae/ZWEV7BBCrHlVe8nOh0ySo5uZQxqwMTZ7_GQu0cLrGQWcHJTGx2cEyZyQHf7j_KhxZMsBxnKhc_UDmFV-VUG0bBLM3rqYTGddGhFS?w=500&auto=format",
  "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhvDpyXIP17hRUS7ZJT31O5ieZKXs1Y?w=500&auto=format",
];

function getRandomNftImage(): string {
  const randomIndex = Math.floor(Math.random() * nftImages.length);
  return nftImages[randomIndex];
}

// 自定义样式
const Container = styled(Box)(({ theme }) => ({
  padding: "20px",
  color: "white",
  height: "100%"
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  color: "white",
  marginRight: "10px",
  width: "120px",
  "&:hover": {
    backgroundColor: "#555",
  },
}));

const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#292929",
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: "white",
}));
const MainContent = () => {
  const account = useAccount();
  const chainId = useChainId();

  const { tokenList } = useNFTs();


  const [result, setResult] = useState<any>([]);

  useEffect(() => {




  }, [chainId]);

  console.log(tokenList, "tokenList")

  const columns = [
    {
      label: "资产名称",
      field: "collection_name",
      render: (item:INFT) => (
        <div className="flex items-center gap-2">
          <div>{item.name}({item.symbol})</div>
        </div>
      ),
    },
    {
      label: "物品",
      field: "collection_name",
      render: (item:INFT) => (
        <div className="flex items-center gap-2">
          <img src={getRandomNftImage()} alt="" className="w-8 h-8 rounded-lg" />
          <div>{item.name}</div>
          <div className="text-sm text-gray-500">{item.tokenId}</div>
        </div>
      ),
    },
    {
      label: "操作", field: "type", render: (item:INFT) => {
        return <Box>
          {/* <Button variant="contained" onClick={() => {
            handleCancel(item)
          }}>取消</Button>
          <Button variant="contained" onClick={() => {
            setOrderDialogCfg((prev) => {
              return {
                ...prev,
                open: true,
                order: item
              }
            })
          }}>
            编辑
          </Button> */}
        </Box>
      }
    },
  ];

  return (
    <Container>
      <Typography variant="h6">我的资产列表</Typography>
      <DataTable data={tokenList} columns={columns} />
    </Container>
  );
};

export default MainContent;
