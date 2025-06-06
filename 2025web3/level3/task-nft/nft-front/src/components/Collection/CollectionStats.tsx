import React from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

const calculatePercentage = (ownerAmount: string | number, totalSupply: string | number): string => {
  const numOwnerAmount = Number(ownerAmount);
  const numTotalSupply = Number(totalSupply);

  if (isNaN(numOwnerAmount) || isNaN(numTotalSupply) || numTotalSupply === 0) {
    return 'N/A'; // 处理无效值或除以零的情况
  }

  return ((numOwnerAmount / numTotalSupply) * 100).toFixed(2);
};
const CollectionStats = (props: {
  data: {
    name: string,
    image_uri: string,
    volume_24h: string | number,
    volume_total: string | number,
    owner_amount: string | number,
    total_supply: string | number,
  }
}) => {
  const { data } = props
  return (
    <Box sx={{ borderBottom: '1px solid #fff', py: '10px' }} >
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
                  <div>{data?.volume_24h}ETH</div>

                </TableCell>
                <TableCell sx={{ border: 'none', color: "white" }}>
                  <div>{data?.volume_total}ETH</div>

                </TableCell>
                <TableCell sx={{ border: 'none', color: "white" }}>
                  <span>{data?.owner_amount}</span>
                  <span>
                    {
                      calculatePercentage(data?.owner_amount, data.total_supply)
                    }%
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

export default CollectionStats;