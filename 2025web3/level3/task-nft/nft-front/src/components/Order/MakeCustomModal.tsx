import React, { use, useState } from "react";
import { Modal, Box, Typography, Button, Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import useGetERC20TokenInfo from '../../hooks/useGetTokenInfo';
import { SaleKind, Side } from '../../utils/constant';
import useUpdateContract from '../../hooks/useUpdateContract';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from '../../utils/contractConfig'
import { toast } from "react-toastify";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

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

const CustomModal = (props) => {
    const { open, handleClose,
        assets,
        onSuccess
    } = props;
    const account = useAccount()
    const [inputValue, setInputValue] = useState("");
    const [inputDay, setInputDay] = useState(1);
    const { updateContractData } = useUpdateContract();

    const setApprovalForAll = async () => {
        try {
            let receipt = await updateContractData({
                address: ADDRESS_CONTRACT.TestERC721,
                abi: ABI_CONTRACT.TestERC721,
                functionName: 'setApprovalForAll',
                args: [ADDRESS_CONTRACT.EasySwapVault, true],
            })
            // let receipt = await updateContractData({
            //     address: ADDRESS_CONTRACT.TestERC721,
            //     abi: ABI_CONTRACT.TestERC721,
            //     functionName: 'approve',
            //     args: [ADDRESS_CONTRACT.EasySwapVault, rue],
            // })

            if (receipt.status === 'success') {
                toast.success('授权成功')
                let tokenId = assets[0].tokenId;
                let expiry = parseInt((Date.now() / 1000).toString()) + 100000
                let salt = Math.floor(Math.random() * 100);
                let formJson = {}
                formJson.maker = account.address;
                formJson.expiry = expiry;
                formJson.salt = salt;
                formJson.price = parseEther(inputValue)
                formJson.nft = [tokenId, ADDRESS_CONTRACT.TestERC721, 1];
                formJson.side = Side.List;
                formJson.saleKind = SaleKind.FixedPriceForItem;
                handleMakeOrder(formJson)

            } else {
                toast.error('授权失败')

            }
        } catch (error) {
            console.log(error, "error eeror")
            toast.error('授权失败', error)
        }
    }
    const handleMakeOrder = async (formData) => {
        try {
            let orderList = [formData]
            let receipt = await updateContractData({
                address: ADDRESS_CONTRACT.EasySwapOrderBook,
                abi: ABI_CONTRACT.EasySwapOrderBook,
                functionName: 'makeOrders',
                args: [orderList],
            })
            if (receipt.status === 'success') {
                toast.success('挂单成功')
                onSuccess && onSuccess()
                handleClose()
            } else {
                toast.error('make failed')
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
                        assets.map(item => {
                            return (
                                <Box sx={{ display: 'flex', gap: '10px' }} >
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

                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography>到期时间</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={inputDay}
                        onChange={(e) => setInputDay(e.target.value)}
                        placeholder="输入天数"
                    />
                </Box>

                <ButtonStyle onClick={() => {
                    setApprovalForAll()

                }}>挂单 {assets.length} 个物品</ButtonStyle>
            </ModalContent>
        </StyledModal>
    );
};

export default CustomModal;
