import * as React from 'react';
import {Button, TextField} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { confirmPendingOrder, getPendingOrders } from '../../api-helpers';

const columns = [
    { id: 'id', label: 'ID', minWidth: 120 },
    { id: 'name', label: 'Name', minWidth: 120 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 120 },
    { id: 'date', label: 'Date', minWidth: 150},
    { id: 'action', label: 'Action', minWidth: 70}
  ];

function createData(id, name, phone, email) {
  return { id, name, phone, email };
}

export default function OrderList() {
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        const fetchOrders = async () => {
            const res = await getPendingOrders();
            setRows(res?.map((item, index) => createData(item?._id, item?.name, item?.phone, item?.email)))
        }
        fetchOrders()
    }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [dates, setDates] = React.useState(
    rows?.map((item, index) => new Date().toLocaleString())
  );    

  const handleButtonClick = (id, rowIndex) => {
    // console.log(id);
    confirmPendingOrder(id, {date: dates[rowIndex]})
    .then(res => {
      // console.log(res);
      window.location.reload();
    })
  }

  return (
    <Paper sx={{ width: '95vw', margin: '20px', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: 'aliceblue' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                            {index === 0 ? (
                            <a href={`order/${value}`} rel="noopener noreferrer">
                                {value}
                            </a>
                            ) : (
                            column.format && typeof value === 'number' ? (
                                column.format(value)
                            ) : (
                                value
                            ) 
                            )}                            
                            {index === 4 && (
                              <TextField
                                // label="Date"
                                name='date'
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                type="date"
                                value={dates[rowIndex]}
                                onChange={(e) => {
                                  const newDates = [...dates];  // Create a new array to maintain immutability
                                  newDates[rowIndex] = e.target.value;  // Update the value at the specified index
                                  setDates(newDates);  // Update the state
                                }} 
                              />
                            )}
                            {index === 5 && (
                              <Button variant="contained" color="primary" onClick={() => handleButtonClick(row.id, rowIndex)}>
                                Confirm
                              </Button>
                            )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
