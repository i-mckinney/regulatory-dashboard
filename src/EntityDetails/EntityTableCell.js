import React, { useState } from "react"
import PropTypes from "prop-types"

/**
 * @param {string} value string represents table data cell value from Cell object property
 * @returns {JSX} renders a custom table data cell
 */
const EntityTableCell = ({ value: initialStateValue }) => {
  /**
   * 1) value will be data from props you get from Cell object property
   * 2) currentStateValue will be data to modified the existing value data
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

  // Saves the text input, displays current state edited text input, and hide rest of the identifier tags
  /// (e.g. button, span, etc...) when the save button triggers
  const handleSaveChange = (e) => {
    e.stopPropagation()
    setSaveChanges(true)
    setCurrentStateValue(value)
    setIsDivHidden(true)
    setReset("Reset")
    setEdited("-Edited")
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

  // Reset current state edited text input, hides all identifier tags, and display initial state value
  const handleResetChange = (e) => {
    e.stopPropagation()
    setCurrentStateValue("")
    setValue(initialStateValue)
    setIsDivHidden(true)
    setReset("")
    setEdited("")
  }

  // Display the initial state value
  const displayInitialStateValue = () => {
    return <div style={{ display: "inline-block" }}>{initialStateValue}</div>
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
            role="row"
            tabIndex="0"
          >
            {reset}
          </span>
        </div>
      )
    }
    return <div />
  }

  // Display the customized form with input text box and save/cancel button
  const displayCustomizedForm = () => {
    return (
      <div hidden={isDivHidden}>
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
}

export default EntityTableCell
