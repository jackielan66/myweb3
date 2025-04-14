import React, { use, useState } from "react";
import { Modal, Box, Typography, Button, Grid, TextField, Switch, FormControlLabel, Slide, Slider } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import useUpdateContract from '../../../hooks/useUpdateContract';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from '../../../utils/contractConfig'
import { toast } from "react-toastify";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import { getRandomNftImage } from "../../../utils/tools";
import dayjs from "dayjs";
import { INFT, IOrder, SaleKind, Side } from "../../../types/global";
import DataTable from "../../../components/Table";

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
    assets: any[];
    onSuccess: () => void;
    assetsIsApproved: boolean;
    title: string;
    onCancel: () => void;
}
const MakeCustomModal = (props:IProps) => {

    const { open,
        assets,
        onSuccess,
        assetsIsApproved,
        title
    } = props;
    const account = useAccount()
    const [inputValue, setInputValue] = useState("");
    const [expiry, setExpiry] = useState(1);
    const { updateContractData } = useUpdateContract();

    const handleClose = () => {
        props.onCancel && props.onCancel()
    };
    const setApprovalForAll = async () => {
        if (!inputValue) {
            toast.error('请输入价格')
            return
        }
        try {
            let tokenId = assets[0].tokenId;
            let salt = Math.floor(Math.random() * 100);
            let formJson = {
                maker: account.address || '',
                salt: salt,
                expiry: parseInt((dayjs().add(expiry, 'd').valueOf() / 1000) + ''),
                nft:{
                    tokenId: tokenId,
                    collection: ADDRESS_CONTRACT.TestERC721,
                    amount: 1
                },
                //  [tokenId, ADDRESS_CONTRACT.TestERC721, 1],
                side: Side.Bid,
                saleKind: SaleKind.FixedPriceForItem,
                price: parseEther(inputValue)
            }
            handleMakeOrder(formJson)
        } catch (error) {
            console.log(error, "error eeror")
            toast.error('授权失败')
        }

    }
    const handleMakeOrder = async (formData:IOrder) => {
        try {
            let orderList = [formData]
            let receipt = await updateContractData({
                address: ADDRESS_CONTRACT.EasySwapOrderBook,
                abi: ABI_CONTRACT.EasySwapOrderBook,
                functionName: 'makeOrders',
                args: [orderList],
            })
            if (receipt.status === 'success') {
                toast.success(title + '成功')
                onSuccess && onSuccess()
                handleClose()
            } else {
                toast.error('failed')
            }
        } catch (error) {
            console.log(error, "error eeror")
        }
    }

    const columns = [
        {
            label: "物品",
            field: "name",
            render: (item:INFT) => (
                <div className="flex items-center gap-2">
                    <img src={getRandomNftImage(item.tokenId)} alt="" className="w-8 h-8 rounded-lg" />
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-500">{item.symbol}</div>
                </div>
            ),
        },
        { label: "tokenId", field: "tokenId" },
        {
            label: "价格",
            field: "name",
            // @ts-ignore
            render: (item, index) => (
                <>
                    <TextField
                        sx={{
                            backgroundColor: '#999',
                        }}
                        type="number"
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="请输入价格" ></TextField>
                </>
            ),
        },
    ];


    return (
        <StyledModal open={open} onClose={handleClose}>
            <ModalContent>
                <Typography variant="h6" color="white" gutterBottom className="text-xl">
                    {title}
                </Typography>
                <Box>
                    <DataTable columns={columns} data={assets} ></DataTable>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px', py: '20px'
                }}>
                    <Box>
                        <Typography>到期时间</Typography>
                        <Typography key={expiry} >{dayjs().add(expiry, 'd').format('YYYY-MM-DD HH:mm')}</Typography>
                    </Box>
                    <Box>
                        <Slider
                            sx={{
                                width: '300px',
                            }}
                            color="info"
                            value={expiry}
                            onChange={(e, value) => {
                                setExpiry(value as number)
                            }
                            }
                            valueLabelDisplay="auto"
                            min={1}
                            max={30}
                        />
                    </Box>

                </Box>

                <ButtonStyle onClick={() => {
                    setApprovalForAll()
                }}>{title} {assets.length} 个物品</ButtonStyle>
            </ModalContent>
        </StyledModal>
    );
};

export default MakeCustomModal;
