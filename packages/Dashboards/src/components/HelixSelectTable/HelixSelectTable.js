import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  FormControlLabel,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Switch,
} from "@material-ui/core";
import HelixSelectTableHead from "./SelectTableComponents/HelixSelectTableHead";
import HelixSelectTableToolBar from "./SelectTableComponents/HelixSelectTableToolBar";
import HelixGreenCheckbox from "./HelixGreenCheckbox";
import { getComparator, stableSort } from "./HelixHelperFunctions";

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

/** 
 * @param {array} selected a list row has been selected in Helix select table
 * @param {func} setSelected updates the state selected above
 * @param {func} customRow function to render rows in Helix select table
 * @param {array} rows Data for rendering rows in Helix select table
 * @param {bool} singleSelection if true -> user can select a single row else user can select multiple rows
 * @param {string} selectTableHeaderName heading name for Helix select table
 * @param {array} columnHeaders determine header of each columns in the Helix select table.
 * @return Helix Select table (selectable rows)
 */

function HelixSelectTable({
  selected = [],
  setSelected,
  customRow,
  rows = [],
  singleSelection = true,
  selectTableHeaderName,
  columnHeaders,
}) {

  //used for styling entity select table
  const classes = useSelectTableStyles();

  //used for setting orders of rows in select table: asc or desc
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fieldName");

  //used for pagination for select table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* Styling Features */

  //toggle between padded or non padded select table.
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  //used for toggling between padded table or non padded table (styling)
  const [dense, setDense] = useState(false);

  /* Handles Clicking / Selecting rows */

  // Selects all rows in the table.
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.entryNumber);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  /** Selects a specific row
   *  @param {number} entryNumber number that represents a row */

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
    if (!singleSelection) {
      setSelected(newSelected);
    } else {
      if (selectedIndex === 0) {
        setSelected([]);
      } else {
        setSelected([entryNumber]);
      }
    }
  };

  /**when sort button is clicked for that column, the table is sorted by that column.
   * @param {string} property string to represent a column ex) fieldName, externalSource
  /*ex) click on sort for field name, table sorts its rows according to field names.*/

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  /* PAGINATION features */

  // Allows user to alternate different pages within the table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Checking if the row exists in selected [].
  const isSelected = (entryNumber) => selected.indexOf(entryNumber) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.selectTableRoot}>
      <Paper className={classes.selectTablePaper}>
        <HelixSelectTableToolBar
          numSelected={selected.length}
          selectTableHeaderName={selectTableHeaderName}
        />
        <TableContainer>
          <Table
            className={classes.selectTable}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <HelixSelectTableHead
              classes={classes}
              onSelectAllClick={handleSelectAllClick}
              order={order}
              orderBy={orderBy}
              numSelected={selected.length}
              rowCount={rows.length}
              onRequestSort={handleRequestSort}
              columnHeaders={columnHeaders}
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
                      key={row.entryNumber + row.ExternalSource}
                      selected={isItemSelected}
                      classes={{
                        root: classes.root,
                        selected: classes.selected,
                      }}
                    >
                      <TableCell padding="checkbox">
                        <HelixGreenCheckbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      {customRow(row, labelId)}
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
    </div>
  );
}

export default HelixSelectTable;
