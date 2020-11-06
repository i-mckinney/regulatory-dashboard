import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import HelixToolBarSearch from '../table/HelixToolBarSearch'
import AddBoxIcon from '@material-ui/icons/AddBox'
import HelixCollectionList from '../utils/HelixCollectionList'

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
            lastModifiedBy: 'Ray',
            createdAt: '01/01/2020',
        },
        {
            _id: '2',
            lastModifiedBy: 'Ian',
            createdAt: '02/01/2020',
        },
        {
            _id: '3',
            lastModifiedBy: 'Eric',
            createdAt: '03/01/2020',
        },
        {
            _id: '4',
            lastModifiedBy: 'Neil',
            createdAt: '04/01/2020',
        },
        {
            _id: '5',
            lastModifiedBy: 'Mikey',
            createdAt: '05/01/2020',
        },
        {
            _id: '6',
            lastModifiedBy: 'Jacob',
            createdAt: '06/01/2020',
        },
        {
            _id: '7',
            lastModifiedBy: 'Taharka',
            createdAt: '07/01/2020',
        },
        {
            _id: '8',
            lastModifiedBy: 'LeBron',
            createdAt: '08/01/2020',
        },
        {
            _id: '9',
            lastModifiedBy: 'Michael',
            createdAt: '09/01/2020',
        },
        {
            _id: '10',
            lastModifiedBy: 'David',
            createdAt: '10/01/2020',
        },
    ]

    /**
     * @return jsx object of create icon in child component's toolbar
     */
    const displayCreateReportIcon = () => {
        return (
          <span className={reportClasses.createIconStyle}>
            <IconButton
            color="primary"
            >
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
        console.log('... Searching . . .')
    }

    // handleEditReport transition to edit the report
    const handleEditReport = () => {
        props.history.push('/')
    }

    // handleDeleteRport transition to delete the report
    const handleDeleteReport = () => {
        props.history.push('/homepage')
    }

    return (
        <div className={reportClasses.mediumContainer}>
            <div className={reportClasses.header}>
                <Typography variant="h5">Choose Your Report</Typography>
            </div>
            <HelixToolBarSearch onSearch={onSearch} displayCreateIcon={displayCreateReportIcon} />
            <HelixCollectionList 
            user={localUser} 
            reportData={reportData} 
            handleEditReport={handleEditReport} 
            handleDeleteReport={handleDeleteReport}
            />
        </div>
    )
}

export default withRouter(Report)