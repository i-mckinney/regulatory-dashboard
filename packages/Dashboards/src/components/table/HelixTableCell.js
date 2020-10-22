import React, { useState } from 'react'
import { makeStyles, Radio, TableCell } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types'

// Styling used for MaterialUI
const entityTableCellStyles = makeStyles(() => ({
  initialState: {
    display: 'inline-block',
  },
  modifiedInitialState: {
    fontSize: '0.75rem',
    display: 'inline-block',
  },
  initialCell: {
    outline: 'none',
    '& input:focus': {
      outline: 'none',
    },
  },
  editedCell: {
    outline: 'none',
    '& input:focus': {
      outline: 'none',
    },
    backgroundColor: 'orange',
  },
  errorCell: {
    outline: 'none',
    '& input:focus': {
      outline: 'none',
    },
    backgroundColor: '#ffbcbb',
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
  },
  matIconSpan: {
    display: 'block',
  },
  selectedRadio: {
    color: 'green',
  },
}))

/**
 * @param {string} value string represents table data cell value from Cell object property
 * @param {array} sourceOfTruthData array represents the array of original source of truth to compare with
 * @param {array} matchesToSoT matchesToSoT is an array of boolean that represents matches value to the source of truth
 * @param {func} handleSourceOfTruth handleSourceOfTruth is a func comes from parent component, once it is invoke, it will save new source and true value
 * @param {int} rowIndex index of the current row
 * @param {int} columnIndex index of the current column
 * @param {array} columns array of columns
 * @param {func} editData func comes from parent component, once it is invoke, it will pass the data back to parent component to edit data
 * @param {bool} editable represents whether this cell is editable or not
 * @param {bool} containActions represents whether this cell contains actions or not
 * @param {func} displayActions displays jsx object of actions
 * @returns {JSX} renders a custom table data cell
 */
const EntityTableCell = ({
  value: initialStateValue,
  sourceOfTruthData,
  matchesToSoT,
  handleSourceOfTruth,
  saveData,
  saveRadioData,
  rowIndex,
  columnIndex,
  columns,
  editData,
  editable,
  containActions,
  displayActions,
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

  // Creates an object for styling. Any className that matches key in the entityTableCellClasses object will have a corresponding styling
  const entityTableCellClasses = entityTableCellStyles();

  // Text input can be typed in the input tag, when keyboard event is trigger
  const handleInputChange = (e) => {
    setValue(e.target.value)
  }
  
  /**
   * @returns {int} return current cell index in 1-dimension array
   * */ 
  const cellIndex = () => {
    let colIndex = columnIndex
    const currentRowIndex = rowIndex
    const index = (columns.length-1) * currentRowIndex + colIndex-1
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
    saveData(rowIndex, columnIndex, true, initialStateValue, value, sourceOfTruthData[rowIndex].trueValue === value)
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
    saveData(rowIndex, columnIndex, false, initialStateValue, value, sourceOfTruthData[rowIndex].trueValue === value)
  }

  // If there is not editable data shown, return intial-state
  // else there is editable data shown, return modified-initial-state
  const initialState = () => {
    if (!saveChanges) {
      return entityTableCellClasses.initialState
    }
    return entityTableCellClasses.modifiedInitialState
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
          <CheckCircleIcon className={entityTableCellClasses.editedIcon} />
          <ReplayIcon 
          className={entityTableCellClasses.undoIcon}
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
          <span className={entityTableCellClasses.matIconSpan}>
            <IconButton className={entityTableCellClasses.matButton} aria-label="save" type="button" onClick={handleSaveChange}>
              <SaveIcon className={entityTableCellClasses.matIcon} />
            </IconButton>
            <IconButton className={entityTableCellClasses.matButton} aria-label="clear" type="button" onClick={handleCancelChange}>
              <ClearIcon className={entityTableCellClasses.matIcon}/>
            </IconButton>
          </span>
        </div>
      )
    }
    return null
  }

  // If changes are made, display background color for that cell 'orange'
  // otherwise, display regular state of the cell
  const cellState = () => {
    if (saveChanges) {
      return entityTableCellClasses.editedCell
    }
    else if (sourceOfTruthData[rowIndex].trueValue !== initialStateValue && initialStateValue !== "") {
      return entityTableCellClasses.errorCell
    }
    return entityTableCellClasses.initialCell
  }

  const isRadioSelected = () => {
    handleSourceOfTruth(rowIndex, columns[columnIndex].Accessor, currentStateValue || initialStateValue)
    saveRadioData(rowIndex, columns[columnIndex].Accessor, currentStateValue || initialStateValue)
  }

  // displayTableCell return jsx object of editable table cell or non-editable table cell
  const displayTableCell = () => {
    if (editable) {
      return (
        <TableCell 
          className={cellState()}
          onClick={handleDivChange}
          onKeyDown={handleDivChange}
          role="row"
          tabIndex="0"
        >
          <Radio 
          className={entityTableCellClasses.selectedRadio} 
          disabled={initialStateValue === ""}
          checked={
            initialStateValue === sourceOfTruthData[rowIndex].trueValue 
            && 
            columns[columnIndex].Accessor === sourceOfTruthData[rowIndex].source
          }
          size="small" 
          color="default" 
          onClick={isRadioSelected} 
          />
          {displayInitialStateValue()}
          {displayCurrentStateChanges()}
          {displayCustomizedForm()}
        </TableCell>
      )
    } else if (containActions) {
      return (
        <TableCell>
          {displayActions()}
        </TableCell>
      )
    } else {
      return (
        <TableCell>
          {displayInitialStateValue()}
        </TableCell>
      )
    }
  }

  return (
    <>
    {displayTableCell()}
    </>
  )
}

EntityTableCell.propTypes = {
  handleSourceOfTruth: PropTypes.func.isRequired,
  matchesToSoT: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  editData: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  containActions: PropTypes.bool.isRequired,
  displayActions: PropTypes.func.isRequired,
}

EntityTableCell.defaultProps = {
  value: "",
  sourceOfTruthData: [],
  matchesToSoT: [],
  handleSourceOfTruth: () => null,
  rowIndex: 0,
  columnIndex: 0,
  columns: [],
  editData: () => null,
  editable: false,
  containActions: false,
  displayActions: () => null,
}

export default EntityTableCell
