import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HelixSelectTable from "../HelixSelectTable/HelixSelectTable";
import { TableCell } from "@material-ui/core";
import { BACKEND_ENTITIES_HOST } from "../../config";
import entities from "../apis/entities";
import { HelixButton } from "helixmonorepo-lib";
import axios from "axios";

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

function StepTwoReportEntitySelection(props) {
  const entitySelectionTableStyles = selectEntityStyles();

  let { reportId } = useParams();

  //columnHeaders determine header of each columns in the Helix select table.
  const columnHeaders = [
    {
      id: "RelationshipName",
      disablePadding: true,
      label: "Relationship Name",
    },
    { id: "BorrowerName", disablePadding: false, label: "Borrower Name" },
    { id: "BorrowerID", disablePadding: false, label: "Borrower ID" },
    { id: "EntityCreated", disablePadding: false, label: "Entity Created" },
    { id: "EntityUpdated", disablePadding: false, label: "Entity Updated" },
  ];

  //specifies which row has been selected in Helix select table
  const [selected, setSelected] = useState([]);

  // Data for rendering rows in Helix select table
  const [rows, setRows] = useState([]);

  // Helix select table name or a header for the table itself
  const selectTableHeaderName = "Select Entity";

  //function to render rows in Helix select table
  const customRow = (row, labelId) => {
    return (
      <>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.relationshipName}
        </TableCell>
        <TableCell align="left">{row.borrowerName}</TableCell>
        <TableCell align="left">{row.borrowerID}</TableCell>
        <TableCell align="left">{row.entityCreated}</TableCell>
        <TableCell align="left">{row.entityUpdated}</TableCell>
      </>
    );
  };

  useEffect(() => {
    /**
     * fetchEntities calls backend api through get protocol to get all the entities
     */
    const fetchEntities = async () => {
      const response = await entities.get("/5f7e1bb2ab26a664b6e950c8/entities");

      if (response) {
        let rowsArray = response.data;

        let responseRows = [];

        for (let i = 0; i < rowsArray.length; i++) {
          let {
            relationshipName,
            borrowerName,
            borrowerID,
            _id,
            createdAt,
            updatedAt,
          } = rowsArray[i];

          let row = {
            relationshipName,
            borrowerName,
            borrowerID,
            entityId: _id,
            entityCreated: createdAt,
            entityUpdated: updatedAt,
            entryNumber: i,
          };

          responseRows.push(row);
        }

        setRows(responseRows);
      }
    };

    fetchEntities();
  }, []);

  const hanldeReportGenerateNext = async (event) => {
    event.preventDefault();

      let nextStep = props.activeStep + 1;

      let selectedBorrowerId = rows[selected].borrowerID
      let selectedEntityId = rows[selected].entityId

      let reqBody = {selectedBorrowerId, selectedEntityId, selectionType:"Entity"}

      let res = await axios.patch(
        `${BACKEND_ENTITIES_HOST}/report/${reportId}/selection`,
        reqBody
      );

      if (res.data.status === 200) {
        props.setActiveStep(nextStep);
      }

  }

  const handleCancel = () => {
    props.history.push("/reporttemplates");
  };

  const handleBack = () => {
    let prevStep = props.activeStep - 1;
    props.setActiveStep(prevStep);
  };

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
            disabled={selected.length > 0 ? false : true}
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

export default withRouter(StepTwoReportEntitySelection);
