import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import useGetEventLog from '../../../hooks/useGetEventLog';
import TableView from './tableView';
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

export default function PortfolioTabs() {

    const { makeOrders, cancelOrders } = useGetEventLog()

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
                {/* <Tab icon={<HistoryOutlinedIcon />} iconPosition="start" label="历史" />
                <Tab icon={<AttachMoneyOutlinedIcon />} iconPosition="start" label="出价" />
                <Tab icon={<AccountBalanceWalletOutlinedIcon />} iconPosition="start" label="取消" /> */}
            </Tabs>

            {/* Tab 内容区域 */}
            <TabPanel value={value} index={0}>
                <StockListTableView />
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
                <TableView orderList={makeOrders} />
            </TabPanel>
            <TabPanel value={value} index={2}>暂无出价</TabPanel>
            <TabPanel value={value} index={3}>                <TableView orderList={cancelOrders} />
            </TabPanel> */}
        </Box>
    );
}
