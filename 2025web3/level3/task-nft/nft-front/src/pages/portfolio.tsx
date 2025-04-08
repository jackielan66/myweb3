
import { Box, Button, Container } from "@mui/material";
import Header from "../components/Header";
import { PortfolioSidebar, PortfolioMain } from "../components/Portfolio"
import { MakeOrder } from "../components/Order";
import React, { use, useEffect } from "react";
import { getPortfolioBids, getPortfolioCollections, getPortfolioList } from "../api/common-api";
import { useAccount, useChainId } from "wagmi";
const PortfolioPage = () => {
    const [orderDialogCfg, setOrderDialogCfg] = React.useState({
        open: false,
        orderId: 0,
        type: '',
    })
    const chainId = useChainId();
    const account = useAccount()

    useEffect(() => {
        let params = {
            filters: {
                user_addresses: [account.address],
                chainID: [chainId],
                "page": 1, "page_size": 20 
            },
        }
        // getPortfolioCollections({
        //     filters: JSON.stringify(params.filters),


        // }).then(res => {
        //     console.log(res)
        // });

        getPortfolioList({
            filters: JSON.stringify(params.filters),
        }).then(res => {
            console.log(res)
        });

        // getPortfolioBids({
        //     filters: JSON.stringify(params.filters),
        // }).then(res => {
        //     console.log(res)
        // });

    }, [account])

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }} >
                <Box sx={{
                    width: '300px',
                }} >
                    <PortfolioSidebar />
                </Box>
                <Box sx={{ borderLeft: '1px solid #2D2D2D', flex: 1 }}  >
                    <PortfolioMain />
                </Box>
            </Box>
            <Box sx={{
                display: 'flex', position: 'fixed', bottom: '0', zIndex: '2',
                width: '100%',
                justifyContent: 'center', gap: '20px',
                backgroundColor: '#000',
                padding: '20px',
                color: '#fff',
                fontSize: '20px',
                fontWeight: 'bold',

            }} >

                <Button variant='contained' sx={{ mt: '20px' }} onClick={() => {
                    setOrderDialogCfg({
                        open: true,
                        type: 'makeOrder',
                        orderId: 1
                    })
                }}>
                    挂单
                </Button>
                <Button>
                    接收
                </Button>
            </Box>
            <MakeOrder open={orderDialogCfg.open} onCancel={() => {
                setOrderDialogCfg({
                    open: false,
                    type: 'makeOrder',
                    orderId: 1
                })
            }} />
        </>

    )
}

export default PortfolioPage;