import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';

import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, InputLabel, MenuItem, Select, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useAccount, useBalance, useBlock, useBlockNumber, useReadContract, useReadContracts, useSimulateContract, useWriteContract } from 'wagmi';
import { ABI_CONTRACT, ADDRESS_CONTRACT } from '../../utils/contractConfig'
import { parseEther, keccak256, toBytes, formatEther } from 'viem';
import React, { use, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useStakeBase from '../../hooks/useStakeBase';
import { useGetPoolList } from '../../hooks/useGetPoolList';
import { useRouter } from 'next/router';
import useGetERC20TokenInfo from '../../hooks/useGetTokenInfo';
import { SaleKind, Side } from '../../utils/constant';
import useUpdateContract from '../../hooks/useUpdateContract';
const ADMIN_ROLE = keccak256(toBytes("ADMIN_ROLE")); // 计算 ADMIN_ROLE 哈希值

interface TProps {
    open: boolean,
    onCancel: () => void,
    title?: string,
    type?: 'edit' | 'create',
    order?: any,
}
const MakeOrder: React.FC<TProps> = (props) => {
    const { open, onCancel, title = "挂单", order, type } = props;
    const account = useAccount();
    const { data: currentBlockNumber } = useBlockNumber();
    const { startBlock, endBlock, rccPerBlock } = useStakeBase()
    const { updateContractData } = useUpdateContract()

    const { poolList, fetchPoolList } = useGetPoolList();

    const stTokenInfoA = useGetERC20TokenInfo(ADDRESS_CONTRACT.TokenA);
    const stTokenInfoB = useGetERC20TokenInfo(ADDRESS_CONTRACT.TokenB);
    const rccTokenInfo = useGetERC20TokenInfo(ADDRESS_CONTRACT.RccToken)
    const mapTokenInfo = {
        [ADDRESS_CONTRACT.TokenA]: stTokenInfoA,
        [ADDRESS_CONTRACT.TokenB]: stTokenInfoB,
        [ADDRESS_CONTRACT.RccToken]: rccTokenInfo,
        [ADDRESS_CONTRACT.AddressZero]: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        }
    }

    const { writeContractAsync, writeContract, error } = useWriteContract();


    const handleMakeOrder = async (formData) => {
        try {
            let orderList = [formData]
            let receipt = await updateContractData({
                address: ADDRESS_CONTRACT.EasySwapOrderBook,
                abi: ABI_CONTRACT.EasySwapOrderBook,
                functionName: 'makeOrders',
                args: [orderList]
            })
            if (receipt.status === 'success') {
                toast.success('挂单成功')
            } else {
                toast.error('make failed')
            }
            // fetchPoolList()
            // handleClose()
        } catch (error) {
            console.log(error, "error eeror")
        }
    }

    const handleEditOrders = async (formData) => {
        try {
            let editDetail = {
                oldOrderKey: order.orderKey,
                newOrder: formData
            }
            let orderList = [editDetail]
            const receipt = await updateContractData({
                address: ADDRESS_CONTRACT.EasySwapOrderBook,
                abi: ABI_CONTRACT.EasySwapOrderBook,
                functionName: 'editOrders',
                args: [orderList]
            })
            if (receipt.status === 'success') {
                toast.success('编辑成功')
            } else {
                toast.error('Edit failed')
            }
            // fetchPoolList()
            handleClose()
        } catch (error) {
            console.log(error, "error eeror")
        }
    }


    const handleClose = () => {
        onCancel()
    };
    // console.log(poolList, "poolList")
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        if (type === 'edit') {
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            let newOrder = {
                                ...order,
                                price: parseEther(formJson.price),
                            }
                            handleEditOrders(newOrder);
                        } else {
                            let expiry = parseInt((Date.now() / 1000).toString()) + 100000
                            let salt = Math.floor(Math.random() * 100);

                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            // if (!formJson.stTokenAddress) {
                            //     formJson.stTokenAddress = ADDRESS_CONTRACT.AddressZero
                            // }
                            // 订单创建人，当前登录人
                            formJson.maker = account.address;
                            formJson.expiry = expiry;
                            formJson.salt = salt;
                            formJson.price = parseEther(formJson.price)
                            formJson.nft = [10, ADDRESS_CONTRACT.TestERC721, 1];
                            handleMakeOrder(formJson)
                        }


                    },
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            {
                open && <DialogContent>
                    <Box sx={{
                        mt: 2, display: 'flex', flexDirection: 'column', gap: '15px',
                        width: '500px'

                    }}>
                        {/* {
                        poolLength.data > 0 ? <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">质押的代币(stTokenAddress)</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="stTokenAddress"
                                name="stTokenAddress"
                                label="质押的代币(stTokenAddress)"
                                value={defToken}
                                onChange={(e) => {
                                    setDefToken(e.target.value)
                                }}
                            >
                                <MenuItem value={ADDRESS_CONTRACT.TokenA}>{mapTokenInfo[ADDRESS_CONTRACT.TokenA].name}</MenuItem>
                                <MenuItem value={ADDRESS_CONTRACT.TokenB}>{mapTokenInfo[ADDRESS_CONTRACT.TokenB].name}</MenuItem>
                            </Select>
                        </FormControl>
                            :
                            <TextField
                                required
                                id="stTokenAddress"
                                name="stTokenAddress"
                                label="质押的代币(stTokenAddress)"
                                fullWidth
                                disabled={poolLength.data == 0}
                                defaultValue={ADDRESS_CONTRACT.AddressZero}
                            />
                    } */}

                        <TextField
                            autoFocus
                            required
                            type='number'
                            id="side"
                            name="side"
                            label="side(0挂单，1买单)"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            required
                            type='number'
                            id="saleKind"
                            name="saleKind"
                            label="saleKind（0 集合  1 item）"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            type='number'
                            id="price"
                            name="price"
                            label="price"
                            fullWidth
                            variant="standard"
                            defaultValue={
                                type === 'edit' ?
                                    formatEther(order.price) :
                                    0
                            }
                        />
                    </Box>
                </DialogContent>
            }

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </Dialog>

    );
};

export default MakeOrder;
