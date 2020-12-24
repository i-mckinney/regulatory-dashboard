import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HelixSelectTable from "../HelixSelectTable/HelixSelectTable";
import { TableCell } from "@material-ui/core";
import { BACKEND_ENTITIES_HOST } from "../../config";
import entities from "../apis/entities";
import { HelixButton } from "helixmonorepo-lib";
import axios from "axios";

const selectLoanStyles = makeStyles((theme) => ({
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

//Loan selection table for creating a loan in the loan dashboard (shows a list of loans asscoiated with the entity chosen previous step)
function LoanCreateSelectEntity(props) {
  const loanSelectionTableStyles = selectLoanStyles();

  //columnHeaders determine header of each columns in the Helix select table.
  const columnHeaders = [
    {
      id: "LoanId",
      disablePadding: true,
      label: "Loan Id",
    },
    { id: "PrimaryBorrowerName", disablePadding: false, label: "Primary Borrower Name Name" },
    { id: "LoanType", disablePadding: false, label: "Loan Type" },
    {
      id: "CommitmentAmount",
      disablePadding: false,
      label: "Commitment Amount",
    },
    { id: "MaturityDate", disablePadding: false, label: "Maturity Date" },
  ];

  //specifies which row has been selected in Helix select table
  const [selected, setSelected] = useState([]);

  const [entityId, setEntityId] = useState("");

  // Data for rendering rows in Helix select table
  const [rows, setRows] = useState([]);

  // Helix select table name or a header for the table itself
  const selectTableHeaderName = "Select Loan";

  //function to render rows in Helix select table
  const customRow = (row, labelId) => {
    return (
      <>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.loanID}
        </TableCell>
        <TableCell align="left">{row.primaryBorrowerName}</TableCell>
        <TableCell align="left">{row.loanType}</TableCell>
        <TableCell align="left">{row.commitmentAmount}</TableCell>
        <TableCell align="left">{row.maturityDate}</TableCell>
      </>
    );
  };

  useEffect(() => {
    /**
     * fetchEntities calls backend api through get protocol to get all the loans asscoiated with a selected entity
     */
    const fetchEntities = async () => {
      if (
        !props.history.location.state ||
        !props.history.location.state.selectedEntityId
      ) {
        props.history.push(`/loan/new/selectentity`);
      } else {
        let selectedEntityId = props.history.location.state.selectedEntityId;

        setEntityId(selectedEntityId);

        const response = await entities.get(
          `/loans/5f7e1bb2ab26a664b6e950c8/entity/${selectedEntityId}`
        );

        if (response) {
          let rowsArray = response.data;

          let responseRows = [];

          for (let i = 0; i < rowsArray.length; i++) {
            let row = rowsArray[i];
            responseRows.push({ ...row, entryNumber: i });
          }

          setRows(responseRows);
        }
      }
    };

    fetchEntities();
  }, []);

  const handleAddLoan = async (event) => {
    event.preventDefault();

    let row = rows[selected];

    let loanId = row.loanId;
    let reqBody = {
      loanId: loanId,
      onDashboard: true,
    };

    let response = await axios.patch(
      `${BACKEND_ENTITIES_HOST}/loans/5f7e1bb2ab26a664b6e950c8`,
      reqBody
    );

    if (response) {
      props.history.push("/loan");
    }
  };

  const handleCancel = () => {
    props.history.push("/loan");
  };

  const handleBack = () => {
    props.history.push("/loan/new/selectentity");
  };

  return (
    <div>
      <div className={loanSelectionTableStyles.selectTableRoot}>
        <HelixSelectTable
          columnHeaders={columnHeaders}
          setSelected={setSelected}
          selected={selected}
          customRow={customRow}
          rows={rows}
          singleSelection={true}
          selectTableHeaderName={selectTableHeaderName}
        />
        <div className={loanSelectionTableStyles.buttonContainer}>
          <HelixButton
            className={loanSelectionTableStyles.backButton}
            text="Back"
            onClick={handleBack}
          />
          <HelixButton
            disabled={selected.length > 0 ? false : true}
            className={loanSelectionTableStyles.nextButton}
            text="Confirm"
            onClick={handleAddLoan}
          />
          <HelixButton
            className={loanSelectionTableStyles.cancelButton}
            onClick={handleCancel}
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoanCreateSelectEntity);
