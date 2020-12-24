import React, { useState }  from "react"
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from "@material-ui/icons/Delete";
import HelixTextField from '../../../HelixTextField/index'
import ConfirmDialogModal from '../../../ConfirmDialogModal/index'
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from "@material-ui/core"
import PropTypes from "prop-types"

// Styling used for MaterialUI
const helixTableHeadStyles = makeStyles(() => ({
  sortLabel: {
    color: "white!important",
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  matButton: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  matIcon: {
    fill: 'black',
    '& button': {
      marginRight: 'unset'
    }
  },
  helixInput: {
    marginTop: '16px',
  },
  matIconSpan: {
    display: 'block',
    float: 'right',
  },
  matHeaderIcon: {
    float: 'right',
    color: 'white',
    '& button': {
      marginRight: 'unset'
    },
  },
  headerCell: {
    textAlign: 'left',
  },
  headerCellActions: {
    textAlign: 'center'
  }
}))

/**
 * @param {array} columns  array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {func} customHeadColumnKeyProp func represents custom function that return key props for table row in table head (required)
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents which column should it order by
 * @param {func} onSort func that sort the table by column either ascending or descending order
 * @param {bool} toggleSearch bool represents true or false if table should have a search function
 * @param {func} saveHeaderData func that allows header data to be saved and pass to next component
 * @param {func} saveNotificationData func that allows header notification data to be passed up to parent
 * @returns {JSX} renders a custom table head for table
 */
const HelixTableHeadGeneric = ({ 
  columns, 
  customHeadColumnKeyProp, 
  order, 
  orderBy, 
  onSort, 
  toggleSearch, 
  saveHeaderData, 
  saveNotificationData,
  deleteColumnOption,
  editColumnOption
 }) => {

// isDivHidden is a boolean to check whether div is hidden or not
  const [isDivHidden, setIsDivHidden] = useState(true)
  // Sets state of input text field value (used for editing column names)
  const [value, setValue] = useState('')
  // columns/headers to be used in Table Head
  const [stateColumns, setStateColumns] = useState(columns)
  // State hook to keep track of which column is being edited
  const [columnToChange, setColumnToChange] = useState('')
  // Sets state of confirm Dialog window used for editing/deleting a request
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: 'Are you sure you want to delete this column?', subTitle: '', confirmText: 'Yes', cancelText: 'Cancel'})

  if(columns.length !== stateColumns.length) {
      setStateColumns(columns)
  }

  // Creates an object for styling. Any className that matches key in the helixTableHeadStyles object will have a corresponding styling
  const helixTableHeadClasses = helixTableHeadStyles()

  /**
   * @param {string} column the column represents object containing headers
   * it passes the column header property back up to parent component to sort
   */
  const createSortHandler = (column) => () => {
    onSort(customHeadColumnKeyProp(column))
  }

  /**
   * @return true if current order by is current column identifier else turn off active sorting
   */
  const isActive = (orderBy, column) => {
    return orderBy === customHeadColumnKeyProp(column)
  }

  /**
   * @return the ascending order when clicked on a new column to order by otherwise descending order on the same column that we are at    
   */
  const orderByDirection = (order, orderBy, column) => {
    return orderBy === customHeadColumnKeyProp(column) ? order : 'asc'
  }

  // Text input can be typed in the input tag, when keyboard event is trigger
  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  // Saves the text input, displays current state edited text input, hide rest of the identifier tags
  // (e.g. button, span, etc...), send the data to parent component when the save button triggers
  const handleSaveChange = (column, e) => {
    e.stopPropagation()
    const newHeader = {Label: value, Accessor: value.replace(/\s+/g, '')}

    if(stateColumns.some(col => col.Accessor === newHeader.Accessor)) {
      const errorNotification = { 
         message: 'Column name already exists. Please enter different name',
         type: 'error',
         isOpen: true
      }
      saveNotificationData(errorNotification) 
      return null
    }
     
    const updatedHeaders = stateColumns.map((col) => {
        return (col.Accessor === column.Accessor) ? newHeader : col
    })
    setStateColumns(updatedHeaders)
    setIsDivHidden(true)
    saveHeaderData(updatedHeaders,newHeader.Accessor,columnToChange.Accessor)
    setColumnToChange('')
    setValue('')
  }

  // Hides all identifier tags (e.g. button, div, span) when cancel button triggers
  const handleCancelChange = (e) => {
    e.stopPropagation()
    setIsDivHidden(true)
    setColumnToChange('')
    setValue('')
  }

  // Unhides all identifier tags (e.g. button, div, span) when particular cell div triggers
  const handleDivChange = (column) => {
    setColumnToChange(column)
    setIsDivHidden(false)
  }

  const handleDelete = (column)=>{
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      const updatedHeaders = [...stateColumns].filter(stateColumn => stateColumn.Label !== column.Label)
      setStateColumns(updatedHeaders)
      saveHeaderData(updatedHeaders,column.Accessor,column.Accessor)

      const successNotification = { 
        isOpen: true,
        message: 'Successfully deleted column',
        type: 'success'
      }
      saveNotificationData(successNotification) 
  }

  // Display the customized form with input text box and save/cancel button
  const displayCustomizedForm = (column) => {
    if (!isDivHidden && (column.Label === columnToChange.Label)) {
      return (
        <div>
          <HelixTextField className={helixTableHeadClasses.helixInput} value={value} onChange={handleInputChange} label="Value" fullWidth/>
          <span className={helixTableHeadClasses.matIconSpan}>
            <IconButton className={helixTableHeadClasses.matButton} aria-label="save" type="button" onClick={(e)=>handleSaveChange(column,e)}>
              <SaveIcon className={helixTableHeadClasses.matIcon} />
            </IconButton>
            <IconButton className={helixTableHeadClasses.matButton} aria-label="clear" type="button" onClick={handleCancelChange}>
              <ClearIcon className={helixTableHeadClasses.matIcon}/>
            </IconButton>
          </span>
        </div>
      )
    }
    return null
  }

  /**
   * 
   * @param {object} column the column is an object that contains header label and header accessor
   * @return {jsx} return a jsx sortable column label or regular column label
   */
  const renderTableSortLabel = (column) => {
    return (
      column.Sortable ? <TableSortLabel
      className={helixTableHeadClasses.sortLabel}
      active={isActive(orderBy, column)}
      direction={orderByDirection(order, orderBy, column)}
      onClick={createSortHandler(column)}
      >
        {column.Label}
        {orderBy === customHeadColumnKeyProp(column) ? (
        <span className={helixTableHeadClasses.visuallyHidden}>
          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
        </span>
        ) : null}
      </TableSortLabel>
      : column.Label
    )
  }

  const RenderColumnActions = (column) => {
    return (
      <span>
      {deleteColumnOption ? 
        <IconButton className={helixTableHeadClasses.matHeaderIcon} aria-label="edit" size="small" edge="start" 
          onClick={()=>{
            setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            onConfirm: ()=>{handleDelete(column)}
            })
          }}
        > 
          <DeleteIcon/>
        </IconButton>
        : null
       }
       {editColumnOption ?  
          <IconButton className={helixTableHeadClasses.matHeaderIcon} aria-label="edit" size="small" edge="start" onClick={()=>handleDivChange(column)}> 
            <EditIcon/>
          </IconButton>
          : null
        }
        {displayCustomizedForm(column)}
        </span>
    )
  }

  return (
    <>
      <TableHead>
        <TableRow>
          {stateColumns.map((column) => (
            <TableCell 
              className={column.Label !=='Actions' ? helixTableHeadClasses.headerCell: helixTableHeadClasses.headerCellActions}
              key={customHeadColumnKeyProp(column)}
              sortDirection={orderBy === customHeadColumnKeyProp(column) ? order : false}
              > 
              {/* <span className={helixTableHeadClasses.columnLabel}> */}
              {toggleSearch ? renderTableSortLabel(column) : column.Label}
              {/* </span> */}
             { ((column.Label !=='Actions') && (column.Label !== 'Row')) ? RenderColumnActions(column) : null}
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <ConfirmDialogModal confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  )
}

HelixTableHeadGeneric.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  customHeadColumnKeyProp: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc', '']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  toggleSearch: PropTypes.bool.isRequired,
  saveHeaderData: PropTypes.func.isRequired,
  saveNotificationData: PropTypes.func.isRequired
}

HelixTableHeadGeneric.defaultProps = {
  order: '',
  orderBy: '',
  toggleSearch: false,
}

export default HelixTableHeadGeneric
