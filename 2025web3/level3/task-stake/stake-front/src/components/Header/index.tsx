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
    // {
    //     name: 'Stake',
    //     path: '/stake'
    // },
    // {
    //     name: 'Withdraw',
    //     path: '/withdraw'
    // },
    // {
    //     name: 'RCC Reward',
    //     path: '/rccReward'
    // }
]
export default function Header() {

    let pathName = usePathname();

    return (<>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',my:'20px',px:'20px' }} >
            <Box sx={{display:'flex',gap:'20px'}} >
                {
                    routes.map((item, index) => {
                        return <Link key={index} href={item.path} className={pathName === item.path ? 'meta-text' : ''} >
                            {item.name}
                        </Link>
                    })
                }
            </Box>
            <ConnectButton></ConnectButton>
        </Box>
        <Divider />
    </>
    )
}