import React, { useState, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { StylesProvider, createGenerateClassName, makeStyles, Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import AssignmentIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { HelixTable, HelixTableCell } from 'helixmonorepo-lib'
import mockData from './MockData'
import { sortableExcludes, columnExcludes, columnLabels } from './config'

const generateClassName = createGenerateClassName({
    productionPrefix: 'myreport-',
})

// Styling used for MaterialUI
const myReportStyles = makeStyles(() => ({
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
  actionsIconStyle: {
    '& button': {
        marginRight: '1rem',
        cursor: 'pointer',
    },
},
  viewReportButton: {
    color: 'blue'
  },
}))

/** @return {JSX} MyReport site
 * routed at /myreport
 */

function MyReport(props) {
  // Creates an object for styling. Any className that matches key in the myReportStyles object will have a corresponding styling
  const myReportClasses = myReportStyles()

  /** useMemo is a React hook that memorizes the output of a function.
   * It's important that we're using React.useMemo here to ensure that our data isn't recreated on every render.
   * If we didn't use React.useMemo, the table would think it was receiving new data on every render
   * and attempt to recalulate a lot of logic every single time. Only when the memoized value actually changes, it re renders
   * Header -> Represents what is shown in the table
   * Accessor -> represents key that you look for in a given data
   * Filter -> choosing which filter to use.
   * filter -> includes (tells react table to show values that matches the value in the select field)
   * Filter not given -> will use global filter
   * */
  // rows will stores my reports from GET Method fetchMyReports via Rest API
  const [rows, setRows] = useState([])

  // columns will store column header that we want to show in the front end
  const columns = useMemo(() => [], [])

  if (columns.length === 0) {
    setRows(mockData)
  }

  if (rows.length !== 0 && columns.length === 0) {
    const headerColumns = Object.keys(rows[0])
    headerColumns.forEach((key, index) => {
      if (!columnExcludes.includes(key)) {
        columns.push({
        Label: columnLabels[index],
        Accessor: key,
        Sortable: sortableExcludes.includes(key) ? false : true,
        })
      }
    })
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
      const displayActions = () => (
        <span className={myReportClasses.actionsIconStyle}>
            <IconButton className={myReportClasses.viewReportButton} aria-label="report" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/myreport/${row._id}`, state: row }))}>
              <AssignmentIcon />
            </IconButton>
            <IconButton aria-label="edit" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/myreport/edit/${row._id}`, state: row }))} color="default">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/myreport/delete/${row._id}`, state: row }))} color="secondary">
              <DeleteIcon />
            </IconButton>
        </span>)

      if (columnAccessor === "Actions") {
        return (
            <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} containActions={true} displayActions={displayActions} />
        )
      }
      else {
        return <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={row[columnAccessor]} />
      }
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

    // Initially, we can start the table to order by Report Name or etc in ascending order
    const initialOrderBy = "reportName"

    /**
     * @return jsx object of create icon in child component's toolbar
     */
    const displayCreateIcon = () => null

    return (
      <StylesProvider generateClassName={generateClassName}>
          <div className={myReportClasses.mediumContainer}>
            <div className={myReportClasses.header}>
                <Typography variant="h5">My Report</Typography>
            </div>
            <HelixTable toggleSearch={true} displayCreateIcon={displayCreateIcon} initialOrderBy={initialOrderBy} columns={columns.slice(1)} rows={rows} customCellRender={customCellRender} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} />
          </div>
      </StylesProvider>
    )
}

export default withRouter(MyReport)
