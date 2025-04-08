// pages/index.js

import React, { use, useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from "@mui/material";
import { styled } from "@mui/system";
import { getActivities } from "../../../api/common-api";
import { useChainId } from "wagmi";


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

  const chainId = useChainId();
  const [result, setResult] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {
          filter_ids: [chainId],
          event_types: [],
          user_addresses: [],
          collection_addresses: [],
          page: 1,
          page_size: 50,
        };
        const result = await getActivities({
          filters: JSON.stringify(params),
        });
        if (result?.data?.result) {
          setResult(result.data.result); // 假设 API 返回的数据
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [chainId]);

  console.log(result, "result")


  return (
    <Container>
      <Typography variant="h6">活动列表</Typography>
      <TableContainer sx={{ marginTop: 3 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <CustomTableCell>操作</CustomTableCell>
              <CustomTableCell>物品</CustomTableCell>
              <CustomTableCell>稀有度	</CustomTableCell>
              <CustomTableCell>价格</CustomTableCell>
              <CustomTableCell>最高出价</CustomTableCell>
              <CustomTableCell>从</CustomTableCell>
              <CustomTableCell>至</CustomTableCell>
              <CustomTableCell>时间</CustomTableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              result.length > 0 && result.map((item, index) => {
                return <TableRow key={index} >
                  <CustomTableCell>  {item.type === "sell" ? "销售" : "挂单"}</CustomTableCell>
                  <CustomTableCell>
                  <img
                          src={item.image_url || getRandomNftImage()}
                          alt=""
                          className="w-8 h-8 rounded-lg"
                        />
                    <div>{item.collection_name}</div>
                    <div className="text-sm text-gray-500">
                      {item.item_name}
                    </div>
                  </CustomTableCell>
                  <CustomTableCell>稀有度	</CustomTableCell>
                  <CustomTableCell>价格</CustomTableCell>
                  <CustomTableCell>最高出价</CustomTableCell>
                  <CustomTableCell>从</CustomTableCell>
                  <CustomTableCell>至</CustomTableCell>
                  <CustomTableCell>时间</CustomTableCell>
                </TableRow>
              })
            }
            {
              result.length == 0 && <TableRow>
                <TableCell colSpan={8} align="center" sx={{ color: "gray" }}>
                  暂时没有找到活动。
                </TableCell>
              </TableRow>
            }

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MainContent;
