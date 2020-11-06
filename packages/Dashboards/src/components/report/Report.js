import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, Paper, Typography, IconButton, GridList, GridListTile } from '@material-ui/core'
import HelixCard from '../utils/HelixCard'
import HelixToolBarSearch from '../table/HelixToolBarSearch'
import AddBoxIcon from '@material-ui/icons/AddBox'

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
    const reportClasses = reportStyles()

    const localUser = "Ray"

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

    const onSearch = () => {
        console.log('... Searching . . .')
    }

    const handleEditReport = () => {
        props.history.push('/')
    }

    const handleDeleteReport = () => {
        props.history.push('/homepage')
    }

    return (
        <div className={reportClasses.mediumContainer}>
            <div className={reportClasses.header}>
                <Typography variant="h5">Choose Your Report</Typography>
            </div>
            <HelixToolBarSearch onSearch={onSearch} displayCreateIcon={displayCreateReportIcon} />
            <Paper elevation={10} className={reportClasses.paper}>
                <GridList cellHeight={200} spacing={10} cols={3} className={reportClasses.gridList}>
                    {reportData.map((report) => (
                        <GridListTile key={report._id}>
                            <HelixCard 
                            user={localUser} 
                            lastModifiedBy={report.lastModifiedBy} 
                            createdAt={report.createdAt} 
                            handleEditReport={handleEditReport}
                            handleDeleteReport={handleDeleteReport}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Paper>
        </div>
    )
}

export default withRouter(Report)