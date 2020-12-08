import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HelixProgressBar from "../utils/HelixProgressBar";
import ReportEntitySelection from "./ReportEntitySelection";
import ReportLoanSelection from "./ReportLoanSelection";
import ReportNormalizationTable from "./ReportNormalizationTable";
import { HelixButton } from "helixmonorepo-lib";

const generateReportStyles = makeStyles((theme) => ({
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
function GenerateReport(props) {
  const reportGenerateStyles = generateReportStyles();
  const steps = ["Entities", "Loan", "Normalization Table", "Summary"];
  const [activeStep, setActiveStep] = useState(0);

  let body;
  switch (activeStep) {
    case 0:
      body = (
        <ReportEntitySelection
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      );
      break;
    case 1:
      body = (
        <ReportLoanSelection
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      );
      break;
    case 2:
      body = (
        <ReportNormalizationTable
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      );
      break;
    default:
      return;
  }
  return (
    <div>
      <div>
        <HelixProgressBar
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>

      {body}
      {/* <div className={reportGenerateStyles.buttonContainer}>
          <HelixButton
            className={reportGenerateStyles.backButton}
            text="Back"
            disabled
          />
          <HelixButton
            disabled={selected.length > 0? false : true}
            className={reportGenerateStyles.nextButton}
            text="Next"
            onClick={hanldeReportGenerateNext}
          />
          <HelixButton
            className={reportGenerateStyles.cancelButton}
            onClick={handleCancel}
            text="Cancel"
          /> 
         
        </div>*/}
    </div>
  );
}

export default withRouter(GenerateReport);
