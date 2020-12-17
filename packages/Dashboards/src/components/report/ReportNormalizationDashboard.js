import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import ReportNormalizationTable from "./ReportNormalizationTable";
import { HelixButton } from "helixmonorepo-lib";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import HelixVerticalTab from "../utils/HelixVerticalTab";
import HelixTabPanel from "../utils/HelixTabPanel"

const useStyles = makeStyles((theme) => ({
  tableAndTabsContainer: {
    flexGrow: 1,
    display: "flex",
    height: "60vh",
    marginTop: "50px",
    backgroundColor: "rgb(250,250,250)",
  },
  singleTab: {
    display: "flex",
  },
  singleTabIcon: {
    flexGrow: "2",
  },
  leftTabsStyle: {
    position: "sticky",
    top: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanelContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#42a5f5",
    marginLeft: theme.spacing(1),
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
  saveButton: {
    backgroundColor: "#238000",
    color: "white",
    "&:hover": {
      backgroundColor: "#1c6600",
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

function ReportNormalizationTableDashboard({
  activeStep,
  setActiveStep,
  history,
}) {
  const normalizationTableClasses = useStyles();
  const [value, setValue] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    let nextTab = value + 1;

    let newCompletedSteps = completedSteps;
    newCompletedSteps.push(value);
    setCompletedSteps(newCompletedSteps);

    setValue(nextTab);
  };

  const handleBack = () => {
    let prevTab = value - 1;
    setValue(prevTab);
  };
  const handleCancel = () => {
    history.push("/reporttemplates");
  };

  const handleFinal = () => {
    let next = activeStep +1
    setActiveStep(next);
  };

  const listOfNormalizationReportTabs = ["Entity Table #1", "Loans Table #1", "Loans Table #2"]
  
  const listOfNormalizationPanelReports = ["Entitiy #1 Normalization Table", "Loan #1 Normalization Table", "Loan #2 Normalization Table"]

  // renderHelixTabs return a list of Helix Tab jsx object
  const renderHelixTabs = () => {
    return listOfNormalizationReportTabs.map((tab, tabIndex) => {
      return (
          <Tab 
          key={tabIndex} 
          label={tab}
          icon={
              completedSteps.includes(tabIndex) ? (
                <AssignmentTurnedInIcon style={{ color: green[600] }} />
              ) : null
          }
          classes={{
              root: normalizationTableClasses.singleTab,
              labelIcon: normalizationTableClasses.singleTabIcon,
          }}
          />
      )
    })
  }

  // renderHelixPanelTabs return a list of HelixTabPanel jsx object
  const renderHelixPanelTabs = (newValue) => {
    return listOfNormalizationPanelReports.map((panelTab, panelTabIndex) => {
        return (
          <HelixTabPanel className={normalizationTableClasses.tabPanelContainer} key={panelTabIndex} value={newValue} index={panelTabIndex}>
              <ReportNormalizationTable
              header={panelTab}
              />
          </HelixTabPanel>
        )
    })
  }

  return (
    <div>
      <div className={normalizationTableClasses.tableAndTabsContainer}>
        <HelixVerticalTab handleChange={handleChange} value={value} renderHelixTabs={renderHelixTabs} renderHelixPanelTabs={renderHelixPanelTabs}/>
      </div>
      <div className={normalizationTableClasses.buttonContainer}>
        <HelixButton
        className={normalizationTableClasses.backButton}
        text="Back"
        disabled={value === 0 ? true : false}
        onClick={handleBack}
        />
        <HelixButton
        className={normalizationTableClasses.nextButton}
        text={value === 2 ? "Complete" : "Next"}
        onClick={value === 2 ? handleFinal : handleNext}
        />
        <HelixButton
        className={normalizationTableClasses.cancelButton}
        onClick={handleCancel}
        text="Cancel"
        />
      </div>
    </div>
  );
}

export default withRouter(ReportNormalizationTableDashboard);
