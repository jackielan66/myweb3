import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function NftAsset() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>物品</TableCell>
            <TableCell>拥有度</TableCell>
            <TableCell>预设特征</TableCell>
            <TableCell>挂单时间</TableCell>
            <TableCell>成本</TableCell>
            <TableCell>收益</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 示例数据行 1 */}
          <TableRow hover>
            <TableCell>#18115</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>0.00</TableCell>
            <TableCell>0.0</TableCell>
          </TableRow>
          {/* 示例数据行 2 */}
          <TableRow hover>
            <TableCell>#1918</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NftAsset;