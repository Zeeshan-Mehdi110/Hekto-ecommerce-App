import React, { useMemo, useState } from 'react';
import { Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, IconButton, Paper, Pagination, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import { loadUsers } from '../../store/store/actions/userActions';
import DeletePopUp from '../common/DeletePopUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';


const columns = [
  { id: 'userName', label: 'Name', },
  { id: 'userEmail', label: 'Email' },
  {
    id: 'phone_number',
    label: 'Phone Number',
    align: 'left',

  },
  {
    id: 'userType',
    label: 'Type',

    align: 'center',
  },
  {
    id: 'userStatus',
    label: 'Status',

    align: 'center',
  },
  {
    id: 'created_on',
    label: 'Created On',

    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    width: 170,
    align: 'right'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flex: 1
  },
  table: {
    height: "100%",
    width: "100%"
  },
  list: {},
  thead: {},
  tbody: {
    width: "100%"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    boxSizing: "border-box",
    minWidth: "100%",
    width: "100%"
  },
  headerRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
  cell: {
    display: "inline-flex",
    alignItems: "center",
    overflow: "hidden",
    flexGrow: 0,
    flexShrink: 0
  },
  justifyCenter: {
    justifyContent: "center"
  },
  expandingCell: {
    flex: 1
  },
  column: {},
  tableContainer: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    '-ms-overflow-style': '-ms-autohiding-scrollbar'
  }
}));


function Users({ users, totalRecords, dispatch }) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadUsers())
  }, [page, rowsPerPage])


  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
    // listRef.current && listRef.current.scrollToItem(0);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    // listRef.current && listRef.current.scrollToItem(0);
  };

  const totalPages = useMemo(() => Math.ceil(totalRecords / rowsPerPage), [users, rowsPerPage]);

  const visibleRows = React.useMemo(() => {
    return users.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    )
  }, [page, rowsPerPage, users]);
  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <TableContainer component={Paper} className={classes.tableContainer} style={{ "maxWidth": "100vw", overFlow: "scroll" }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {
                  columns.map((column, index) => (
                    <TableCell key={index}>{column.label}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row._id} className={classes.headerRow}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>
                    {
                      row.type == process.env.REACT_APP_USER_TYPE_SUPERADMIN ? 
                        <Chip size='small' label="Super Admin" color="error" /> :
                        row.type == process.env.REACT_APP_USER_TYPE_ADMIN ?
                        <Chip size="small" label="Admin" color="success" />:
                        <Chip size='small' label="Standard" color="primary" />
                    }
                  </TableCell>
                  <TableCell>
                    {
                      row.active == process.env.REACT_APP_STATUS_ACTIVE ? 
                      <Chip size='small' label="Active" color="primary" /> :
                      <Chip size='small' label="Disabled" color="error" />
                    }
                  </TableCell>
                  <TableCell>
                    {new Date(row.created_on).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>


                  <TableCell sx={{ display: "flex" }}>
                    <IconButton sx={{ color: "blue" }}>
                      <FontAwesomeIcon icon={faEdit} style={{ fontSize: "1rem" }} />
                    </IconButton>
                    <DeletePopUp />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100, 250, 500]}
              component="div"
              count={totalRecords}
              rowsPerPage={rowsPerPage}
              page={page}
              // page={users.length ? page - 1 : 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              backIconButtonProps={{
                style: { display: "none" }
              }}
              nextIconButtonProps={{
                style: { display: "none" }
              }}

              style={{ height: "45px", overflow: "hidden" }}
            />
            <Box>
              <Pagination count={totalPages} page={page + 1} onChange={handleChangePage} variant="outlined" color="primary" shape="rounded" />
            </Box>
          </Box>
        </TableContainer>
      </Grid>
    </Grid>

  )
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    totalRecords: state.users.totalRecords,
    loadingRecords: state.progressBar.loading
  }
}

export default connect(mapStateToProps)(Users);