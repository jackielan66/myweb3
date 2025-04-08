
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/Header";
import { Sidebar, MainContent } from "./components"
import React from "react";
const ActivitiesPage = () => {
    const [orderDialogCfg, setOrderDialogCfg] = React.useState({
        open: false,
        orderId: 0,
        type: '',
    })

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }} >
                <Box sx={{
                    width: '300px',
                }} >
                    <Sidebar />
                </Box>
                <Box sx={{ borderLeft: '1px solid #2D2D2D', flex: 1 }}  >
                    <MainContent />
                </Box>
            </Box>
        </>

    )
}

export default ActivitiesPage;