import React from 'react'
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
function Report() {
    const reportClasses = reportStyles()

    const localUser = "Ray"
    
    const reportData = [
        {
            lastModifiedBy: 'Ray',
            createdAt: '01/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
            createdAt: '02/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
            createdAt: '03/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
            createdAt: '04/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
            createdAt: '05/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
            createdAt: '06/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
            createdAt: '07/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
            createdAt: '08/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
            createdAt: '09/01/2020',
        },
        {
            lastModifiedBy: 'Ray',
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

    return (
        <div className={reportClasses.mediumContainer}>
            <div className={reportClasses.header}>
                <Typography variant="h5">Choose Your Report</Typography>
            </div>
            <HelixToolBarSearch displayCreateIcon={displayCreateReportIcon} />
            <Paper elevation={10} className={reportClasses.paper}>
                <GridList cellHeight={200} spacing={1} cols={3} className={reportClasses.gridList}>
                    {reportData.map((datum) => (
                        <GridListTile key={datum.lastModifiedBy}>
                            <HelixCard />
                        </GridListTile>
                    ))}
                </GridList>
            </Paper>
        </div>
    )
}

export default Report