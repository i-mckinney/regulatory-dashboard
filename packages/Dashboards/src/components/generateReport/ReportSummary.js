import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, Paper, Button, Typography } from "@material-ui/core";
import HelixTable from "../table/HelixTable";
import HelixTableCell from "../table/HelixTableCell";
import GenericSummaryTable from "./GenericSummaryTable";
import HelixCollapsibleRow from "../utils/HelixCollapsibleRow";
import { HelixButton } from "helixmonorepo-lib";

const reportSummaryStyles = makeStyles((theme) => ({
  summaryReceiptRoot: {
    width: "100%",
  },
  summaryReceiptContainer: {
    maxHeight: 440,
  },
  paperCreation: {
    marginBottom: "2rem",
    marginTop: theme.spacing(5),
  },
  header: {
    paddingBottom: "2rem",
  },
  section: {
    width: "90%",
    margin: "auto",
    padding: "16px",
  },
  backButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    "&:hover": {
      backgroundColor: "#2196f3",
      color: "white",
    },
  },
  confirmButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
      color: "white",
    },
  },
  approveButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: "#4CAF50",
    color: "white",
    "&:hover": {
      backgroundColor: "#357A38",
      color: "white",
    },
  },
  cancelButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: "#F50057",
    color: "white",
    "&:hover": {
      backgroundColor: "#DF0350",
      color: "white",
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(10),
    display: "flex",
    justifyContent: "center",
  },
}));

const summaryRows = [
  {
    fieldID: "H1-1",
    fieldName: "CustomerID",
    previousValue: "12345",
    currentValue: "70989",
  },
];

const columns = [
  {
    Label: "Loan Name",
    Accessor: "loanName",
  },
];

const rows = [
  {
    _id: "1",
    loanName: "Testing #1",
    fieldID: "H1-1",
    fieldName: "Customer ID",
    previousValue: "123456",
    currentValue: "654321",
  },
  {
    _id: "2",
    loanName: "Testing #2",
    fieldID: "H1-1",
    fieldName: "Customer ID",
    previousValue: "354767",
    currentValue: "254665",
  },
  {
    _id: "3",
    loanName: "Testing #3",
    fieldID: "H1-1",
    fieldName: "Customer ID",
    previousValue: "",
    currentValue: "598668",
  },
];

/**
 * @param {array} rows a list of obejcts that contains current changes for a cell
 * @param {object} classes object for styling
 * @return summary table
 */
function ReportSummary(props) {
  const customCollapsibleRowRender = (
    row,
    rowIndex,
    columns,
    customCellRender
  ) => {
    const innerTableHeadColumns = [
      "Field",
      "Field Name",
      "Previous Value",
      "Proposed Value",
    ];
    const innerTableBodyRows = [
      row.fieldID,
      row.fieldName,
      row.previousValue,
      row.currentValue,
    ];
    return (
      <HelixCollapsibleRow
        key={row._id}
        row={row}
        rowIndex={rowIndex}
        columns={columns}
        innerTableHeadColumns={innerTableHeadColumns}
        innerTableBodyRows={innerTableBodyRows}
        customCellRender={customCellRender}
      />
    );
  };

  /**
   * @param {object} row the row is an object of data
   * @param {object} column the column is an object of the header with accessor and label props
   * @param {int} rowIndex the rowIndex represents index of the row
   * @param {int} columnIndex the columnIndex represents index of the column
   * @return {JSX} HelixTableCell of object properties in that Table row
   */
  const customCellRender = (row, column, rowIndex, columnIndex) => {
    const columnAccessor = column.Accessor;
    return (
      <HelixTableCell
        key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}
        value={row[columnAccessor]}
      />
    );
  };

  /**
   * @param {object} column represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customHeadColumnKeyProp = (column) => {
    return column.Accessor;
  };

  /**
   * @param {object} row represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customBodyRowKeyProp = (row) => {
    return row._id;
  };

  // Initially, we can start the table to order by Loan Name or etc in ascending order
  const initialOrderBy = "loanName";

  const reportSummaryClasses = reportSummaryStyles();

  const handleConfirm = () => {
    props.history.push("/myrequest");
  };

  const handleBack = () => {
    let prevStep = props.activeStep - 1;
    props.setActiveStep(prevStep);
  };

  const handleApprove = () => {
    let prevStep = props.activeStep - 1;
    props.setActiveStep(prevStep);
  };

  const handleEdit = () => {
    
  }
  const handleCancel = () => {
    props.history.push("/reporttemplates");
  };
  return (
    <>
      <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
        <div className={reportSummaryClasses.section}>
          <div className={reportSummaryClasses.header}>
            <Button color="primary" variant="contained" onClick={handleEdit} style={{float:"right"}}>
              Edit
            </Button>
            <Typography variant="h4">CCAR Report #7</Typography>
            <div>
              <div variant="h5" style={{ marginTop: "20px", fontSize: "20px" }}>
                Reported Created at: 12/07/2020
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
        <div className={reportSummaryClasses.section}>
          <div className={reportSummaryClasses.header}>
            <Typography variant="h4">Entity #16 Coca Cola Inc</Typography>
            <div
              style={{ marginTop: "20px", fontSize: "20px" }}
              variant="h5"
              display="block"
              gutterBottom
            >
              Entity ID: 384573
            </div>
          </div>
          <GenericSummaryTable
            rows={summaryRows}
            classes={reportSummaryClasses}
          />
        </div>
      </Paper>
      <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
        <div className={reportSummaryClasses.section}>
          <div className={reportSummaryClasses.header}>
            <Typography variant="h4">Selected Loans</Typography>
          </div>
          <HelixTable
            toggleExpandable={true}
            customCollapsibleRowRender={customCollapsibleRowRender}
            initialOrderBy={initialOrderBy}
            columns={columns}
            rows={rows}
            customCellRender={customCellRender}
            customHeadColumnKeyProp={customHeadColumnKeyProp}
            customBodyRowKeyProp={customBodyRowKeyProp}
          />
        </div>
      </Paper>
      <div className={reportSummaryClasses.buttonContainer}>
        <HelixButton
          className={reportSummaryClasses.backButton}
          text="Back"
          onClick={handleBack}
        />
        <HelixButton
          className={reportSummaryClasses.confirmButton}
          text="Confirm"
          onClick={handleConfirm}
        />
        <HelixButton
          className={reportSummaryClasses.approveButton}
          text="Send For Approver"
          disabled
        />
        <HelixButton
          className={reportSummaryClasses.cancelButton}
          onClick={handleCancel}
          text="Cancel"
        />
      </div>
    </>
  );
}

export default withRouter(ReportSummary);
