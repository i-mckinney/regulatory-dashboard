import React from "react";
import {
  Link,
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
import EntityReceiptTable from "./EntityReceiptTable";

function EntitySummaryDialog(props) {

  const { openSummaryDialog, handleCloseSummaryDialog , rows} = props;

  return (
    <Dialog
      open={openSummaryDialog}
      onClose={handleCloseSummaryDialog}
      aria-labelledby="form-dialog-title"
      maxWidth={"lg"}
    >
      <DialogTitle id="form-dialog-title">
        {" "}
        Confirm Proposed Changes{" "}
      </DialogTitle>
      <DialogContent>
      <EntityReceiptTable rows={rows}/>
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
        <Select labelId="label" id="select" fullWidth>
          <MenuItem value="10">Lebron James</MenuItem>
          <MenuItem value="20">Tyler Herro</MenuItem>
          <MenuItem value="30">Anthony Davis</MenuItem>
          <MenuItem value="40">Mike Tyson</MenuItem>
          <MenuItem value="50">Jimmy Butler</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Link href="/entity">
          <Button onClick={handleCloseSummaryDialog} color="primary">
            Send
          </Button>
        </Link>
        <Button onClick={handleCloseSummaryDialog} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EntitySummaryDialog;
