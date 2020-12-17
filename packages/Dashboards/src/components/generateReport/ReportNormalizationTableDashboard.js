import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import ReportNormalizationTable from "./ReportNormalizationTable";
import { HelixButton } from "helixmonorepo-lib";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tableAndTabsContaiiner: {
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

  return (
    <div>
      <div>
        <div className={normalizationTableClasses.tableAndTabsContaiiner}>
          <div>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={normalizationTableClasses.leftTabsStyle}
            >
              <Tab
                label="Entity Table #1"
                icon={
                  completedSteps.includes(0) ? (
                    <AssignmentTurnedInIcon style={{ color: green[600] }} />
                  ) : null
                }
                {...a11yProps(0)}
                classes={{
                  root: normalizationTableClasses.singleTab,
                  labelIcon: normalizationTableClasses.singleTabIcon,
                }}
              />
              <Tab
                className={normalizationTableClasses.singleTab}
                icon={
                  completedSteps.includes(1) ? (
                    <AssignmentTurnedInIcon style={{ color: green[600] }} />
                  ) : null
                }
                label="Loans Table #1"
                {...a11yProps(1)}
              />
              <Tab
                className={normalizationTableClasses.singleTab}
                icon={
                  completedSteps.includes(2) ? (
                    <AssignmentTurnedInIcon style={{ color: green[600] }} />
                  ) : null
                }
                label="Loans Table #2"
                {...a11yProps(2)}
              />
            </Tabs>
          </div>
          <TabPanel
            className={normalizationTableClasses.tabPanelContainer}
            value={value}
            index={0}
          >
            <ReportNormalizationTable
              header={"Entitiy #1 Normalization Table"}
            />
          </TabPanel>
          <TabPanel
            className={normalizationTableClasses.tabPanelContainer}
            value={value}
            index={1}
          >
            <ReportNormalizationTable header={"Loan #1 Normalization Table"} />
          </TabPanel>
          <TabPanel
            value={value}
            className={normalizationTableClasses.tabPanelContainer}
            index={2}
          >
            <ReportNormalizationTable header={"Loan #2 Normalization Table"} />
          </TabPanel>
        </div>
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
