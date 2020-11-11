//Component for listing table of My Requests
import React, { useState, useEffect, useMemo }  from "react"
import { withRouter } from 'react-router-dom'
import { StylesProvider, makeStyles, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { HelixTable, HelixTableCell } from 'helixmonorepo-lib'
import { sortableExcludes, columnExcludes, columnLabels } from './config'
import mockData from "./MockRequestData"
import ConfirmDialog from "../utils/ConfirmDialog"

// Styling used for MaterialUI
const requestTableStyles = makeStyles(() => ({
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

/**
 * @return {JSX} MyRequest site show list of Requests
 * routed at /myrequest
 */
const MyRequest = () => {
    // Sets state of confirm Dialog window used for editing/deleting a request
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', confirmText: 'Yes', cancelText: 'Cancel'})
    
    // Creates an object for styling. Any className that matches key in the requestTableStyles object will have a corresponding styling
    const requestTableClasses = requestTableStyles()

    //Rows will store my requests. To Do: from GET Method fetchRequests (yet to be made) via Rest API 
    const [rows, setRows] = useState([])
      
    // columns will store column header that we want to show in the front end
    const columns = useMemo(() => [], [])
  /** useMemo is a React hook that memorizes the output of a function.
   * It's important that we're using React.useMemo here to ensure that our data isn't recreated on every render.
   * If we didn't use React.useMemo, the table would think it was receiving new data on every render
   * and attempt to recalulate a lot of logic every single time. Only when the memorized value actually changes, it re renders
   * Header -> Represents what is shown in the table
   * Accessor -> represents key that you look for in a given data
   * Filter -> choosing which filter to use.
   * filter -> includes (tells react table to show values that matches the value in the select field)
   * Filter not given -> will use global filter
   * */

    if (rows.length !== 0 && columns.length ===0) {
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
   * On first render (column length is zero), set rows to full set of mock data 
   * TO DO: implelment a fetchRequest call to myrequest backend api (once completed) through GET protocol to get all the requests
   */
   if (columns.length === 0){
    setRows(mockData)
  }

  /**
   * @param {string} id row id to be deleted 
   * Closes dialog box and updates row data 
   */
  const handleDelete = id => {
    const tempData = [...rows]
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    const newData = tempData.filter(myRequest => myRequest._id !== id)
    setRows(newData)
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
      <>
      <IconButton aria-label="edit" size="small" edge="start" onClick={() => (console.log('Edit Request Clicked'))} color="default">
          <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" size="small" edge="start" color="secondary"
        onClick={() => { 
          setConfirmDialog({
              isOpen: true, 
              title: 'Send notification to approver to delete this request?',
              cancelText: 'Cancel',
              confirmText: 'Yes',
              onConfirm: ()=>{handleDelete(row._id)}
              }) 
            }}>
          <DeleteIcon />
      </IconButton>
      </>
    )
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

  return (
    <StylesProvider injectFirst>
        <div className={requestTableClasses.mediumContainer}>
            <div className={requestTableClasses.header}>
                <Typography variant="h5">My Requests</Typography>
            </div>  
            <HelixTable toggleSearch={true} columns={columns.slice(1)} rows={rows} customCellRender={customCellRender} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </div>
    </StylesProvider>
  ) 
}

export default withRouter(MyRequest)

