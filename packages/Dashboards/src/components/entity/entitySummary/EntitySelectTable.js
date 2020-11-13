import React, {useState} from 'react';
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types';
import clsx from 'clsx';
import entities from '../../apis/entities'
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  withStyles,
  Table,
  Link,
  Button,
  TableContainer,
  FormControlLabel,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Switch,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import SelectTableHead from './SelectTableComponents/SelectTableHead'
import SelectTableToolBar from './SelectTableComponents/SelectTableToolBar'

function createData(externalSource, fieldName, externalValue, proposedValue, entryNumber) {
  return { externalSource, fieldName, externalValue, proposedValue, entryNumber };
}

const rows = [
  createData('FIS','Cupcake', 3.7, 67, 0),
  createData('FIS','Cupcake', 25.0, 51, 1),
  createData('FIS','Eclair', 16.0, 24, 2),
  createData('FIS','Frozen yoghurt', 6.0, 24, 3),
  createData('SalesForce','Gingerbread', 16.0, 49, 4),
  createData('SalesForce','Honeycomb', 3.2, 87, 5),
  createData('SalesForce','Ice cream sandwich', 9.0, 37, 6),
  createData('SalesForce','Jelly Bean', 0.0, 94, 7),
  createData("DataWareHouse",'KitKat', 26.0, 65, 8),
  createData("DataWareHouse",'Lollipop', 0.2, 98, 9),
  createData("DataWareHouse",'Marshmallow', 0, 81, 10),
];

function descendingComparator(self, other, orderBy) {

  if (other[orderBy] < self[orderBy]) {
    return -1;
  }
  if (other[orderBy] > self[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (self, other) => descendingComparator(self,other, orderBy)
    : (self, other) => -descendingComparator(self,other, orderBy);
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((elem, index) => [elem, index])
  console.log(stabilizedThis)
  stabilizedThis.sort((self, other) => {
    const order = comparator(self[0], other[0])
    return order
  })
  return stabilizedThis.map((elem) => elem[0])
}

const useSelectTableStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "50px",
    marginTop: "50px",
  },
  confirmationSaveButton: {
    marginBottom: "50px",
    marginTop: "50px",
  },
  confirmationCancelButton: {
    marginBottom: "50px",
    marginTop: "50px",
    marginLeft: "10px",
  },
}));

function EntitySelectTable(props) {
  console.log(props)
  const classes = useSelectTableStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fieldName');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.entryNumber);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, entryNumber) => {
    const selectedIndex = selected.indexOf(entryNumber);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, entryNumber);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (entryNumber) => selected.indexOf(entryNumber) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    // fetchAggregatedSourceSystemsData calls backend api through get protocol to get all the aggregated source system data
    const fetchSavedChanges = async () => {
      if (props.location.state) {
        console.log(props.location)
        let result = await entities.get(`discrepancies/${props.location.state.company_id}/report/${props.location.state._id}`)
        console.log(result, "RESULT YOOO")
        // const response = await entities.get(`discrepancies/${props.location.state.company_id}/${props.location.state.borrowerID}/report/${props.location.state._id}`)
        // setData(response.data)
      } else {
        // setError({ err: true, message: "Borrower ID is empty" })
        // setData({ ErrorMessage: error.message})
      }
    }

    fetchSavedChanges()
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <SelectTableToolBar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <SelectTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.entryNumber);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.entryNumber)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.entryNumber + row.externalSource }
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.externalSource}
                      </TableCell>
                      <TableCell align="left">{row.fieldName}</TableCell>
                      <TableCell align="left">{row.externalValue}</TableCell>
                      <TableCell align="left">{row.proposedValue}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
        <div className={classes.buttonContainer}>
          <Button
            // onClick={handleClickOpen}
            className={classes.confirmationSaveButton}
            variant="contained"
            color="primary"
          >
            Send Changes
          </Button>
          <Dialog
            // open={open}
            // onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth={"lg"}
          >
            <DialogTitle id="form-dialog-title">
              {" "}
              Confirm Proposed Changes{" "}
            </DialogTitle>
            <DialogContent>
              {/* <StickyHeadTable /> */}
              <DialogContentText style={{ marginTop: "50px" }}>
                Send your proposed changes to the selected approver. Once the
                approver recieves an email, the approver will confirm your
                changes,
              </DialogContentText>
              <InputLabel
                style={{ marginBottom: "10px", marginTop: "50px" }}
                id="label"
              >
                Approver
              </InputLabel>
              <Select labelId="label" id="select" fullWidth>
                <MenuItem value="10">Lebron James</MenuItem>
                <MenuItem value="20">Tyler Herro</MenuItem>
                <MenuItem value="30">Anthony Davis</MenuItem>
                <MenuItem value="40">Mike Tyson</MenuItem>
                <MenuItem value="50">Jimmy Butler</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Link href="/entity">
                <Button color="primary">
                  Send
                </Button>
              </Link>
              <Button color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Link href="/entity">
            <Button
              className={classes.confirmationCancelButton}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Link>
        </div>
    </div>
  );
}
export default withRouter(EntitySelectTable)