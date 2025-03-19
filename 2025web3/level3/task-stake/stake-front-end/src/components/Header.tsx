'use client'
import { Box, Typography } from '@mui/material'
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import path from 'path'

const Header = () => {
    const pathname = usePathname()
    const Links = [
        {
            "name": "Stake",
            path: "/"
        },
        {
            "name": "Withdrawal",
            path: "/withdraw"
        }
    ]
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            gap: "1rem"
        }}>
            <Box>Lan Stake</Box>
            <Box sx={{
                display: "flex",
            }}>
                <Box display={'flex'}>
                    {
                        Links.map((item, index) => {
                            const active = (pathname === item.path || pathname === item.path + '/');
                            return <Typography
                                sx={{
                                    mx: '15px',
                                    fontWeight: active ? '700' : '400',
                                    fontSize: '20px',
                                    textTransform: 'none',
                                    '&:before': {
                                        content: '""',
                                        display: active ? 'inline-block' : 'none',
                                        verticalAlign: 'middle',
                                        mr: '3px',
                                        width: '5px',
                                        height: '5px',
                                        borderRadius: '10px',
                                        background: '#000',
                                        fontSize: '20px'
                                    }
                                }}
                                key={index} className='default-menu hvr-grow'
                            >
                                <Link key={index} href={item.path}>{item.name}</Link>

                            </Typography>
                        })
                    }

                </Box>
                <ConnectButton></ConnectButton>
            </Box>
            
        </Box>
    )

}

export default Header