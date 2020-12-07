import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import GenericSummaryTable from './GenericSummaryTable'


const reportSummaryStyles = makeStyles(() => ({
    summaryReceiptRoot: {
        width: "100%",
    },
    summaryReceiptContainer: {
        maxHeight: 440,
    },
    paperCreation: {
        marginBottom: '2rem',
    },
    header: {
        paddingBottom: '2rem',
    },
    section: {
        width: '90%',
        margin: 'auto',
        padding: '16px'
  }
}))

const rows = [
    {
        fieldID: "H1-1",
        fieldName: "CustomerID",
        previousValue: "12345",
        currentValue: "70989",
    }
]

/**
 * @param {array} rows a list of obejcts that contains current changes for a cell
 * @param {object} classes object for styling
 * @return summary table
 */
function ReportSummary() {
    const reportSummaryClasses = reportSummaryStyles()
    return (
        <>
        <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
            <div className={reportSummaryClasses.section}>
                <div className={reportSummaryClasses.header}>
                    <Typography variant="h5">CCAR Report #7</Typography>
                    <Typography variant="caption" display="block">Reported Created at: 12/07/2020</Typography>
                </div>
            </div>
        </Paper>
        <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
            <div className={reportSummaryClasses.section}>
                <div className={reportSummaryClasses.header}>
                    <Typography variant="h5">Entity #16</Typography>
                    <Typography variant="caption" display="block" gutterBottom>Entity ID: 384573</Typography>
                </div>
                <GenericSummaryTable rows={rows} classes={reportSummaryClasses} />
            </div>
        </Paper>
        <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
            <div className={reportSummaryClasses.section}>
                <div className={reportSummaryClasses.header}>
                    <Typography variant="h5">Selected Loans</Typography>
                </div>
            </div>
        </Paper>
        </>
    )
}

export default ReportSummary