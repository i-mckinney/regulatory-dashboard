import React, { useState } from "react";
import {
  Button,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import entities from "../../apis/entities";
import EntityReceiptTable from "./EntityReceiptTable";

/**
 *
 * @param {object} classes object for styling entity summary page
 * @param {boolean} openSummaryDialog state to determine whether summary dialog is open or not
 * @param {func} handleCloseSummaryDialog set openSummaryDialog to false (closes the dialog)
 * @param {array} rows list of object that contains information about proposed changes in each cell
 * @return {jsx} renders a modal that shows static receipt of all the proposed changes and the ability to send proposed changes to
 * the approver.
 */
function EntitySummaryDialog(props) {
  const { openSummaryDialog, handleCloseSummaryDialog, rows, classes } = props;
  
  //state for selected approver in select field
  const [selectedApprover, setSelectedApprover] = useState("lebronJames");

  const handleSelectApprover = (event) => {
    setSelectedApprover(event.target.value);
  };

  //handle sending an email of static receipt to a selected approver
  const handleSendApproverEmail = async (event) =>{
    //sending email

      let finalChanges = {rows}
 
      try {
        await entities.post(
          `entitysummary/email`,
          finalChanges
        );
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <Dialog
      open={openSummaryDialog}
      onClose={handleCloseSummaryDialog}
      aria-labelledby="form-dialog-title"
      maxWidth={"lg"}
    >
      <DialogTitle id="form-dialog-title">Confirm Proposed Changes</DialogTitle>
      <DialogContent>
        <EntityReceiptTable rows={rows} classes={classes} />
        <DialogContentText style={{ marginTop: "50px" }}>
          Send your proposed changes to the selected approver. Once the approver
          recieves an email, the approver will confirm your changes,
        </DialogContentText>
        <InputLabel
          style={{ marginBottom: "10px", marginTop: "50px" }}
          id="label"
        >
          Approver
        </InputLabel>
        <Select
          labelId="labelApprover"
          id="selectApproverId"
          value={selectedApprover}
          fullWidth
          onChange={handleSelectApprover}
        >
          <MenuItem value="lebronJames">Lebron James</MenuItem>
          <MenuItem value="tylerHerro">Tyler Herro</MenuItem>
          <MenuItem value="anthonyDavis">Anthony Davis</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleSendApproverEmail} color="primary">
            Send
          </Button>
        <Button onClick={handleCloseSummaryDialog} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EntitySummaryDialog;
