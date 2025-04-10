import React, { use, useState } from "react";
import { Modal, Box, Typography, Button, Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import useGetERC20TokenInfo from '../../hooks/useGetTokenInfo';
import { SaleKind, Side } from '../../utils/constant';
import useUpdateContract from '../../hooks/useUpdateContract';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from '../../utils/contractConfig'
import { toast } from "react-toastify";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import NftAsset from './NftAsset'
import DataTable from "../Table";
import { getRandomNftImage } from "../../utils/tools";

// 自定义样式
const StyledModal = styled(Modal)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const ModalContent = styled(Box)(({ theme }) => ({
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "12px",
    width: "80%",
    maxWidth: "900px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
    backgroundColor: "#F2A900",
    color: "white",
    marginTop: "15px",
    width: "100%",
    "&:hover": {
        backgroundColor: "#d68900",
    },
}));

const InputRow = styled(Grid)(({ theme }) => ({
    marginBottom: "10px",
}));

const BuyCustomModal = (props) => {
    const { open,
        handleClose,
        assets,
        onSuccess,
        orderList,
        title = "购买"
    } = props;
    const account = useAccount()
    const [inputValue, setInputValue] = useState("");
    const [inputDay, setInputDay] = useState(1);
    const [loading, setLoading] = useState(false)
    const { updateContractData } = useUpdateContract();

    const setApprovalForAll = async () => {
        try {
            setLoading(true)
            let sellOrder = orderList[0];
            let expiry = parseInt((Date.now() / 1000).toString()) + 100000
            let salt = Math.floor(Math.random() * 100);
            let buyOrder = {
                ...sellOrder,
                maker: account.address,
                expiry: expiry,
                salt: salt,
                side: Side.Bid
            }
            try {
                let receipt = await updateContractData({
                    address: ADDRESS_CONTRACT.EasySwapOrderBook,
                    abi: ABI_CONTRACT.EasySwapOrderBook,
                    functionName: 'matchOrder',
                    args: [sellOrder, buyOrder],
                    value: buyOrder.price,
                })
                if (receipt.status === 'success') {
                    toast.success('购买成功')
                    onSuccess && onSuccess()
                    handleClose()
                } else {
                    toast.error('make failed')
                }
                setLoading(false)

            } catch (error) {
                console.log(error, "error eeror")
                setLoading(false)
            } 


        } catch (error) {
            setLoading(false)
            toast.error('购买失败',error)

        }
    }
    const handleMakeOrder = async (sellOrder, buyOrder) => {

    }

    const columns = [
        {
            label: "物品",
            field: "collection_name",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <img src={item.image_url || getRandomNftImage(item.nft?.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-500">{item.nft?.tokenId}</div>
                </div>
            ),
        },
        { label: "稀有度", field: "nft.amount", render: (item) => item.nft?.amount },
        {
            label: "价格", field: "price",
            render: (item) => {
                return formatEther(item.price) + ' ETH'
            }
        },
    ];
    const totalAmount = assets.reduce((acc, cur) => acc + Number(formatEther(cur.price)), 0)
    const dataSource = assets.map(item => item)


    return (
        <StyledModal open={open} onClose={handleClose}>
            <ModalContent>
                <Typography variant="h6" color="white" gutterBottom className="text-xl">
                    {title}
                </Typography>
                <Box>
                    <DataTable columns={columns} data={dataSource} ></DataTable>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', py: '10px' }}>
                    <Typography>价格总计：<span className="text-red-500" >{totalAmount}</span>ETH</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <ButtonStyle
                        loading={loading}
                        onClick={() => {
                            handleClose()
                        }}>取消</ButtonStyle>
                    <ButtonStyle
                        loading={loading}
                        onClick={() => {
                            setApprovalForAll()
                        }}>购买{assets.length} 个物品</ButtonStyle>
                </Box>

            </ModalContent>
        </StyledModal>
    );
};

export default BuyCustomModal;
