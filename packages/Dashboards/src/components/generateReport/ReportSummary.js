import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, Paper, Button, Typography,TextField, MenuItem} from "@material-ui/core";
import HelixTable from "../table/HelixTable";
import HelixTableCell from "../table/HelixTableCell";
import GenericSummaryTable from "../report/GenericSummaryTable";
import HelixCollapsibleRow from "../utils/HelixCollapsibleRow";
import { HelixButton, HelixTextField, ConfirmDialogModal } from "helixmonorepo-lib";
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import ClearIcon from '@material-ui/icons/Clear'
import {ApproversMockData} from './mockData/ApproversMockData'

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
  helixInput: {
    marginTop: '16px',
  },
  matButton: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  matIcon: {
    fill: 'black',
    '& button': {
      marginRight: 'unset'
    }
  },
  matIconSpan: {
    display: 'block',
    float: 'right',
  },
  menuItem: {
    justifyContent: 'center',
    minHeight: '1.5rem'
  }
}));

// Mock columns data for summary table
const summaryColumns = [
  {
    id: "fieldID",
    label: "Field",
    minWidth: 170,
    align: "left",
  },

  {
    id: "fieldName",
    label: "Field Name",
    minWidth: 170,
    align: "left",
  },
  {
    id: "previousValue",
    label: "Previous Value",
    minWidth: 170,
    align: "left",
  },
  {
    id: "currentValue",
    label: "Proposed Value",
    minWidth: 170,
    align: "left",
  },
];

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

// Mock row data for expandable table
const rows = [
  {
    _id: "1",
    loanName: "Testing #1",
    data: [
      {
        _id: "R1-1",
        fieldID: "H1-1",
        fieldName: "Customer ID",
        previousValue: "123456",
        currentValue: "654321",
      },
      {
        _id: "R1-2",
        fieldID: "H1-2",
        fieldName: "Member ID",
        previousValue: "123",
        currentValue: "321",
      },
    ],
  },
  {
    _id: "2",
    loanName: "Testing #2",
    data: [
      {
        _id: "R2-1",
        fieldID: "H1-1",
        fieldName: "Customer ID",
        previousValue: "354767",
        currentValue: "254665",
      },
    ],
  },
  {
    _id: "3",
    loanName: "Testing #3",
    data: [
      {
        _id: "R3-1",
        fieldID: "H1-1",
        fieldName: "Customer ID",
        previousValue: "",
        currentValue: "598668",
      },
    ],
  },
];

// Mock innerColumns data for expandable row table
const innerColumns = [
  {
    id: "fieldID",
    label: "Field",
    minWidth: 170,
    align: "left",
  },
  {
    id: "fieldName",
    label: "Field Name",
    minWidth: 170,
    align: "left",
  },
  {
    id: "previousValue",
    label: "Previous Value",
    minWidth: 170,
    align: "left",
  },
  {
    id: "currentValue",
    label: "Proposed Value",
    minWidth: 170,
    align: "left",
  },
];

/**
 * @param {array} rows a list of obejcts that contains current changes for a cell
 * @param {object} classes object for styling
 * @return summary table
 */
function ReportSummary(props) {
  /**
   * @param {object} row the row is an object of data
   * @param {int} rowIndex the rowIndex represents index of the row
   * @param {arry} columns the columns is array of column objects
   * @param {func} customCellRender the customCellRender is func that return jsx of HelixTableCell data
   */

  // Editable report title 
  const [title, setTitle] = useState('CCAR Report #7')
  //  Editable report description
   const [description, setDescription] = useState('Enter report description here')
   // Hides/displays div to update title and description
   const [isDivHidden, setIsDivHidden] = useState(true)
   // Final Description displayed on page
   const [displayedDescription, setDisplayedDescription] = useState(description)
   // Final Title displayed on page
   const [displayedTitle, setDisplayedTitle] = useState(title)
  //state for selected approver in select field
  const [selectedApprover, setSelectedApprover] = useState("");
  // state of confrim dialog popup modal
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subtitle: '', confirmText: 'Send', cancelText: 'Cancel'})

  const approvers = ApproversMockData;
  
  const handleSelectApprover = (event) => {
    setSelectedApprover(event.target.value);
  };

  const customCollapsibleRowRender = (
    row,
    rowIndex,
    columns,
    customCellRender
  ) => {
    const innerTableHeadColumns = innerColumns;
    const innerTableBodyRows = row.data;
    return (
      <HelixCollapsibleRow
        key={row._id}
        row={row}
        rowIndex={rowIndex}
        columns={columns}
        innerTableHeadColumns={innerTableHeadColumns}
        innerTableBodyRows={innerTableBodyRows}
        customCellRender={customCellRender}
        isSummaryTableAllow={true}
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
        isBold={true}
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

  // Creates an object for styling. Any className that matches key in the reportSummaryStyles object will have a corresponding styling
  const reportSummaryClasses = reportSummaryStyles();

  const handleConfirm = () => {
    props.history.push("/myrequest");
  };

  // opens confirmation dialoge when 'Send to Approver' button is clicked
  const handleSend = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: `Send report summary to ${selectedApprover.firstName} ${selectedApprover.lastName}?`,
      subtitle: 'Approver will receive an email with the report.',
      onConfirm: () => setConfirmDialog({...confirmDialog, isOpen: false}),
    })
  }

  const handleBack = () => {
    let prevStep = props.activeStep - 1;
    props.setActiveStep(prevStep);
  };

  const handleApprove = () => {
    let prevStep = props.activeStep - 1;
    props.setActiveStep(prevStep);
  };

  const handleEdit = () => setIsDivHidden(false);

  const handleCancel = () => {
    props.history.push("/reporttemplates");
  };

  // Hides all identifier tags (e.g. button, div, span) when cancel button triggers
  const handleCancelChange = (e) => {
    e.stopPropagation()
    setDescription(displayedDescription)
    setTitle(displayedTitle)
    setIsDivHidden(true)
  }

  // Saves the text input, displays current state edited text input, hide rest of the identifier tags
  const handleSaveChange = (e) => {
    e.stopPropagation()
    setDisplayedTitle(title)
    setDisplayedDescription(description)
    setIsDivHidden(true)
  }

  // Display the customized form for changing title and description with input text box and save/cancel button 
  const displayCustomizedForm = () => {
    if (!isDivHidden) {
      return (
        <div>
            <HelixTextField className={reportSummaryClasses.helixInput} value={title} onChange={(e)=>{setTitle(e.target.value)}} label="Title" fullWidth/>
            <HelixTextField className={reportSummaryClasses.helixInput} value={description} onChange={(e)=>{setDescription(e.target.value)}} label="Description" fullWidth/>
          <span className={reportSummaryClasses.matIconSpan}>
            <IconButton className={reportSummaryClasses.matButton} aria-label="save" type="button" onClick={handleSaveChange}>
              <SaveIcon className={reportSummaryClasses.matIcon} />
            </IconButton>
            <IconButton className={reportSummaryClasses.matButton} aria-label="clear" type="button" onClick={handleCancelChange}>
              <ClearIcon className={reportSummaryClasses.matIcon}/>
            </IconButton>
          </span>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
        <div className={reportSummaryClasses.section}>
          <div className={reportSummaryClasses.header}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleEdit}
              style={{ float: "right" }}
            >
              Edit
            </Button>
            <Typography variant="h5">{displayedTitle}</Typography>
            <Typography variant ="subtitle1">{displayedDescription}</Typography>
            {displayCustomizedForm()}
            <Typography variant="caption" display="block">
              Reported Created at: 12/07/2020
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
        <div className={reportSummaryClasses.section}>
          <div className={reportSummaryClasses.header}>
            <Typography variant="h5">Entity #16</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Entity ID: 384573
            </Typography>
          </div>
          <GenericSummaryTable
            rows={summaryRows}
            columns={summaryColumns}
            classes={reportSummaryClasses}
          />
        </div>
      </Paper>
      <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
        <div className={reportSummaryClasses.section}>
          <div className={reportSummaryClasses.header}>
            <Typography variant="h5">Selected Loans</Typography>
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
      <div style={{ textAlign: "center" }}>
            <TextField
              id="selectApproverId"
              label="Select Approver"
              select
              value= {selectedApprover}
              onChange={handleSelectApprover}
              variant="outlined"
              style={{ width: "50%", marginTop: "50px" }}
              InputLabelProps={{
                shrink: true,
              }}
            > 
             {approvers.map(approver => {
               return(
                  <MenuItem className={reportSummaryClasses.menuItem} value={approver} key={approver.id}> {approver.firstName} {approver.lastName}</MenuItem>         
                )})
              }
            </TextField>
          </div>

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
          text="Send To Approver"
          disabled = {selectedApprover === ""}
          onClick={handleSend}
        />
        <HelixButton
          className={reportSummaryClasses.cancelButton}
          onClick={handleCancel}
          text="Cancel"
        />
        <ConfirmDialogModal confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </div>
    </>
  );
}

export default withRouter(ReportSummary);
