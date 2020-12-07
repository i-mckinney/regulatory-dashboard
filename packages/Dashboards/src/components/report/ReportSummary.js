import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { HelixTableCell } from 'helixmonorepo-lib'
import HelixTable from '../table/HelixTable'
import GenericSummaryTable from './GenericSummaryTable'
import HelixCollapsibleRow from '../utils/HelixCollapsibleRow'


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

const summaryRows = [
    {
        fieldID: "H1-1",
        fieldName: "CustomerID",
        previousValue: "12345",
        currentValue: "70989",
    }
]

const columns = [
    {
        Label: "Loan Name",
        Accessor: "loanName"
    }
]

const rows = [
    {
        _id: "1",
        loanName: "Testing #1",
        fieldID: "H1-1",
        fieldName: "Customer ID",
        previousValue: "123456",
        currentValue: "654321",
    },
    {
        _id: "2",
        loanName: "Testing #2",
        fieldID: "H1-1",
        fieldName: "Customer ID",
        previousValue: "354767",
        currentValue: "254665",
    },
    {
        _id: "3",
        loanName: "Testing #3",
        fieldID: "H1-1",
        fieldName: "Customer ID",
        previousValue: "",
        currentValue: "598668",
    },
]

/**
 * @param {array} rows a list of obejcts that contains current changes for a cell
 * @param {object} classes object for styling
 * @return summary table
 */
function ReportSummary() {

    const customCollapsibleRowRender = (row, rowIndex, columns, customCellRender) => {
        const innerTableHeadColumns = ["Field", "Field Name", "Previous Value", "Proposed Value"]
        const innerTableBodyRows = [row.fieldID, row.fieldName, row.previousValue, row.currentValue]
        return <HelixCollapsibleRow key={row._id} row={row} rowIndex={rowIndex} columns={columns} innerTableHeadColumns={innerTableHeadColumns} innerTableBodyRows={innerTableBodyRows} customCellRender={customCellRender} />
    }

    /**
     * @param {object} row the row is an object of data
     * @param {object} column the column is an object of the header with accessor and label props
     * @param {int} rowIndex the rowIndex represents index of the row
     * @param {int} columnIndex the columnIndex represents index of the column
     * @return {JSX} HelixTableCell of object properties in that Table row
     */
    const customCellRender = (row, column, rowIndex, columnIndex) => {
      const columnAccessor = column.Accessor
      return <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={row[columnAccessor]} />
    }

    /**
     * @param {object} column represent object data regarding the api result
     * @return {string} provide table row with unique key props (required)
     */
    const customHeadColumnKeyProp = (column) => {
        return column.Accessor
    }

    /**
     * @param {object} row represent object data regarding the api result
     * @return {string} provide table row with unique key props (required)
     */
    const customBodyRowKeyProp = (row) => {
        return row._id
    }

    // Initially, we can start the table to order by Loan Name or etc in ascending order
    const initialOrderBy = "loanName"


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
                <GenericSummaryTable rows={summaryRows} classes={reportSummaryClasses} />
            </div>
        </Paper>
        <Paper elevation={5} className={reportSummaryClasses.paperCreation}>
            <div className={reportSummaryClasses.section}>
                <div className={reportSummaryClasses.header}>
                    <Typography variant="h5">Selected Loans</Typography>
                </div>
                <HelixTable toggleExpandable={true} customCollapsibleRowRender={customCollapsibleRowRender} initialOrderBy={initialOrderBy} columns={columns} rows={rows} customCellRender={customCellRender} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} />
            </div>
            
        </Paper>
        </>
    )
}

export default ReportSummary