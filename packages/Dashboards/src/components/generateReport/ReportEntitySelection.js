import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HelixSelectTable from "../HelixSelectTable/HelixSelectTable";
import { TableCell } from "@material-ui/core";
import { EntitySelectionMockData } from "./mockData/EntitySelectionMockData";
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
}));

function ReportEntitySelection(props) {
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
  const rows = EntitySelectionMockData;

  // Helix select table name or a header for the table itself
  const selectTableHeaderName = "Select Entity";

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

  const hanldeReportGenerateNext = () => {
    let nextStep = props.activeStep + 1;
    props.setActiveStep(nextStep);
  };

  const handleCancel = () => {
    props.history.push("/reporttemplates");
  };

  const handleBack = () => {
    let prevStep = props.activeStep - 1;
    props.setActiveStep(prevStep);  };

  return (
    <div>
      <div className={entitySelectionTableStyles.selectTableRoot}>
        <HelixSelectTable
          columnHeaders={columnHeaders}
          setSelected={setSelected}
          selected={selected}
          customRow={customRow}
          rows={rows}
          singleSelection={true}
          selectTableHeaderName={selectTableHeaderName}
        />
        <div className={entitySelectionTableStyles.buttonContainer}>
          <HelixButton
            className={entitySelectionTableStyles.backButton}
            text="Back"
            onClick={handleBack}
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

export default withRouter(ReportEntitySelection);
