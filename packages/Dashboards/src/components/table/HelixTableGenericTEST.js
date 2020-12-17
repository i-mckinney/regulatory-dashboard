import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { StylesProvider, makeStyles, Paper, TableContainer, Table, TextareaAutosize } from "@material-ui/core"
import PropTypes from "prop-types"
import {HelixButton, Notification, ConfirmDialogModal } from "helixmonorepo-lib";
import HelixTableHeadGeneric from "./HelixTableHeadGeneric"
import HelixTableBody from "./HelixTableBody"
import HelixTableCellGeneric from "./HelixTableCellGeneric"
import HelixTableFooter from "./HelixTableFooter"
import HelixToolBarSearch from "./HelixToolBarSearch"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import { getComparator, stableSort } from './HelixTableSortFunc'

// Styling used for MaterialUI
const helixTableStyles = makeStyles(() => ({
  helixTable: {
    '& table': {
        width: '100%',
        display: 'table',
        borderTopRightRadius: '4px',
        borderTopLeftRadius: '4px',
        boxSizing: 'border-box',
        borderSpacing: '2px',
        borderColor: 'grey',
        borderCollapse: 'separate',
        '& tr': {
          border: 'none',
          backgroundColor: 'white',
          '&:nth-child(even)': {
            backgroundColor: '#d3e9ff',
          },
          '&:hover': {
            backgroundColor: '#add8e6',
          },
          '&:last-child': {
            borderBottomRightRadius: '4px',
            borderBottomLeftRadius: '4px',
          }
        },
        '& th': {
          backgroundColor: '#2e353d',
          color: 'white',
          margin: '0',
          borderBottom: 'solid 1px #e0e4e8',
          padding: '8px',
        },
        '& td': {
          margin: '0',
          borderBottom: 'solid 1px #e0e4e8',
          padding: '8px',
        },
        '&:last-children': {
          borderBottom: 'none',
        },
    },
    width: "80%",
    margin: "auto",
    marginTop: "3rem",
    paddingBottom: "3rem",
  },
  createRowColStyle: {
    float: "right",
    cursor: "pointer",
    marginLeft: "auto",
  },
  header: {
    paddingBottom: "2rem",
  },
  actionsIconStyle: {
    display: 'block',
    textAlign: 'center',
    "& button": {
      marginRight: "1rem",
      cursor: "pointer",
      textAlign: 'center',
    },
  },
}))

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} customCellRender func represents custom func that return jsx of table row of table cell values
 * @param {func} customHeadColumnKeyProp func represents custom func that return key props for table row in table head (required)
 * @param {func} customBodyRowKeyProp func represents custom func that return key props for the table row in table body (required)
 * @param {string} initialOrderBy string represents what the column in the table should order by initially
 * @param {bool} toggleSearch bool represents true or false if table should have a search function
 * @param {func} displayCreateIcon func displays jsx object of create icon into toolbar
 * @param {func} saveHeaderData func that allows header data to be saved and pass to next component
 * @param {func} headerNotification func that allows header notification data to be saved and pass to next component

 * @returns {JSX} renders a custom table
 */
const HelixTableGenericTEST = ({
  rows,
  setRows,
  columns,
  setColumns,
  initialOrderBy,
  toggleSearch,
  showAddRow,
  showAddColumn,
  deleteColumnOption,
  editColumnOption
  }) => {
  // Creates an object for styling. Any className that matches key in the helixTableStyles object will have a corresponding styling
  const helixTableClasses = helixTableStyles()

  // Page is needed for pagination to determine the process of what page it is at
  const [page, setPage] = useState(0)
  // rowsPerPage is needed for pagination to determine how many rows should be display per page
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // order is a conditional string for ascending or descending order
  const [order, setOrder] = useState('asc')
  // orderBy is a string to order by column in ascending or descending order
  const [orderBy, setOrderBy] = useState(initialOrderBy)

  // searchFilter contains a func that store filter query search upon user input
  const [searchFilter, setSearchFilter] = useState({ search: (rows, columns) => { return rows }})

  // Sets state of confirm Dialog window used for editing/deleting a row
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: 'Are you sure you want to delete this row?', subTitle: '', confirmText: 'Yes', cancelText: 'Cancel'})
  //Set state of notification in response to a button action
  const [rowNotification, setRowNotification] = useState({isOpen: false, message: 'Successfully deleted row', type: 'success'}) 
  //Set state of header notification in response to a button action
  const [headerNotification, setHeaderNotification] = useState({isOpen: false, message: '', type: ''}) 
  
  const [newColumnCount, setNewColumnCount] = useState(1) 

  /**
   * @param {int} newPage the newPage passed from the child component
   * it sets a new page
   */
  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  /**
   * @param {event} event the event object hold the property of input value that passed from the child component
   * it sets row per page by specific value and set the page to 0
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  /**
   * @param {string} property the property is a column header
   */
  const onSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  /**
   * @param {object} event the event object contains user input
   * Pass the user query input to searchFilter and it store which object matches the query 
   */
  const onSearch = (event) => {
    const { value } = event.target
    setSearchFilter({ search: (rows, columns) => {
        if (value === '') return rows
        else 
          return rows.filter((row) => 
            (columns.filter((column) => {
              const columnAccessor = column.Accessor
              if (typeof(row[columnAccessor]) === 'string') {
                return row[columnAccessor]
                .toLowerCase()
                .includes(value.toLowerCase())
              }
              try {
                const assignedRoles = row[columnAccessor].reduce((result, roles) => {
                  return `${result} ${roles}`.trim()
                }, "")
                return assignedRoles.toLowerCase().includes(value.toLowerCase())
              } catch (error) {
                console.log("Error Type", error)
                return error
              }
            })
            .length > 0 
            ? true
            : false
            )
          )
      }
    })
  }

  /**
   * @param {string} newAccessor string to be set as new key in row object
   * @param {string} oldAccessor string of old key in row object to be deleted
   * @return {Array} returns array of row Objects with updated keys to match those of  columns
   * Can be used to delete row key if newAccessor === oldAccessor
   */
  const updateRowKeys = (newAccessor, oldAccessor) => {
    const updatedRowData = [...rows]
    for (let i=0; i<updatedRowData.length; i++){
      if(oldAccessor){
      updatedRowData[i][newAccessor] = updatedRowData[i][oldAccessor]
      delete updatedRowData[i][oldAccessor]
      } else {
        updatedRowData[i][newAccessor] = ''
      }
    }
    return updatedRowData
  }

  /**
   * Handles adding a new column and updating rows (& row keys) accordingly
   **/
  const addCol = () => {
    const newColumns = [...columns]
    const newColIndex = columns.length-1;
    const newColumnLabel = `New Column ${newColumnCount}`
    const newColumnAccessor = `NewColumn${newColumnCount}`
    newColumns.splice(newColIndex,0, {Label: newColumnLabel , Accessor: newColumnAccessor, Sortable: true})
    setNewColumnCount(newColumnCount+1)
    setColumns(newColumns)
    const updatedRows = updateRowKeys(newColumnAccessor)
    setRows(updatedRows)
  }


/**
 * This helper function is used to keep row numbers dynamic when deleting rows
 * @param {Array} arrayOfRowObjects array of Row Objects to iterate through
 * @return {Array} returns array of row Objects with updated row numbers
 */
const updateRowNumbers = (arrayOfRowObjects) => {
  return (arrayOfRowObjects.map((row, idx)=>{
      row['Row'] = (idx+1).toString()
    })
  )
}

/**
 * Handles adding a new row 
 */
const addRow = () => {
  const currentAccessors = columns.map((column) =>(column.Accessor))  
  const newRow = {}
  for(let i=0; i<currentAccessors.length; i++){
    if(currentAccessors[i]==='Row'){
      newRow[currentAccessors[i]] = (rows.length +1).toString()
    } else if (currentAccessors[i] === '_id') {
        newRow[currentAccessors[i]] = uuidv4()
    } else { newRow[currentAccessors[i]] =''}
  }
  setRows([...rows, newRow])
}

  /**
 * Handles deleting a  row 
 * @param {string} id unique id of row to be deleted
 */
const handleDeleteRow = (id) => {
  setConfirmDialog({
    ...confirmDialog,
    isOpen: false
  })
  const newRowData = [...rows].filter(row=>row._id !== id)
  updateRowNumbers(newRowData)
  setRows(newRowData)
  setRowNotification({
    ...rowNotification,
    isOpen: true,
  }) 
}

/** 
 * @param {int} rowIndex the rowIndex represents index of the row 
 * @param {int} columnAccessor represents row key to save (i.e. column that was edited)
 * @param {bool} isEdited boolean represent whether cell is edited
 * @param {string} value represents new value provided from table data cell (child component)
 * Function passed down to child component to maintain save row after edits are made
 */
const saveRowData = (rowIndex, columnAccessor, isEdited, value) => {
  if(isEdited) {
    const updatedRowData = rows.map((row,idx) => {
      if (idx === rowIndex){
        row[columnAccessor]=value
        return row
      }
      else {return row }
    })
    setRows(updatedRowData)
  }
}

  /** 
   * Gets columns from child component and updates columns and...
   * ...rows after a column/header has been changed
   * Set newAccessor as both second and third args to delete that key/Accessor
   * @param {Array} updatedHeaders Array of header/column objects passed from child component 
   * @param {string} newAccessor string to be set as new key in row objects 
   * @param {string} oldAccessor string of old key in row objects to be deleted
   */
  const saveHeaderData = (updatedHeaders, newAccessor, oldAccessor) => {
    const idColumn= [{ Label: "_id", Accessor: "_id", Sortable: false }]
    const newHeaders = idColumn.concat(updatedHeaders)
    setColumns(newHeaders)
    const updatedRows = updateRowKeys(newAccessor, oldAccessor)
    setRows(updatedRows)
  }
    /** 
   * Gets notification data from action on headers/columns and sets it to state hook
   * @param {Object} currentHeaderNotification Object containing information to set header notification to
   */
  const updateHeaderNotification = (currentHeaderNotification) => {
    setHeaderNotification({
      isOpen: currentHeaderNotification.isOpen,
      message: currentHeaderNotification.message,
      type: currentHeaderNotification.type
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
    const columnAccessor = column.Accessor;
    const displayActions = () => (
      <span className={helixTableClasses.actionsIconStyle}>
        <IconButton aria-label="delete" size="small" edge="start"  color="secondary"
          onClick={()=> {
            setConfirmDialog({
              ...confirmDialog,
              isOpen: true,
              onConfirm: ()=>{handleDeleteRow(row._id)}
            })
          }}>
            <DeleteIcon />
        </IconButton>
      </span>
    );
    return (
      <HelixTableCellGeneric
        key = {`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}
        containActions = {columnAccessor === "Actions"}
        displayActions={displayActions}
        editable = {(columnAccessor !== "Row" && columnAccessor !== "Actions")}
        rowIndex={rowIndex}
        columnAccessor ={columnAccessor}
        columnIndex={columnIndex}
        value={row[columnAccessor]}
        saveEntityData={saveRowData}
      />
    ) 
  };

  /**
   * @param {object} column represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customHeadColumnKeyProp = (column) => {
    return column.Accessor;
  };

  /**
   * @param {object} row represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customBodyRowKeyProp = (row) => {
    return row._id;
  };

  /**
   * @return jsx object of create icon in child component's toolbar
   */
  const displayCreateRowColButton = () => {
    return (
      <span className={helixTableClasses.createRowColStyle}>
      {showAddRow ? <HelixButton text="Add Row"  color="primary"  onClick={addRow} /> : null }
      { showAddColumn ? <HelixButton text="Add Column"  color="primary"  onClick={addCol}/> : null }   
   </span>
    );
  };
  
  return (
    <div className={helixTableClasses.helixTable}>
      <>
      <HelixToolBarSearch toggleSearch={toggleSearch} onSearch={onSearch} displayCreateIcon={displayCreateRowColButton} />
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <HelixTableHeadGeneric toggleSearch={toggleSearch} order={order} orderBy={orderBy} onSort={onSort} columns={columns.slice(1)} customHeadColumnKeyProp={customHeadColumnKeyProp} saveHeaderData={saveHeaderData} saveNotificationData={updateHeaderNotification} deleteColumnOption={deleteColumnOption} editColumnOption={editColumnOption}/>
          <HelixTableBody toggleSearch={toggleSearch} searchFilter={searchFilter} order={order} orderBy={orderBy} getComparator={getComparator} stableSort={stableSort} columns={columns.slice(1)} rows={rows} rowsPerPage={rowsPerPage} page={page} customCellRender={customCellRender} customBodyRowKeyProp={customBodyRowKeyProp} toggleExpandable={false}/>
          <HelixTableFooter rows={rows} colSpan={columns.slice(1).length} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </Table>
      </TableContainer>
      </>
    <ConfirmDialogModal confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    <Notification notification={rowNotification} setNotification={setRowNotification} />
    <Notification notification={headerNotification} setNotification={setHeaderNotification} />
    </div>
  )
}

// HelixTableGeneric.propTypes = {
  // columns: PropTypes.instanceOf(Array).isRequired,
  // rows: PropTypes.instanceOf(Array).isRequired,
  // customCellRender: PropTypes.func.isRequired,
  // customHeadColumnKeyProp: PropTypes.func.isRequired,
  // customBodyRowKeyProp: PropTypes.func.isRequired,
  // initialOrderBy: PropTypes.string.isRequired,
  // toggleSearch: PropTypes.bool.isRequired,
  // displayCreateIcon: PropTypes.func.isRequired,
// }

HelixTableGenericTEST.defaultProps = {
  initialOrderBy: '',
  toggleSearch: true,
  displayCreateIcon: () => null,
  showAddColumn: true,
  showAddRow: true,
}

export default HelixTableGenericTEST
