import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HelixSelectTable from "../HelixSelectTable/HelixSelectTable";
import { TableCell, Button } from "@material-ui/core";
import { LoanSelectionMockData } from "./mockData/LoanSelectionMockData";
import HelixProgressBar from "../utils/HelixProgressBar";
import { HelixButton } from "helixmonorepo-lib";

const selectEntityStyles = makeStyles((theme) => ({
  selectTableRoot: {
    marginTop: theme.spacing(4),
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    "&:hover": {
      backgroundColor: "#2196f3",
      color: "white",
    },
  },

  nextButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
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
  // selectTablePaper: {
  //   width: "100%",
  //   marginBottom: theme.spacing(2),
  // },
  // selectTable: {
  //   minWidth: 750,
  // },
  // visuallyHidden: {
  //   border: 0,
  //   clip: "rect(0 0 0 0)",
  //   height: 1,
  //   margin: -1,
  //   overflow: "hidden",
  //   padding: 0,
  //   position: "absolute",
  //   top: 20,
  //   width: 1,
  // },
  // root: {
  //   "&$selected": {
  //     backgroundColor: "#d9eeda",
  //     "&:hover": {
  //       backgroundColor: "#d9eeda",
  //     },
  //   },
  // },
  // selected: {},
}));

function ReportLoanSelection(props) {
  const entitySelectionTableStyles = selectEntityStyles();

  //columnHeaders determine header of each columns in the Helix select table.
  const columnHeaders = [
    {
      id: "RelationshipName",
      disablePadding: true,
      label: "Relationship Name",
    },
    { id: "BorrowerName", disablePadding: false, label: "Borrower Name" },
    { id: "BorrowerID", disablePadding: false, label: "Borrower ID" },
    { id: "EntityCreated", disablePadding: false, label: "Entity Updated" },
    { id: "EntityUpdated", disablePadding: false, label: "Entity Updated" },
  ];

  //specifies which row has been selected in Helix select table
  const [selected, setSelected] = useState([]);

  // Data for rendering rows in Helix select table
  const rows = LoanSelectionMockData;

  // Helix select table name or a header for the table itself
  const selectTableHeaderName = "Select Loans";

  //function to render rows in Helix select table
  const customRow = (row, labelId) => {
    return (
      <>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.RelationshipName}
        </TableCell>
        <TableCell align="left">{row.BorrowerName}</TableCell>
        <TableCell align="left">{row.BorrowerID}</TableCell>
        <TableCell align="left">{row.EntityCreated}</TableCell>
        <TableCell align="left">{row.EntityUpdated}</TableCell>
      </>
    );
  };
  // const [activeStep, setActiveStep] = useState(1);

  const hanldeReportGenerateNext = () => {
    let nextStep = props.activeStep + 1;
    props.setActiveStep(nextStep);
  };

  const hanldeReportGenerateBack = () => {
    let nextStep = props.activeStep - 1;
    props.setActiveStep(nextStep);
    // props.history.push("/report/generate/entityselection/step1");
  };

  const handleCancel = () => {
    props.history.push("/reporttemplates");
  };

  const steps = ["Entities", "Loan", "Normalization Table", "Summary"];
  return (
    <div>
      {/* <HelixProgressBar steps={steps} activeStep={activeStep} /> */}
      <div className={entitySelectionTableStyles.selectTableRoot}>
        <HelixSelectTable
          columnHeaders={columnHeaders}
          setSelected={setSelected}
          selected={selected}
          customRow={customRow}
          rows={rows}
          singleSelection={false}
          selectTableHeaderName={selectTableHeaderName}
        />
        <div className={entitySelectionTableStyles.buttonContainer}>
          <HelixButton
            className={entitySelectionTableStyles.backButton}
            text="Back"
            onClick={hanldeReportGenerateBack}
          />
          <HelixButton
            disabled={selected.length > 0? false : true}
            className={entitySelectionTableStyles.nextButton}
            text="Next"
            onClick={hanldeReportGenerateNext}
          />
          <HelixButton
            className={entitySelectionTableStyles.cancelButton}
            onClick={handleCancel}
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(ReportLoanSelection);
