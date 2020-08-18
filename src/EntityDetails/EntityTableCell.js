import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const EntityTableCell = ({ value: initialStateValue }) => {
  const [value, setValue] = useState(initialStateValue)
  const [currentStateValue, setCurrentStateValue] = useState(value)
  const [isDivHidden, setIsDivHidden] = useState(true)
  const [saveChanges, setSaveChanges] = useState(false)
  const [isResetHidden, setIsResetHidden] = useState(true)
  const [isEditedHidden, setIsEditedHidden] = useState(true)

  useEffect(() => {
    setValue(initialStateValue)
  }, [initialStateValue])

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleSaveChange = (e) => {
    e.stopPropagation()
    setSaveChanges(true)
    setCurrentStateValue(value)
    setIsDivHidden(true)
    setIsResetHidden(false)
    setIsEditedHidden(false)
  }

  const handleCancelChange = (e) => {
    e.stopPropagation()
    setIsDivHidden(true)
  }

  const handleDivChange = () => {
    setIsDivHidden(false)
  }

  const handleResetChange = (e) => {
    e.stopPropagation()
    setCurrentStateValue("")
    setValue(initialStateValue)
    setIsDivHidden(true)
    setIsResetHidden(true)
    setIsEditedHidden(true)
  }

  return (
    <div
      onClick={handleDivChange}
      onKeyDown={handleDivChange}
      role="row"
      tabIndex="0"
    >
      <div style={{ display: "inline-block" }}>{initialStateValue}</div>
      <div style={{ display: saveChanges ? "block" : "none" }}>
        {currentStateValue}
        <span hidden={isEditedHidden}>-Edited</span>
        <span
          className="undo"
          onClick={handleResetChange}
          onKeyDown={handleResetChange}
          role="row"
          tabIndex="0"
          hidden={isResetHidden}
        >
          Reset
        </span>
      </div>
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
    </div>
  )
}

EntityTableCell.propTypes = {
  value: PropTypes.string.isRequired,
}

export default EntityTableCell
