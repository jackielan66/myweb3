import React, { use, useState } from "react";
import { Modal, Box, Typography, Button, Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import useGetERC20TokenInfo from '../../hooks/useGetTokenInfo';
import useUpdateContract from '../../hooks/useUpdateContract';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from '../../utils/contractConfig'
import { toast } from "react-toastify";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { IOrder, SaleKind, Side } from "../../types/global";

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


interface BidCustomModalProps {
    open: boolean;
    handleClose: () => void;
    assets: any[];
    onSuccess: () => void;
    orderList: IOrder[];
}

const BidCustomModal = (props: BidCustomModalProps) => {
    const { open,
        handleClose,
        assets,
        onSuccess,
        orderList
    } = props;
    const account = useAccount()
    const [inputValue, setInputValue] = useState("");
    const [inputDay, setInputDay] = useState(1);
    const { updateContractData } = useUpdateContract();

    const setApprovalForAll = async () => {
        try {

            let order = orderList[0];

            let expiry = parseInt((Date.now() / 1000).toString()) + 100000
            let salt = Math.floor(Math.random() * 100);
            let buyOrder = {
                maker: account.address || '',
                expiry: expiry,
                salt: salt,
                price: parseEther(inputValue),
                nft: order.nft,
                side:Side.Bid,
                saleKind: order.saleKind,
            }
            handleMakeOrder(order, buyOrder)


        } catch (error) {
            console.log(error, "error eeror")
            toast.error('授权失败')
        }
    }
    const handleMakeOrder = async (sellOrder: IOrder, buyOrder: IOrder) => {
        try {
            let receipt = await updateContractData({
                address: ADDRESS_CONTRACT.EasySwapOrderBook,
                abi: ABI_CONTRACT.EasySwapOrderBook,
                functionName: 'matchOrder',
                args: [sellOrder, buyOrder],
                value: buyOrder.price,
            })


            if (receipt.status === 'success') {
                toast.success('出价成功')
                onSuccess && onSuccess()
                handleClose()
            } else {
                toast.error(receipt.message)
            }
        } catch (error) {
            console.log(error, "error eeror")
        }
    }

    return (
        <StyledModal open={open} onClose={handleClose}>
            <ModalContent>
                <Typography variant="h6" color="white" gutterBottom className="text-xl">
                    挂单
                </Typography>
                <Box>
                    <Typography>物品</Typography>
                    {
                        assets.map((item, index: number) => {
                            return (
                                <Box key={index} sx={{ display: 'flex', gap: '10px' }} >
                                    <Typography>{item.name}</Typography>
                                    <Typography>{item.symbol}</Typography>
                                </Box>
                            )
                        })
                    }
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography>请输入输入价格</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="输入价格"
                    />
                </Box>

                {/* <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography>到期时间</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={inputDay}
                        onChange={(e) => setInputDay(e.target.value)}
                        placeholder="输入天数"
                    />
                </Box> */}

                <ButtonStyle onClick={() => {
                    setApprovalForAll()

                }}>挂单 {assets.length} 个物品</ButtonStyle>
            </ModalContent>
        </StyledModal>
    );
};

export default BidCustomModal;
