import { v4 as uuidv4 } from 'uuid';
/**
 * @param {string} newAccessor string to be set as new key in row object
 * @param {string} oldAccessor string of old key in row object to be deleted
 * @return {Array} returns array of row Objects with updated keys to match those of  columns
 * Can be used to delete row key if newAccessor === oldAccessor
 */
  const updateRowKeys = (newAccessor, oldAccessor, rows) => {
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
  const addColHelper = (rows, columns, newColumnCount, setNewColumnCount, setColumns, setRows) => {
  const newColumns = [...columns]
  const newColIndex = columns.length-1;
  const newColumnLabel = `New Column ${newColumnCount}`
  const newColumnAccessor = `NewColumn${newColumnCount}`
  newColumns.splice(newColIndex,0, {Label: newColumnLabel , Accessor: newColumnAccessor, Sortable: true})
  setNewColumnCount(newColumnCount+1)
  setColumns(newColumns)
  const updatedRows = updateRowKeys(newColumnAccessor, false, rows)
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
  const addRowHelper = (columns, rows, setRows) => {
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
  const handleDeleteRowHelper = (id, rows, confirmDialog, rowNotification, setRows, setConfirmDialog, setRowNotification) => {
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
  const saveRowDataHelper = (rows, rowIndex, columnAccessor, isEdited, value, setRows) => {
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
  const saveHeaderDataHelper = (rows, updatedHeaders, newAccessor, oldAccessor,setColumns, setRows) => {
  const idColumn= [{ Label: "_id", Accessor: "_id", Sortable: false }]
  const newHeaders = idColumn.concat(updatedHeaders)
  setColumns(newHeaders)
  const updatedRows = updateRowKeys(newAccessor, oldAccessor,rows)
  setRows(updatedRows)
}

/** 
 * Gets notification data from action on headers/columns and sets it to state hook
 * @param {Object} currentHeaderNotification Object containing information to set header notification to
 */
  const updateHeaderNotificationHelper = (currentHeaderNotification, setHeaderNotification) => {
  setHeaderNotification({
    isOpen: currentHeaderNotification.isOpen,
    message: currentHeaderNotification.message,
    type: currentHeaderNotification.type
  }) 
}

// export default RowColumnHelper
export default {addColHelper, addRowHelper, handleDeleteRowHelper, saveRowDataHelper, saveHeaderDataHelper, updateHeaderNotificationHelper} 