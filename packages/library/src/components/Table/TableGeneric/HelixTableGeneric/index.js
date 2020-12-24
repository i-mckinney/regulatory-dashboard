import React, { useState } from "react"
import { makeStyles, Paper, TableContainer, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import HelixButton from '../../../HelixButton/index'
import Notification from '../../../Notification/index'
import ConfirmDialogModal from '../../../ConfirmDialogModal/index'
import HelixTableHeadGeneric from "../HelixTableHeadGeneric/index"
import HelixTableCellGeneric from "../HelixTableCellGeneric/index"
import RowColumnHelper from "../RowColumnHelper/index"
import HelixTableBody from "../HelixTableBody/index"
import HelixTableFooter from "../../HelixTableFooter"
import HelixToolBarSearch from "../HelixToolBarSearch/index"
import { getComparator, stableSort } from '../../HelixTableSortFunc/index'
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

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
          paddingLeft: '1rem',
        },
        '& td': {
          margin: '0',
          borderBottom: 'solid 1px #e0e4e8',
          padding: '8px',
          paddingLeft: '1rem',
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
 * 
 * ###Params
 * * _**initialOrderBy**_ **\<string\>** string represents what the column in the table should order by initially
 * * _**columns**_ **\<array\>** State hook - Array of column objects where each object contains the keys: Label, Accessor and Sortable
 * * _**rows**_ **\<array\>**  State hook - Array of row objects where each object contains keys matching column Accessors
 * * _**setColumns**_ **\<func\>** function to set columns state hook
 * * _**setRows**_ **\<func\>**  function to set rows state hook
 * * _**toggleSearch**_ **\<bool\>**  bool represents true or false if table should have a search function
 * * _**showAddRow**_ **\<bool\>** bool represents true or false if table should have an Add Row Button
 * * _**showAddColumn**_ **\<bool\>** bool represents true or false if table should have an Add Column Button
 * * _**deleteColumnOption**_ **\<bool\>** bool represents true or false if table should have a delete Column Button
 * * _**editColumnOption**_ **\<bool\>** bool represents true or false if table should have an edit Column Button
 * * _**edtiableRows**_ **\<bool\>** bool represents true or false if table should have editable row cells
 * 
 * ###Returns 
 * * **\<JSX\>** renders a react custom generic table component
 */
const HelixTableGeneric = ({
  initialOrderBy,
  columns,
  rows,
  setColumns,
  setRows,
  toggleSearch,
  showAddRow,
  showAddColumn,
  deleteColumnOption,
  editColumnOption,
  editableRows,
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
  //Keeps track of new columns added to avoid repeated names
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

  const addCol = () => {
    RowColumnHelper.addColHelper(rows, columns, newColumnCount, setNewColumnCount, setColumns, setRows)
  }

  const addRow = () => {
    RowColumnHelper.addRowHelper(columns, rows, setRows)
  }

  /**
   * @param {string} id unique id of row to be deleted
   */
  const handleDeleteRow = (id) => {
    RowColumnHelper.handleDeleteRowHelper(id, rows, confirmDialog, rowNotification, setRows, setConfirmDialog, setRowNotification)
  }

  /** 
   * @param {int} rowIndex the rowIndex represents index of the row 
   * @param {int} columnAccessor represents row key to save (i.e. column that was edited)
   * @param {bool} isEdited boolean represent whether cell is edited
   * @param {string} value represents new value provided from table data cell (child component)
   * Function passed down to child component to maintain save row after edits are made
   */
  const saveRowData = (rowIndex, columnAccessor, isEdited, value) => {
    RowColumnHelper.saveRowDataHelper(rows, rowIndex, columnAccessor, isEdited, value, setRows)
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
    RowColumnHelper.saveHeaderDataHelper(rows, updatedHeaders, newAccessor, oldAccessor, setColumns, setRows)
  }
  /** 
   * Gets notification data from action on headers/columns and sets it to state hook
   * @param {Object} currentHeaderNotification Object containing information to set header notification to
   */
  const updateHeaderNotification = (currentHeaderNotification) => {
    RowColumnHelper.updateHeaderNotificationHelper(currentHeaderNotification, setHeaderNotification)
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
        editable = {(columnAccessor !== "Row" && columnAccessor !== "Actions" && editableRows)}
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

HelixTableGeneric.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  rows: PropTypes.instanceOf(Array).isRequired,
  setColumns: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  initialOrderBy: PropTypes.string,
  toggleSearch: PropTypes.bool,
  showAddColumn: PropTypes.bool,
  showAddRow: PropTypes.bool,
  deleteColumnOption: PropTypes.bool,
  editColumnOption: PropTypes.bool,
  editableRows: PropTypes.bool
}

HelixTableGeneric.defaultProps = {
  initialOrderBy: '',
  toggleSearch: true,
  showAddColumn: true,
  showAddRow: true,
  deleteColumnOption: true,
  editColumnOption: true,
  editableRows: true
}

export default HelixTableGeneric
