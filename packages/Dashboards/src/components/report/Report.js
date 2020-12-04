import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import HelixToolBarSearch from '../table/HelixToolBarSearch'
import AddBoxIcon from '@material-ui/icons/AddBox'
import HelixReportCard from '../utils/HelixReportCard'
import HelixCollectionList from '../utils/HelixCollectionList'
import ReportNormalizationTable from './ReportNormalizationTable'
import HelixProgressBar from '../utils/HelixProgressBar'

// Styling used for MaterialUI
const reportStyles = makeStyles(() => ({
    mediumContainer: {
        width: '80%',
        margin: 'auto',
        marginTop: '3rem',
        paddingBottom: '3rem',
    },
    createIconStyle: {
        float: 'right',
        cursor: 'pointer',
        marginLeft: "auto",
    },
    header: {
        paddingBottom: '2rem',
    },
    paper: {
        marginTop: '1rem',
    },
    gridList: {
        width: '100%',
        height: 500,
        transform: 'translateZ(0)',
    },
  }))

/** @return {JSX} Report site
 * routed at /Report
 */
function Report(props) {
    // Creates an object for styling. Any className that matches key in the reportStyles object will have a corresponding styling
    const reportClasses = reportStyles()

    // localUser is a static variable
    const localUser = "Ray"

    // reportData is mock data (list of Reports) but should be an api results of all reports
    const reportData = [
        {
            _id: '1',
            reportName: "CCAR",
            preference: {
                entities: true,
                loan: false,
                regulatory: false
            },
            lastModifiedBy: 'Ray',
            createdAt: '01/01/2020',
        },
        {
            _id: '2',
            reportName: "Regulatory",
            preference: {
                entities: false,
                loan: false,
                regulatory: true,
            },
            lastModifiedBy: 'Ian',
            createdAt: '02/01/2020',
        },
        {
            _id: '3',
            reportName: "Loan",
            preference: {
                entities: false,
                loan: true,
                regulatory: false,
            },
            lastModifiedBy: 'Eric',
            createdAt: '03/01/2020',
        },
        {
            _id: '4',
            reportName: "Loan",
            preference: {
                entities: false,
                loan: true,
                regulatory: false,
            },
            lastModifiedBy: 'Neil',
            createdAt: '04/01/2020',
        },
        {
            _id: '5',
            reportName: "CCAR",
            preference: {
                entities: true,
                loan: false,
                regulatory: false,
            },
            lastModifiedBy: 'Mikey',
            createdAt: '05/01/2020',
        },
        {
            _id: '6',
            reportName: "Regulatory",
            preference: {
                entities: false,
                loan: false,
                regulatory: true,
            },
            lastModifiedBy: 'Jacob',
            createdAt: '06/01/2020',
        },
        {
            _id: '7',
            reportName: "CCAR",
            preference: {
                entities: true,
                loan: false,
                regulatory: false,
            },
            lastModifiedBy: 'Taharka',
            createdAt: '07/01/2020',
        },
        {
            _id: '8',
            reportName: "Regulatory",
            preference: {
                entities: false,
                loan: false,
                regulatory: true,
            },
            lastModifiedBy: 'LeBron',
            createdAt: '08/01/2020',
        },
        {
            _id: '9',
            reportName: "Loan",
            preference: {
                entities: false,
                loan: true,
                regulatory: false,
            },
            lastModifiedBy: 'Michael',
            createdAt: '09/01/2020',
        },
        {
            _id: '10',
            reportName: "Loan",
            preference: {
                entities: false,
                loan: true,
                regulatory: false,
            },
            lastModifiedBy: 'David',
            createdAt: '10/01/2020',
        },
    ]

    // searchFilter contains a func that store filter query search upon user input
    const [searchFilter, setSearchFilter] = useState({ search: (rows) => { return rows }})
  
    /**
     * @return jsx object of create icon in child component's toolbar
     */
    const displayCreateReportIcon = () => {
        return (
          <span className={reportClasses.createIconStyle}>
            <IconButton
            color="primary"
            onClick={() => (props.history.push("/report/new"))}>
                <AddBoxIcon fontSize="large" />
            </IconButton>
          </span>
        )
    }

    /**
     * @param {object} event the event object contains user input
     * Pass the user query input to searchFilter and it store which object matches the query 
     */
    const onSearch = (event) => {
        const value = event.target.value
        setSearchFilter({ search: (rows) => {
            if (value === '') return rows
            else 
              return rows.filter((row) => 
                row['reportName'].toLowerCase().includes(value.toLowerCase())
            )
        }})
    }

    // handleEditReport transition to edit the report
    const handleEditReport = (report) => {
        props.history.push({ pathname: `/report/edit/${report._id}`, state: report })
    }

    // handleDeleteRport transition to delete the report
    const handleDeleteReport = () => {
        props.history.push('/homepage')
    }

    // handleReport transition to report page
    const handleReport = () => {
        props.history.push('/homepage')
    }

    const renderCustomizedReport = (user, component, handleComponent, handleEditComponent, handleDeleteComponent) => {
        return (
            <HelixReportCard 
            user={user}
            report={component}
            handleReport={handleComponent}
            handleEditReport={handleEditComponent}
            handleDeleteReport={handleDeleteComponent}
            />
        )
    }

    return (
        <div className={reportClasses.mediumContainer}>
            <div className={reportClasses.header}>
                <Typography variant="h5">Choose Your Report Template</Typography>
            </div>
            <HelixToolBarSearch onSearch={onSearch} displayCreateIcon={displayCreateReportIcon} />
            <HelixCollectionList 
            user={localUser} 
            data={reportData} 
            searchFilter={searchFilter}
            renderCustomizedComponent={renderCustomizedReport}
            handleComponent={handleReport}
            handleEditComponent={handleEditReport} 
            handleDeleteComponent={handleDeleteReport}
            />
            <HelixProgressBar />
            <ReportNormalizationTable />
        </div>
    )
}

export default withRouter(Report)