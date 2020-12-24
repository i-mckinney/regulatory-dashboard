import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import HelixProgressBar from "../utils/HelixProgressBar";
import StepOneReportBasicInfo from "./StepOneReportBasicInfo";
import StepTwoReportEntitySelection from "./StepTwoReportEntitySelection";
import StepThreeReportLoanSelection from "./StepThreeReportLoanSelection";
import ReportNormalizationTableDashboard from "./ReportNormalizationTableDashboard";
import ReportSummary from "./ReportSummary";

const generateReportStyles = makeStyles((theme) => ({
  progressbarContainer: {
    marginTop: theme.spacing(5),
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
function GenerateReport(props) {
  const reportGenerateStyles = generateReportStyles();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { type: "info", label: "Basic Info", status: "Incomplete" },
    { type: "entity", label: "Select Entity", status: "Incomplete" },
    { type: "loan", label: "Select Loan", status: "Incomplete" },
    { type: "table", status: "Incomplete", label: "Normalization Table" },
    { type: "summary", label: "Summary Page", status: "Incomplete" },
  ];

  const [body, setBody] = useState(null);

  useEffect(() => {
    function generateBody() {
      let tempBody = [];

      for (let i = 0; i < steps.length; i++) {

        if (steps[i].type === "info") {
          tempBody.push(
            <StepOneReportBasicInfo
              activeStep={i}
              setActiveStep={setActiveStep}
            />
          );
        }

        if (steps[i].type === "entity") {
          tempBody.push(
            <StepTwoReportEntitySelection
              activeStep={i}
              setActiveStep={setActiveStep}
            />
          );
        }

        if (steps[i].type === "loan") {
          tempBody.push(
            <StepThreeReportLoanSelection activeStep={i} setActiveStep={setActiveStep} />
          );
        }

        if (steps[i].type === "table") {
          tempBody.push(
            <ReportNormalizationTableDashboard
              header={`Test Normalization Table #${i + 1}`}
              activeStep={i}
              setActiveStep={setActiveStep}
            />
          );
        }

        if (steps[i].type === "summary") {
          tempBody.push(
            <ReportSummary activeStep={i} setActiveStep={setActiveStep} />
          );
        }
      }
      setBody(tempBody);
    }

    generateBody();
  }, []);

  return (
    <div>
      <div className={reportGenerateStyles.progressbarContainer}>
        <HelixProgressBar
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>

      {body ? body[activeStep] : null}
    </div>
  );
}

export default withRouter(GenerateReport);
