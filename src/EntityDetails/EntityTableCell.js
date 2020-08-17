import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const EntityTableCell = ({ value: initialValue }) => {
  const [value, setValue] = useState(initialValue)
  const [isHidden, setIsHidden] = useState(true)
  const [saveChanges, setSaveChanges] = useState(false)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleSaveChange = (e) => {
    e.stopPropagation()
    setSaveChanges(true)
    setIsHidden(true)
  }

  const handleCancelChange = (e) => {
    e.stopPropagation()
    setIsHidden(true)
  }

  const handleDivChange = () => {
    // setSaveChanges(false)
    setIsHidden(false)
  }

  return (
    <div
      onClick={handleDivChange}
      onKeyDown={handleDivChange}
      role="row"
      tabIndex="0"
    >
      {initialValue}
      <div style={{ display: saveChanges ? "block" : "none" }}>{value}</div>
      <div hidden={isHidden}>
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
