import React, { useState } from "react"
import { makeStyles } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from "prop-types"

const useStyles = makeStyles({
  initialState: {
    display: 'inline-block',
  },
  modifiedInitialState: {
    fontSize: '0.75rem',
    display: 'inline-block',
  },
  editedField: {
    outline: 'none',
    '& input:focus': {
      outline: 'none',
    }
  },
  editedIcon: {
    fontSize: '1rem',
    color: 'green',
  },
  undoIcon: {
    fontSize: '1rem',
    color: 'red',
    cursor: 'pointer',
    float: 'right',
    '&:focus': {
      outline: 'none',
    }
  },
  matButton: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    '&:focus': {
      outline: 'none',
    }
  },
  matIcon: {
    fill: 'black',
  }
})
/**
 * @param {string} value string represents table data cell value from Cell object property
 * @param {object} cell object represents current row and current column properties
 * @param {array} allColumns array of columns
 * @param {func} editData func comes from parent component, once it is invoke, it will pass the data back to parent component to edit data
 * @returns {JSX} renders a custom table data cell
 */
const EntityTableCell = ({
  value: initialStateValue,
  cell,
  allColumns,
  editData,
}) => {
  /**
   * 1) value will be data from props you get from Cell object property
   * 2) currentStateValue is a editable value data to display
   * 3) isDivHidden is a boolean to check whether div is hidden or not
   * 4) saveChanges is a boolean to check whether changes are saved
   * */
  const [value, setValue] = useState(initialStateValue)
  const [currentStateValue, setCurrentStateValue] = useState(value)
  const [isDivHidden, setIsDivHidden] = useState(true)
  const [saveChanges, setSaveChanges] = useState(false)

  const classes = useStyles();

  // Text input can be typed in the input tag, when keyboard event is trigger
  const handleInputChange = (e) => {
    setValue(e.target.value)
  }
  
  /**
   * @returns {int} return current cell index in 1-dimension array
   * */ 
  const cellIndex = () => {
    let colIndex = -1
    allColumns.forEach((column, index) => {
      if (column.Header === cell.column.Header) {
        colIndex = index
      }
    })
    const currentRowIndex = cell.row.index
    const index = (allColumns.length-1) * currentRowIndex + colIndex-1
    return index
  }

  // Saves the text input, displays current state edited text input, hide rest of the identifier tags
  // (e.g. button, span, etc...), send the data to parent component when the save button triggers
  const handleSaveChange = (e) => {
    e.stopPropagation()
    setSaveChanges(true)
    setCurrentStateValue(value)
    setIsDivHidden(true)
    const currentCellIndex = cellIndex()
    editData(currentCellIndex, true, value)
  }

  // Hides all identifier tags (e.g. button, div, span) when cancel button triggers
  const handleCancelChange = (e) => {
    e.stopPropagation()
    setIsDivHidden(true)
  }

  // Unhides all identifier tags (e.g. button, div, span) when particular cell div triggers
  const handleDivChange = () => {
    setIsDivHidden(false)
  }

  // Reset current state edited text input, hides all identifier tags, display initial state value,
  // send the data to parent component when the reset triggers
  const handleResetChange = (e) => {
    e.stopPropagation()
    setCurrentStateValue("")
    setValue(initialStateValue)
    setIsDivHidden(true)
    setSaveChanges(false)
    const currentCellIndex = cellIndex()
    editData(currentCellIndex, false, "")
  }

  // If there is not editable data shown, return intial-state
  // else there is editable data shown, return modified-initial-state
  const initialState = () => {
    if (!saveChanges) {
      return classes.initialState
    }
    return classes.modifiedInitialState
  }

  // Display the initial state value
  const displayInitialStateValue = () => {
    return <div className={initialState()}>{initialStateValue}</div>
  }

  // Display current state value of edited changes
  const displayCurrentStateChanges = () => {
    if (saveChanges) {
      return (
        <div>
          {currentStateValue}
          <CheckCircleIcon className={classes.editedIcon} />
          <ReplayIcon 
          className={classes.undoIcon}
          onClick={handleResetChange}
          onKeyDown={handleResetChange}
          role="button"
          tabIndex="0"/>
        </div>
      )
    }
    return null
  }

  // Display the customized form with input text box and save/cancel button
  const displayCustomizedForm = () => {
    if (!isDivHidden) {
      return (
        <div>
          <input type="text" value={value} onChange={handleInputChange} />
          <span>
            <IconButton className={classes.matButton} aria-label="save" type="button" onClick={handleSaveChange}>
              <SaveIcon className={classes.matIcon} />
            </IconButton>
            <IconButton className={classes.matButton} aria-label="clear" type="button" onClick={handleSaveChange}>
              <ClearIcon className={classes.matIcon}/>
            </IconButton>
            {/* <button className={classes.matButton} type="button" onClick={handleSaveChange}>
              <Icon >save</Icon>
            </button> */}
            {/* <button className={classes.matButton} type="button" onClick={handleCancelChange}>
              <Icon>clear</Icon>
            </button> */}
          </span>
        </div>
      )
    }
    return null
  }

  return (
    <div
      className={classes.editedField}
      onClick={handleDivChange}
      onKeyDown={handleDivChange}
      role="row"
      tabIndex="0"
    >
      {displayInitialStateValue()}
      {displayCurrentStateChanges()}
      {displayCustomizedForm()}
    </div>
  )
}

EntityTableCell.propTypes = {
  value: PropTypes.string.isRequired,
  cell: PropTypes.oneOfType([PropTypes.object]).isRequired,
  allColumns: PropTypes.instanceOf(Array).isRequired,
  editData: PropTypes.func.isRequired,
}

export default EntityTableCell
