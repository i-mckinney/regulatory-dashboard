import React, { useEffect, useState } from "react";
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
  Collapse,
  IconButton
} from "@material-ui/core";
import { Alert} from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router-dom";
import entities from "../../apis/entities";
import EntityReceiptTable from "./EntityReceiptTable";

/**
 *
 * @param {object} classes object for styling entity summary page
 * @param {boolean} openSummaryDialog state to determine whether summary dialog is open or not
 * @param {func} handleCloseSummaryDialog set openSummaryDialog to false (closes the dialog)
 * @param {array} rows list of object that contains information about proposed changes in each cell
 * @param {func} handleClickSave when user sends changes for an approval, it also saves the reflected changes in backend
 * @return {jsx} renders a modal that shows static receipt of all the proposed changes and the ability to send proposed changes to
 * the approver.
 */
function EntitySummaryDialog(props) {
  const {
    openSummaryDialog,
    handleCloseSummaryDialog,
    rows,
    classes,
    savedChanges,
    handleClickSave,
  } = props;

  //state for opening alert when message is successfully sent
  const [openEmailSuccessMessage, setOpenEmailSuccessMessage] = useState(false);

  //state for selected approver in select field
  const [selectedApprover, setSelectedApprover] = useState("lebronJames");

  const handleSelectApprover = (event) => {
    setSelectedApprover(event.target.value);
  };

  //handle sending an email of static receipt to a selected approver
  const handleSendApproverEmail = async (event) => {
    //sending email
    let entityId;

    if (savedChanges) {
      entityId = savedChanges.entity_id;
      //Saving changes to the helix backend
      handleClickSave("summaryDialog");
    }

    let changesForApproval = { finalChanges: rows, entityId };
    try {
      let result = await entities.post(
        `entitysummary/email`,
        changesForApproval
      );
      if (result) {
        setOpenEmailSuccessMessage(true)
      }
    } catch (error) {
      return { error: error.message };
    }
  };


  return (
    <Dialog
      open={openSummaryDialog}
      onClose={handleCloseSummaryDialog}
      aria-labelledby="form-dialog-title"
      maxWidth={"lg"}
    >
        <Collapse in={openEmailSuccessMessage} className={classes.successAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenEmailSuccessMessage(false);
                window.location.reload()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Email has been sent successfully to the selected approver.
        </Alert>
      </Collapse>
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
        <Button
          onClick={handleSendApproverEmail}
          color="primary"
        >
          Send
        </Button>
        <Button onClick={handleCloseSummaryDialog} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withRouter(EntitySummaryDialog);
