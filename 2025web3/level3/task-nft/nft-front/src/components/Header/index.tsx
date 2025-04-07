import { NextPage } from "next";
import { Box, Button, Container, Divider, TextField } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Collections',
        path: '/collections'
    },
    {
        name: 'Portfolio',
        path: '/portfolio'
    },
    // {
    //     name: 'Withdraw',
    //     path: '/withdraw'
    // },
    // {
    //     name: 'RCC Reward',
    //     path: '/rccReward'
    // }
]

import { styled } from "@mui/system";


const activeStyle = {
    backgroundColor: "#333",
    color: 'rgb(142, 103, 233)'
}
const LinkText = styled(Button)(({ theme }) => ({
    color: "#fff",
    '&:hover': {
        ...activeStyle
    },
}));



export default function Header() {

    let pathName = usePathname();

    return (
        <Box sx={{
            backgroundColor: "#1C1C1C",
            padding: "10px 20px",
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid #2D2D2D',
        }} >
            <Box sx={{ display: 'flex', gap: '20px' }} >
                {
                    routes.map((item, index) => {
                        return <LinkText key={index} href={item.path}
                            style={
                                pathName === item.path ? activeStyle : {}}
                            className={pathName === item.path ? 'meta-text' : ''} >
                            {item.name}
                        </LinkText>
                    })
                }
            </Box>
            <ConnectButton></ConnectButton>
        </Box>
    )
}