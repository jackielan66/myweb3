import { NextPage } from "next";
import { Box, Button, Container, Divider, TextField } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
    // {
    //     name: 'Collections',
    //     path: '/collections'
    // },
    // {
    //     name: 'Portfolio',
    //     path: '/portfolio'
    // },
    // {
    //     name: 'Activities',
    //     path: '/activities'
    // },
    // {
    //     name: '市场中心',
    //     path: '/my-collection'
    // },
    // {
    //     name: '我的NFT资产',
    //     path: '/myNFT'
    // },
    // {
    //     name: '我的用户中心',
    //     path: '/my-user-center'
    // },
    // {
    //     name: 'Test',
    //     path: '/test'
    // },
    {
        name: 'Graph collection',
        path: '/graph-collection'
    },
    {
        name: 'graph user center',
        path: '/graph-user-center'
    },
    {
        name: 'crowdfunding',
        path: '/crowdfunding'
    },
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