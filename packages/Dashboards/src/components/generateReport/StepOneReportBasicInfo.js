import React, { useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  MenuItem,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { HelixButton } from "helixmonorepo-lib";
import axios from "axios";
import { BACKEND_ENTITIES_HOST } from "../../config";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const reportBasicInfoStyles = makeStyles((theme) => ({
  errorAlert: {
    marginTop: "40px",
    marginBottom: "40px",
  },
  basicInfoContainer: {
    marginTop: theme.spacing(2),
    paddingBottom: "100px",
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

function StepOneReportBasicInfo(props) {
  const classesReportBasicInfo = reportBasicInfoStyles();
  let { reportId } = useParams();

  // alert for errors
  const [alertOpen, setAlertOpen] = useState(false);

  //state for selected approver in select field && form fields
  const [selectedApprover, setSelectedApprover] = useState("lebronJames");
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  
  // used for form field validation
  const [emptyField, setEmptyField] = useState({
    reportDescriptionField: false,
    reportTitleField: false,
  });

  const handleSelectApprover = (event) => {
    setSelectedApprover(event.target.value);
  };

  const handleCancel = () => {
    props.history.push("/reporttemplates");
  };

  const handleNext = async (event) => {
    event.preventDefault();

    setEmptyField({
      reportDescriptionField: !(reportDescription.length > 0),
      reportTitleField: !(reportTitle.length > 0),
    });

    if (reportDescription.length > 0 && reportTitle.length > 0) {
      try {
        let nextStep = props.activeStep + 1;

        let reqBody = { reportDescription, reportTitle, selectedApprover };
        let res = await axios.patch(
          `${BACKEND_ENTITIES_HOST}/report/${reportId}/basicinfo`,
          reqBody
        );

        if (res.data){
          setTimeout(props.setActiveStep(nextStep) , 1000)
        }
        
      } catch (error) {
        setAlertOpen(true);
      }
    }
  };

  return (
    <div>
      <Paper
        className={classesReportBasicInfo.basicInfoContainer}
        elevation={2}
      >
        <Collapse in={alertOpen}>
          <Alert
            severity="error"
            className={classesReportBasicInfo.errorAlert}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Error in updating report information
          </Alert>
        </Collapse>
        <form className={classesReportBasicInfo.formContainer}>
          <h1>Basic Report Information</h1>
          <TextField
            label="Report Title"
            margin="normal"
            variant="outlined"
            onChange={(e) => setReportTitle(e.target.value)}
            placeholder="Insert Report Title"
            style={{ width: "700px", marginTop: "30px" }}
            InputLabelProps={{
              shrink: true,
            }}
            error={emptyField.reportTitleField ? true : false}
            helperText={
              emptyField.reportTitleField ? "Report Title is required" : null
            }
          />
          <div>
            <TextField
              label="Report Desciption"
              margin="normal"
              variant="outlined"
              multiline={true}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Insert Report Description"
              style={{ width: "70%", marginTop: "50px" }}
              InputLabelProps={{
                shrink: true,
              }}
              error={emptyField.reportDescriptionField ? true : false}
              helperText={
                emptyField.reportDescriptionField
                  ? "Report Description is required"
                  : null
              }
            />
          </div>
          <div>
            <TextField
              id="selectApproverId"
              label="Select Approver"
              select
              value={selectedApprover}
              onChange={handleSelectApprover}
              variant="outlined"
              style={{ width: "70%", marginTop: "50px" }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value="lebronJames">Lebron James</MenuItem>
              <MenuItem value="tylerHerro">Tyler Herro</MenuItem>
              <MenuItem value="anthonyDavis">Anthony Davis</MenuItem>
            </TextField>
          </div>
        </form>
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
          onClick={handleNext}
          type="submit"
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

export default withRouter(StepOneReportBasicInfo);
