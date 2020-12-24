import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  Typography,
  IconButton,
  Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import HelixToolBarSearch from "../table/HelixToolBarSearch";
import AddBoxIcon from "@material-ui/icons/AddBox";
import HelixCollectionList from "../utils/HelixCollectionList";
import axios from "axios";
import { BACKEND_ENTITIES_HOST } from "../../config";

// Styling used for MaterialUI
const reportStyles = makeStyles(() => ({
  errorAlert: {
    marginTop: "40px",
    marginBottom: "40px",
  },
  mediumContainer: {
    width: "80%",
    margin: "auto",
    marginTop: "3rem",
    paddingBottom: "3rem",
  },
  createIconStyle: {
    float: "right",
    cursor: "pointer",
    marginLeft: "auto",
  },
  header: {
    paddingBottom: "2rem",
  },
  paper: {
    marginTop: "1rem",
  },
  gridList: {
    width: "100%",
    height: 500,
    transform: "translateZ(0)",
  },
}));

/** @return {JSX} Report site
 * routed at /reporttemplates
 */
function Report(props) {
  // Creates an object for styling. Any className that matches key in the reportStyles object will have a corresponding styling
  const reportClasses = reportStyles();

  // alert for errors
  const [alertOpen, setAlertOpen] = useState(false);
  // reportTemplates are the company report template data object retrieved from EntityBackend
  const [reportTemplates, setReportTemplates] = useState([]);

  // localUser is a static variable
  const localUser = "Ray";

  let companyId = "5f7e1bb2ab26a664b6e950c8"
  // GET all report templates for a company
  let reportURL = `${BACKEND_ENTITIES_HOST}/reporttemplate/${companyId}`

  useEffect(() => {
  const fetchReportTemplates = async () => {
    const response = await axios.get(reportURL)
    console.log('response.data', response.data)
    setReportTemplates(response.data)
  }
  fetchReportTemplates()
  }, [reportURL])

  // reportData is mock data (list of Reports) but should be an api results of all reports
  const reportData = [
    {
      _id: "1",
      reportName: "CCAR",
      preference: {
        entities: true,
        loan: false,
        regulatory: false,
      },
      lastModifiedBy: "Ray",
      createdAt: "01/01/2020",
    },
    {
      _id: "2",
      reportName: "Regulatory",
      preference: {
        entities: false,
        loan: false,
        regulatory: true,
      },
      lastModifiedBy: "Ian",
      createdAt: "02/01/2020",
    },
    {
      _id: "3",
      reportName: "Loan",
      preference: {
        entities: false,
        loan: true,
        regulatory: false,
      },
      lastModifiedBy: "Eric",
      createdAt: "03/01/2020",
    },
    {
      _id: "4",
      reportName: "Loan",
      preference: {
        entities: false,
        loan: true,
        regulatory: false,
      },
      lastModifiedBy: "Neil",
      createdAt: "04/01/2020",
    },
    {
      _id: "5",
      reportName: "CCAR",
      preference: {
        entities: true,
        loan: false,
        regulatory: false,
      },
      lastModifiedBy: "Mikey",
      createdAt: "05/01/2020",
    },
    {
      _id: "6",
      reportName: "Regulatory",
      preference: {
        entities: false,
        loan: false,
        regulatory: true,
      },
      lastModifiedBy: "Jacob",
      createdAt: "06/01/2020",
    },
    {
      _id: "7",
      reportName: "CCAR",
      preference: {
        entities: true,
        loan: false,
        regulatory: false,
      },
      lastModifiedBy: "Taharka",
      createdAt: "07/01/2020",
    },
    {
      _id: "8",
      reportName: "Regulatory",
      preference: {
        entities: false,
        loan: false,
        regulatory: true,
      },
      lastModifiedBy: "LeBron",
      createdAt: "08/01/2020",
    },
    {
      _id: "9",
      reportName: "Loan",
      preference: {
        entities: false,
        loan: true,
        regulatory: false,
      },
      lastModifiedBy: "Michael",
      createdAt: "09/01/2020",
    },
    {
      _id: "10",
      reportName: "Loan",
      preference: {
        entities: false,
        loan: true,
        regulatory: false,
      },
      lastModifiedBy: "David",
      createdAt: "10/01/2020",
    },
  ];

  // searchFilter contains a func that store filter query search upon user input
  const [searchFilter, setSearchFilter] = useState({
    search: (rows) => {
      return rows;
    },
  });

  /**
   * @return jsx object of create icon in child component's toolbar
   */
  const displayCreateReportIcon = () => {
    return (
      <span className={reportClasses.createIconStyle}>
        <IconButton
          color="primary"
          onClick={() => props.history.push("/reporttemplates/new")}
        >
          <AddBoxIcon fontSize="large" />
        </IconButton>
      </span>
    );
  };

  /**
   * @param {object} event the event object contains user input
   * Pass the user query input to searchFilter and it store which object matches the query
   */
  const onSearch = (event) => {
    const value = event.target.value;
    setSearchFilter({
      search: (rows) => {
        if (value === "") return rows;
        else
          return rows.filter((row) =>
            row["reportName"].toLowerCase().includes(value.toLowerCase())
          );
      },
    });
  };

  // handleEditReport transition to edit the report
  const handleEditReport = (report) => {
    props.history.push({
      pathname: `/report/edit/${report._id}`,
      state: report,
    });
  };

  // handleDeleteRport transition to delete the report
  const handleDeleteReport = async (reportTemplate) => {
    const id = reportTemplate._id

    try {
      await axios.delete(`${reportURL}/${id}`)
      setReportTemplates(reportTemplates.filter((reportTemplate)=>reportTemplate._id !== id))
    } catch (e) {
      console.error(e);
    }
    props.history.push("/reporttemplates");
  };

  // handleReport transition to report page
  const handleGenerateReport = async () => {
    try {
      /** TODO: need to pass in the reportTemplateId in the req.body -> {reportTemplateId} */
      let res = await axios.post(`${BACKEND_ENTITIES_HOST}/report/new`);

      let reportId = res.data.reportId;

      if (reportId) {
        props.history.push(`/report/${reportId}/generate`);
      }
    } catch (error) {
      setAlertOpen(true);
    }
  };

  return (
    <div className={reportClasses.mediumContainer}>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          className={reportClasses.errorAlert}
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
          Error in generating a new report
        </Alert>
      </Collapse>
      <div className={reportClasses.header}>
        <Typography variant="h5">Choose Your Report Template</Typography>
      </div>
      <HelixToolBarSearch
        onSearch={onSearch}
        displayCreateIcon={displayCreateReportIcon}
      />
      <HelixCollectionList
        user={localUser}
        data={reportData}
        reportTemplates = {reportTemplates}
        searchFilter={searchFilter}
        handleComponent={handleGenerateReport}
        handleEditComponent={handleEditReport}
        handleDeleteComponent={handleDeleteReport}
      />
    </div>
  );
}

export default withRouter(Report);
