import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import entities from "../../apis/entities";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  Button,
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
import SelectTableHead from "./SelectTableComponents/SelectTableHead";
import SelectTableToolBar from "./SelectTableComponents/SelectTableToolBar";
import EntitySummaryDialog from "./EntitySummaryDialog";
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
  selectTableButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "50px",
    marginTop: "50px",
  },
  confirmationSendChangesButton: {
    marginBottom: "50px",
    marginTop: "50px",
  },
  confirmationSaveButton: {
    marginBottom: "50px",
    marginTop: "50px",
    backgroundColor: "green",
    color: "white",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "green",
    },
  },
  confirmationCancelButton: {
    marginBottom: "50px",
    marginTop: "50px",
    marginLeft: "10px",
  },
  summaryReceiptRoot: {
    width: "100%",
  },
  summaryReceiptContainer: {
    maxHeight: 440,
  },
}));

/**
 * @param  props (withRouter)  object of location, state and history
 * @return Select table used in entity summary page (Can delete rows and save changes)
 *
 */
function EntitySelectTable(props) {
  //used for styling entity select table
  const classes = useSelectTableStyles();

  //State to determine whether modal that contains static receipt of all the propsed changes is open or not
  const [openSummaryDialog, setOpenSummaryDialog] = useState(false);

  const handleCloseSummaryDialog = () => {
    setOpenSummaryDialog(false);
  };

  const handleOpenSummaryDialog = () => {
    setOpenSummaryDialog(true);
  };

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

  //used for pre populating row items in select table
  const [rows, setRows] = useState([]);

  /**when you initially mount savedChanges saves initial data on mount 
   * Because in order to save updated changes, since rows and savedChanges format are different,
   * if user deletes a row in rows, we would need to filter through savedChagnes and used savedChanges
   * to make an api request to update our backend.
   * **/
  const [savedChanges, setSavedChanges] = useState({});

  /**A list of objects: { externalCallId, fieldName }. We will use to track which cells have been deleted */
  const [deletedCells, setDeletedCells] = useState([]);

  //used for fetching api on mount
  const [mounted, setMounted] = useState(false);

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

  /** When you press the trash button, it filters out rows that have been selected and the table gets re populated.
   * @param {selected} array contains a list of entry numbers for selected rows
   **/
  const handleDeleteRow = () => {
    let newRows = [];
    let deleteRows = [];

    for (let i = 0; i < rows.length; i++) {
      if (selected.includes(rows[i]["entryNumber"])) {
        let externalCallId = rows[i]["externalCallId"];
        let fieldName = rows[i]["fieldName"];
        deleteRows.push({ externalCallId, fieldName });
        continue;
      }
      newRows.push(rows[i]);
    }

    setDeletedCells(...deletedCells, deleteRows);
    setSelected([]);
    setRows(newRows);
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

  //api request to save changes (WIP will be fully functional with upcoming backend merge request)
  const handleClickSave = async (event) => {
    // let finalChanges = { ...savedChanges };

    // if (deletedCells.length > 0) {
    //   for (let i = 0; i < deletedCells.length; i++) {
    //     let keyId = deletedCells[i].externalCallId;
    //     let fieldName = deletedCells[i].fieldName;

    //     delete finalChanges["savedChanges"][keyId][fieldName];
    //   }
    // }

    // try {
    //   await entities.post(
    //     `discrepancies/${props.location.state.company_id}/report/${props.location.state._id}`,
    //     finalChanges
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
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

  //fetchSavedChanges calls backend api through get protocol to get all the aggregated source system data
  const fetchSavedChanges = async () => {
    if (props.location.state) {
      try {
        let result = await entities.get(
          `discrepancies/${props.location.state.company_id}/report/${props.location.state._id}`
        );

        if (result) {
          setSavedChanges(result.data);

          let proposedChanges = Object.values(result.data.savedChanges);
          let listOfExternallCallIds = Object.keys(result.data.savedChanges);

          let finalRows = [];
          let entryNumber = 0;

          for (let i = 0; i < proposedChanges.length; i++) {
            let externalCallId = listOfExternallCallIds[i];

            /**
             * ex) proposedChanges -> is [{masterId: {currentValue, ExternalSource}}, {mailingState: {currentValue, ExternalSource}}]
             */
            let listOfFieldNames = Object.keys(proposedChanges[i]);

            for (let index = 0; index < listOfFieldNames.length; index++) {
              let fieldName = listOfFieldNames[index];

              let cellValue = proposedChanges[i][fieldName];
              let finalCellValue = { ...cellValue };

              finalCellValue.fieldName = fieldName;
              finalCellValue.entryNumber = entryNumber;
              finalCellValue.externalCallId = externalCallId;

              entryNumber++;
              finalRows.push(finalCellValue);
            }
          }

          setRows(finalRows);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  //calling in saved changes at mount
  useEffect(() => {
    if (!mounted) {
      fetchSavedChanges();
      setMounted(true);
    }
  });

  return (
    <div className={classes.selectTableRoot}>
      <Paper className={classes.selectTablePaper}>
        <SelectTableToolBar
          numSelected={selected.length}
          handleDeleteRow={handleDeleteRow}
          selected={selected}
          rows={rows}
          setRows={setRows}
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
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.entryNumber)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.entryNumber + row.ExternalSource}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
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
                      <TableCell align="left">{row.ExternalValue}</TableCell>
                      <TableCell align="left">{row.CurrentValue}</TableCell>
                      <TableCell align="left">{`${row.SourceOfTruth}`}</TableCell>
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
      <div className={classes.selectTableButtonContainer}>
        <Button
          className={classes.confirmationSendChangesButton}
          variant="contained"
          color="primary"
          onClick={handleOpenSummaryDialog}
        >
          Send Changes
        </Button>
        <Button
          onClick={handleClickSave}
          disableRipple
          className={classes.confirmationSaveButton}
          variant="contained"
        >
          Save
        </Button>
        <Button
          href="/entity"
          className={classes.confirmationCancelButton}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
      </div>
      <EntitySummaryDialog
      classes={classes}
        rows={rows}
        openSummaryDialog={openSummaryDialog}
        handleCloseSummaryDialog={handleCloseSummaryDialog}
      />
    </div>
  );
}

export default withRouter(EntitySelectTable);
