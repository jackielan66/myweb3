import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from "@mui/material";
import { styled } from "@mui/system";

// 自定义样式
const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#292929",
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: "white",
}));

interface Column {
  field: string;
  label: string;
  render?: (item: any,index:number) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

const DataTable:React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <CustomTableCell key={index}>{col.label}</CustomTableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((col, colIndex) => (
                  <CustomTableCell key={colIndex}>
                    {col.render ? col.render(item,index) : item[col.field]}
                  </CustomTableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ color: "gray" }}>
                暂时没有数据。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
