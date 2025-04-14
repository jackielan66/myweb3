import React, { use, useState } from "react";
import { Modal, Box, Typography, Button, Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import useGetERC20TokenInfo from '../../hooks/useGetTokenInfo';
import { IOrder, SaleKind, Side } from '../../types/global';
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


interface IProps {
    open: boolean;
    handleClose: () => void;
    assets: any[];
    onSuccess?: () => void;
    orderList: IOrder[];
    title?: string;
}
const BuyCustomModal = (props:IProps) => {
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
            let sellOrder:IOrder = {
                side:  orderList[0].side,
                saleKind:orderList[0].saleKind,
                maker:orderList[0].maker,
                nft: orderList[0].nft,
                price: orderList[0].price,
                expiry: orderList[0].expiry,
                salt: orderList[0].salt,
            }
            // orderList[0];
            // console.log(sellOrder, "sellOrder");
            // sellOrder.nft.amount = 10;
            let expiry = sellOrder.expiry;
            let salt = Math.floor(Math.random() * 1000);
            let buyOrder = {
                side: Side.Bid,
                saleKind: sellOrder.saleKind,
                price: sellOrder.price,
                nft: sellOrder.nft,
                maker: account.address,
                expiry: expiry,
                salt: salt,
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
            console.log(error, "error")
            toast.error('购买失败')

        }
    }
 

    const columns = [
        {
            label: "物品",
            field: "collection_name",
            render: (item:IOrder) => (
                <div className="flex items-center gap-2">
                    <img src={getRandomNftImage(item.nft?.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    {/* <div>{item.name}</div> */}
                    <div className="text-sm text-gray-500">{item.nft?.tokenId}</div>
                </div>
            ),
        },
        { label: "稀有度", field: "nft.amount", render: (item:IOrder) => item.nft?.amount },
        {
            label: "价格", field: "price",
            render: (item:IOrder) => {
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
