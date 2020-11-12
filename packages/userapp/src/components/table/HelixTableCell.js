import React, { useState } from 'react'
import { makeStyles, Radio, TableCell, Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ReplayIcon from '@material-ui/icons/Replay'
import SaveIcon from '@material-ui/icons/Save'
import ClearIcon from '@material-ui/icons/Clear'
import PropTypes from 'prop-types'
import { HelixTextField } from 'helixmonorepo-lib'

// Styling used for MaterialUI
const helixTableCellStyles = makeStyles(() => ({
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
  greyCell: {
    outline: 'none',
    '& input:focus': {
      outline: 'none',
    },
    backgroundColor: '#f1efef',
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
    },
  },
  matIcon: {
    fill: 'black',
    '& button': {
      marginRight: 'unset'
    }
  },
  matIconSpan: {
    display: 'block',
    float: 'right',
  },
  selectedRadio: {
    color: 'green',
  },
  editedField: {
    color: 'green',
  },
  matEditIcon: {
    '& button': {
      float: 'right',
    }
  },
  helixInput: {
    marginTop: '16px',
  },
  pWaterMark: {
    padding: '.5px',
    fontSize: '11px',
    fontWeight: 1000,
    color: '#555555',
  }
}))

/**
 * @param {string} value string represents table data cell value from Cell object property
 * @param {int} rowIndex index of the current row
 * @param {int} columnIndex index of the current column
 * @param {array} columns array of columns
 * @param {bool} editable represents whether this cell is editable or not
 * @param {bool} containActions represents whether this cell contains actions or not
 * @param {func} displayActions displays jsx object of actions
 * @param {func} saveEntityData func that allow data to be saved and pass to next component
 * @param {func} saveRadioData func that save radio button data selected
 * @param {string} source string that represents column value
 * @param {string} sourceTrueValue string that represents value of the selected cell
 * @param {array} externalValues array of external values from source system
 * @returns {JSX} renders a custom HelixTableCell
 */
const HelixTableCell = ({
  value: initialStateValue,
  rowIndex,
  columnIndex,
  columns,
  editable,
  containActions,
  displayActions,
  saveEntityData,
  saveRadioData,
  source,
  sourceTrueValue,
  externalValues,
}) => {
  /**
   * 1) value will be data from props you get from Cell object property
   * 2) currentStateValue is a editable value data to display
   * 3) isDivHidden is a boolean to check whether div is hidden or not
   * 4) saveChanges is a boolean to check whether changes are saved
   * */
  const [value, setValue] = useState(initialStateValue)
  const [currentStateValue, setCurrentStateValue] = useState(value === 'NULL' ? '' : value)
  const [isDivHidden, setIsDivHidden] = useState(true)
  const [saveChanges, setSaveChanges] = useState(false)

  // Creates an object for styling. Any className that a key in the helixTableCellStyles object will have a corresponding styling
  const helixTableCellClasses = helixTableCellStyles();

  // Text input can be typed in the input tag, when keyboard event is trigger
  const handleInputChange = (e) => {
    setValue(e.target.value)
  }
  
  // Saves the text input, displays current state edited text input, hide rest of the identifier tags
  // (e.g. button, span, etc...), send the data to parent component when the save button triggers
  const handleSaveChange = (e) => {
    e.stopPropagation()
    setSaveChanges(true)
    setCurrentStateValue(value)
    setIsDivHidden(true)
    saveEntityData(rowIndex, columnIndex, true, initialStateValue, value, sourceTrueValue === value, source)
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
    saveEntityData(rowIndex, columnIndex, false, initialStateValue, value, sourceTrueValue === value, source)
  }

  // If there is not editable data shown, return intial-state
  // else there is editable data shown, return modified-initial-state
  const initialState = () => {
    if (!saveChanges) {
      return helixTableCellClasses.initialState
    }
    return helixTableCellClasses.modifiedInitialState
  }
  // Display the initial state value
  const displayInitialStateValue = () => {
    return (
      <div onClick={handleDivChange} className={initialState()}>
        {initialStateValue}
      </div>
    )
  }

  // Display the external value that exist in that source system
  const displayExternalValue = () => {
    const initialValue = initialStateValue === 'NULL' ? '' : initialStateValue
    if (externalValues[rowIndex][columnIndex-1] !== initialValue) {
      return (
        `External Value Received: ${externalValues[rowIndex][columnIndex-1]}`
      )
    }
    return null
  }

  // Display current state value of edited changes
  const displayCurrentStateChanges = () => {
    if (saveChanges) {
      return (
        <div>
          <span className={helixTableCellClasses.editedField} onClick={handleDivChange}>{currentStateValue}</span>
          <CheckCircleIcon className={helixTableCellClasses.editedIcon} />
          <ReplayIcon 
          className={helixTableCellClasses.undoIcon}
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
          <span>{displayExternalValue()}</span>
          <HelixTextField className={helixTableCellClasses.helixInput} value={value} onChange={handleInputChange} label="Value" fullWidth/>
          <span className={helixTableCellClasses.matIconSpan}>
            <IconButton className={helixTableCellClasses.matButton} aria-label="save" type="button" onClick={handleSaveChange}>
              <SaveIcon className={helixTableCellClasses.matIcon} />
            </IconButton>
            <IconButton className={helixTableCellClasses.matButton} aria-label="clear" type="button" onClick={handleCancelChange}>
              <ClearIcon className={helixTableCellClasses.matIcon}/>
            </IconButton>
          </span>
        </div>
      )
    }
    return null
  }

  // Display character 'p' when proposed value is introduce by user input from previous discrepancy report submission
  const proposedWaterMark = () => {
    if (initialStateValue !== externalValues[rowIndex][columnIndex-1] && initialStateValue !== "NULL") {
      return (
        <span className={helixTableCellClasses.pWaterMark}>p</span>
      )
    }
    return null
  }

  // If changes are made, display background color for that cell 'orange'
  // otherwise, display regular state of the cell
  const cellState = () => {
    if (saveChanges) {
      return helixTableCellClasses.editedCell
    }
    else if (initialStateValue === "NULL") {
      return helixTableCellClasses.greyCell
    }
    else if (sourceTrueValue !== initialStateValue && initialStateValue !== "NULL") {
      return helixTableCellClasses.errorCell
    }
    return helixTableCellClasses.initialCell
  }

  // selectedRadio saves the selected radio button data with its source and value
  const selectedRadio = () => {
    saveRadioData(rowIndex, columns[columnIndex].customApiId, currentStateValue || initialStateValue)
  }

  // displayTableCell return jsx object of editable table cell or non-editable table cell
  const displayTableCell = () => {
    if (editable) {
      return (
        <TableCell 
          className={cellState()}
          role="row"
          tabIndex="0"
          style={{ minWidth: 175 }}
        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid>
              <Radio 
              className={helixTableCellClasses.selectedRadio} 
              disabled={initialStateValue === "NULL"}
              checked={
                (currentStateValue || initialStateValue) === sourceTrueValue 
                && 
                columns[columnIndex].customApiId === source
              }
              size="small" 
              color="default" 
              onClick={selectedRadio} 
              />
            </Grid>
            <Grid>
              {displayInitialStateValue()}
              {proposedWaterMark()}
            </Grid>
          </Grid>
          {displayCurrentStateChanges()}
          {displayCustomizedForm()}
        </TableCell>
      )
    } else if (containActions) {
      return (
        <TableCell className={helixTableCellClasses.initialCell}>
          {displayActions()}
        </TableCell>
      )
    } else {
      return (
        <TableCell className={helixTableCellClasses.initialCell}>
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

HelixTableCell.propTypes = {
  value: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  editable: PropTypes.bool.isRequired,
  containActions: PropTypes.bool.isRequired,
  displayActions: PropTypes.func.isRequired,
  saveEntityData: PropTypes.func.isRequired,
  saveRadioData: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
  sourceTrueValue: PropTypes.string.isRequired,
  externalValues: PropTypes.instanceOf(Array).isRequired,
}

HelixTableCell.defaultProps = {
  value: "",
  rowIndex: 0,
  columnIndex: 0,
  columns: [],
  editable: false,
  containActions: false,
  displayActions: () => null,
  saveEntityData: () => null,
  saveRadioData: () => null,
  source: "",
  sourceTrueValue: "",
  externalValues: [],
}

export default HelixTableCell
