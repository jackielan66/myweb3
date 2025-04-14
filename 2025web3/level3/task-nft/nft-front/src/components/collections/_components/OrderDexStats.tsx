import React from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';


const OrderDexStats = (props:any) => {
  const { data = {} } = props
  return (
    <Box >
      <Container sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', gap: '10px' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          <img
            src={data.image_uri}
            alt="Collection"
            className="h-12 w-12 rounded-full"
            style={{
              height: '1.2rem',
              width: '1.2rem',

            }}
          />
          {data.name}
        </Typography>
        <TableContainer sx={{ maxWidth: "500px" }}>
          <Table size="small" sx={{ color: "#fff", textAlign: "right !important" }} >
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: "white", border: 'none' }}>1天交易量</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: "white", border: 'none' }}>总交易量</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: "white", border: 'none' }}>持有者</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: "white", border: 'none' }}>供应商</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 'none', color: "white" }}>
                  <div>{parseFloat(data?.volume_24h).toFixed(2)}ETH</div>

                </TableCell>
                <TableCell sx={{ border: 'none', color: "white" }}>
                  <div>{parseFloat(data?.volume_total).toFixed(2)}ETH</div>

                </TableCell>
                <TableCell sx={{ border: 'none', color: "white" }}>
                  <span>{data?.owner_amount}</span>
                  <span>
                    (
                    {((data?.owner_amount /
                      data?.total_supply) * 100).toFixed(2)}%
                    )
                  </span>
                </TableCell>
                <TableCell sx={{ border: 'none', color: "white" }}>{
                  data.total_supply
                }</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

    </Box>
  );
};

export default OrderDexStats;