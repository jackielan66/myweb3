import React, { Suspense, useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BidTableView from './bidTableView';
import MakeListTableView from './makeListTableView'
import StockListTableView from './stockListTableView'

const TabPanel = ({ children, value, index }: any) => {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default function MainView() {


    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="portfolio tabs"
                textColor="inherit"
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tab icon={<Inventory2OutlinedIcon />} iconPosition="start" label="物品" />
                <Tab icon={<AttachMoneyOutlinedIcon />} iconPosition="start" label="出价" />
            </Tabs>

            {/* Tab 内容区域 */}
            <TabPanel value={value} index={0}>
                <Suspense fallback={<div>loading...</div>} >
                    <StockListTableView />
                </Suspense>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Suspense fallback={<div>loading...</div>} >
                    <BidTableView />
                </Suspense>
            </TabPanel>
        </Box>
    );
}
