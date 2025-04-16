import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import useGetEventLog from '../../../hooks/useGetEventLog';
import HistoryTableView from './historyTableView';
import MakeListTableView from './makeListTableView'
import StockListTableView from './stockListTableView'
import BidListTableView from './bidListTableView'
import { useAccount } from 'wagmi';

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
    const account = useAccount()
    const { } = useGetEventLog()

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
                <Tab icon={<Inventory2OutlinedIcon />} iconPosition="start" label="库存" />
                <Tab icon={<HistoryOutlinedIcon />} iconPosition="start" label="历史" />
                <Tab icon={<AttachMoneyOutlinedIcon />} iconPosition="start" label="出价" />
                <Tab icon={<AccountBalanceWalletOutlinedIcon />} iconPosition="start" label="取消" />
            </Tabs>
            {/* Tab 内容区域 */}
            <TabPanel value={value} index={0}>
                <StockListTableView />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <HistoryTableView address={account.address || ''} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <BidListTableView address={account.address || ''} />
            </TabPanel>
            <TabPanel value={value} index={3}>

            </TabPanel>
        </Box>
    );
}
