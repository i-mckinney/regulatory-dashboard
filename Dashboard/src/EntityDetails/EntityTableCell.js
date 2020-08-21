import React, { useState } from "react"
import PropTypes from "prop-types"

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
   * 5) reset is a string to display "reset"
   * 6) edited is a string to display "edited"
   * */
  const [value, setValue] = useState(initialStateValue)
  const [currentStateValue, setCurrentStateValue] = useState(value)
  const [isDivHidden, setIsDivHidden] = useState(true)
  const [saveChanges, setSaveChanges] = useState(false)
  const [reset, setReset] = useState("")
  const [edited, setEdited] = useState("")

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
    setReset("Reset")
    setEdited("-Edited")
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
    setReset("")
    setEdited("")
    const currentCellIndex = cellIndex()
    editData(currentCellIndex, false, "")
  }

  // If there is not editable data shown, return intial-state
  // else there is editable data shown, return modified-initial-state
  const initialState = () => {
    if (!saveChanges) {
      return "initial-state"
    }
    return "modified-initial-state"
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
          <span>{edited}</span>
          <span
            className="undo"
            onClick={handleResetChange}
            onKeyDown={handleResetChange}
            role="button"
            tabIndex="0"
          >
            {reset}
          </span>
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
            <button type="button" onClick={handleSaveChange}>
              Save
            </button>
            <button type="button" onClick={handleCancelChange}>
              Cancel
            </button>
          </span>
        </div>
      )
    }
    return null
  }

  return (
    <div
      className="edited-field"
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
