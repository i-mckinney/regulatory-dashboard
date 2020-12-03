import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {HelixButton, Notification, ConfirmDialogModal } from "helixmonorepo-lib";
import HelixTableGeneric from "../table/HelixTableGeneric"
import HelixTableCellGeneric from "../table/HelixTableCellGeneric"
import {
    StylesProvider,
    makeStyles,
  } from "@material-ui/core";

// Styling used for MaterialUI
const tableStyles = makeStyles(() => ({
    mediumContainer: {
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
  }));

const mockData =[ 
    {
        _id: uuidv4(),
        Row: "1",
        FieldCode:'H1',
        FieldName:'',
        Actions:''
    },
    {
        _id: uuidv4(),
        Row: '2',
        FieldCode:'H2',
        FieldName:'MasterID',
        Actions:''
    },
]
const columnLabels = ["_id", "Row", "Field Code", "Field Name", "Actions"]
const initialColumns = columnLabels.map((col)=>{
  return ({ 
    Label: col,
    Accessor: col.replace(/\s+/g, '')
  })
})

/** @return {JSX} Report Template Create Table 
 * routed at /report/create
 * @param {func} sendTableData sends table data to parent component
 */
const  ReportTemplateCreateTable = ({sendTableData}) => {
  const tableClasses = tableStyles()

  // Sets state of confirm Dialog window used for editing/deleting a row
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: 'Are you sure you want to delete this row?', subTitle: '', confirmText: 'Yes', cancelText: 'Cancel'})

  //Set state of notification in response to a button action
  const [notification, setNotification] = useState({isOpen: false, message: 'Successfully deleted row', type: 'success'}) 

  //Set state of header notification in response to a button action
  const [headerNotification, setHeaderNotification] = useState({isOpen: false, message: '', type: ''}) 

  // rows will (eventually) store values from GET Method fetch via Rest API
  const [rows, setRows] = useState(mockData);

  // columns will store column header that we want to show in the front end
  const [columns, setColumns] = useState(initialColumns);

  //Keeps track of new columns added to avoid repeated names
  const [newColumnCount, setNewColumnCount] = useState(1) 

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
    newColumns.splice(newColIndex,0, {Label: newColumnLabel , Accessor: newColumnAccessor})
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
    setNotification({
      ...notification,
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
    const idColumn= [{ Label: "_id", Accessor: "_id" }]
    const newHeaders = idColumn.concat(updatedHeaders)
    setColumns(newHeaders)
    const updatedRows = updateRowKeys(newAccessor, oldAccessor)
    setRows(updatedRows)
  }

  /** 
   * Gets notification data from action on headers/columns and sets it to state hook
   * @param {Object} currentHeaderNotification Object containing information to set header notification to
   */
  const getHeaderNotification = (currentHeaderNotification) => {
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
      <span className={tableClasses.actionsIconStyle}>
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
      <span className={tableClasses.createRowColStyle}>
        <HelixButton text="Add Row"  color="primary"  onClick={addRow} />
        <HelixButton text="Add Column"  color="primary"  onClick={addCol} />
      </span>
    );
  };

  return (
    <StylesProvider injectFirst>
        <div className={tableClasses.mediumContainer}>  
            <HelixTableGeneric 
                toggleSearch={true} 
                columns={columns.slice(1)}
                rows={rows} 
                displayCreateIcon={displayCreateRowColButton}
                customCellRender={customCellRender}
                customHeadColumnKeyProp={customHeadColumnKeyProp}
                customBodyRowKeyProp={customBodyRowKeyProp}
                saveHeaderData={saveHeaderData}
                headerNotification={getHeaderNotification}
            />   
            {sendTableData(rows, columns)}
            <ConfirmDialogModal confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            <Notification notification={notification} setNotification={setNotification} />
            <Notification notification={headerNotification} setNotification={setHeaderNotification} />
        </div>
    </StylesProvider>
  ) 
 }
 
 export default withRouter(ReportTemplateCreateTable)