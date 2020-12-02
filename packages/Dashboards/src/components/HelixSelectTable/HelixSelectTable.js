import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import entities from "../apis/entities";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  FormControlLabel,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Switch,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import SelectTableHead from "./SelectTableComponents/SelectTableHead";
import SelectTableToolBar from "./SelectTableComponents/SelectTableToolBar";
import { getComparator, stableSort } from "./HelperFunctions";

const useSelectTableStyles = makeStyles((theme) => ({
  selectTableRoot: {
    width: "100%",
  },
  selectTablePaper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  selectTable: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  root: {
    "&$selected": {
      backgroundColor: "#d9eeda",
      "&:hover": {
        backgroundColor: "#d9eeda",
      },
    },
  },
  selected: {},
}));

const rows = [
  {
    CurrentValue: "Sawayn - Hermiston",
    ExternalValue: "portals.mpe (DataError)",
    ExternalSource: "DataWarehouse",
    SourceOfTruth: false,
    fieldName: "relationshipName",
    externalCallId: "5f9759577eb265114467433e",
    entryNumber: 0,
  },
  {
    CurrentValue: "23",
    ExternalValue: "rustic.wav (DataError)",
    ExternalSource: "DataWarehouse",
    SourceOfTruth: false,
    fieldName: "masterId",
    entryNumber: 1,
    externalCallId: "5f9759577eb265114467433e",
  },
  {
    CurrentValue: "f7aa46e6-c287-47ed-8ebe-aa9f8baffedf",
    ExternalValue: "f7aa46e6-c287-47ed-8ebe-aa9f8baffedf",
    ExternalSource: "DataWarehouse",
    SourceOfTruth: true,
    fieldName: "BorrowerId",
    entryNumber: 2,
    externalCallId: "5f9759577eb265114467433e",
  },
  {
    CurrentValue: "645-289-7059 x9085",
    ExternalValue: "plastic_wooden_steel.gif (DataError)",
    ExternalSource: "DataWarehouse",
    SourceOfTruth: false,
    fieldName: "PhoneNumberThree",
    entryNumber: 3,
    externalCallId: "5f9759577eb265114467433e",
  },
  {
    CurrentValue: "Donny89@hotmail.com",
    ExternalValue: "borders_virginia.gif (DataError)",
    ExternalSource: "DataWarehouse",
    SourceOfTruth: false,
    fieldName: "EmailThree",
    entryNumber: 4,
    externalCallId: "5f9759577eb265114467433e",
  },
];

/**
 * @return Select table used in entity summary page (Can delete rows and save changes)
 *
 */
function HelixSelectTable(props) {
  //used for styling entity select table
  const classes = useSelectTableStyles();

  //used for setting orders of rows in select table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fieldName");

  //used for displaying error when error occurs
  const [errorMessage, setErrorMessage] = useState(null);

  //specifies which items have been clicked in a select table
  const [selected, setSelected] = useState([]);

  //used for pagination for select table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //used for toggling between padded table or non padded table (styling)
  const [dense, setDense] = useState(false);

  /**when sort button is clicked for that column, the table is sorted by that column.
   * @param {string} property string to represent a column ex) fieldName, externalSource
  /*ex) click on sort for field name, table sorts its rows according to field names.*/
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //selects all rows in the table.
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.entryNumber);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  /**
   * selects a specific row
   * @param {number} entryNumber number that represents a row
   * */
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
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  console.log(selected);

  /***PAGINATION features
   * allows user to alternate different pages within the table
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /***Styling features
   * toggle between padded or non padded select table.
   */
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  //Checking if the row exists in selected [].
  const isSelected = (entryNumber) => selected.indexOf(entryNumber) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const GreenCheckbox = withStyles({
    root: {
      color: "default",
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  return (
    <div className={classes.selectTableRoot}>
      <Paper className={classes.selectTablePaper}>
        <SelectTableToolBar
          numSelected={selected.length}
          selected={selected}
          rows={rows}
        />
        <TableContainer>
          <Table
            className={classes.selectTable}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
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
                  let ExternalValue = row.ExternalValue;
                  if (ExternalValue == undefined) {
                    ExternalValue = "No Returned Value";
                  }
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.entryNumber)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.entryNumber + row.ExternalSource}
                      selected={isItemSelected}
                      classes={{
                        root: classes.root,
                        selected: classes.selected,
                      }}
                    >
                      <TableCell padding="checkbox">
                        <GreenCheckbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.ExternalSource}
                      </TableCell>
                      <TableCell align="left">{row.fieldName}</TableCell>
                      <TableCell align="left">{ExternalValue}</TableCell>
                      <TableCell align="left">{row.CurrentValue}</TableCell>
                      <TableCell
                        align="left"
                        style={
                          row.SourceOfTruth
                            ? { color: "#2776D2" }
                            : { color: "#F50057" }
                        }
                      >
                        <b>{`${row.SourceOfTruth}`}</b>
                      </TableCell>
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

      <div>{errorMessage ? errorMessage : null}</div>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default HelixSelectTable;

    // console.log(selected)
    // console.log(selected.indexOf(entryNumber))
    // if(selected.indexOf(entryNumber) !== -1){
    //   console.log("yp")
    //   setSelected([])
    //   return
    // }

    // setSelected([entryNumber])