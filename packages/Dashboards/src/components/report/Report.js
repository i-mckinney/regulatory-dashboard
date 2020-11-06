import React from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
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
  }))

/** @return {JSX} Report site
 * routed at /Report
 */
function Report() {
    const reportClasses = reportStyles()

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
            
        </div>
    )
}

export default Report