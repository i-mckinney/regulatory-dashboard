import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Paper, MenuItem } from "@material-ui/core";
import { HelixButton } from "helixmonorepo-lib";

const reportBasicInfoStyles = makeStyles((theme) => ({
  basicInfoContainer: {
    marginTop: theme.spacing(2),
    height: "600px",
  },
  formContainer: {
    paddingTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
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

function ReportBasicInfo(props) {
  const classesReportBasicInfo = reportBasicInfoStyles();

  //state for selected approver in select field
  const [selectedApprover, setSelectedApprover] = useState("");

  const handleSelectApprover = (event) => {
    setSelectedApprover(event.target.value);
  };

  const hanldeReportGenerateNext = () => {
    let nextStep = props.activeStep + 1;
    props.setActiveStep(nextStep);
  };

  const handleCancel = () => {
    props.history.push("/reporttemplates");
  };

  return (
    <div>
      <Paper
        className={classesReportBasicInfo.basicInfoContainer}
        elevation={2}
      >
        <div className={classesReportBasicInfo.formContainer}>
          <h1>Basic Report Information</h1>
          <TextField
            label="Report Title"
            margin="normal"
            variant="outlined"
            placeholder="Insert Report Title"
            style={{ width: "700px", marginTop: "30px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />{" "}
          <div>
            <TextField
              label="Report Desciption"
              margin="normal"
              variant="outlined"
              multiline={true}
              placeholder="Insert Report Description"
              style={{ width: "1500px", marginTop: "50px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />{" "}
          </div>
          <div>
            <TextField
              id="selectApproverId"
              label="Select Approver"
              select
              value={selectedApprover}
              onChange={handleSelectApprover}
              variant="outlined"
              style={{ width: "1500px", marginTop: "50px" }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="lebronJames">Lebron James</MenuItem>
              <MenuItem value="tylerHerro">Tyler Herro</MenuItem>
              <MenuItem value="anthonyDavis">Anthony Davis</MenuItem>
            </TextField>
          </div>
        </div>
      </Paper>
      <div className={classesReportBasicInfo.buttonContainer}>
        <HelixButton
          className={classesReportBasicInfo.backButton}
          text="Back"
          disabled
        />
        <HelixButton
          className={classesReportBasicInfo.nextButton}
          text="Next"
          onClick={hanldeReportGenerateNext}
        />
        <HelixButton
          className={classesReportBasicInfo.cancelButton}
          onClick={handleCancel}
          
          text="Cancel"
        />
      </div>
    </div>
  );
}

export default withRouter(ReportBasicInfo);
