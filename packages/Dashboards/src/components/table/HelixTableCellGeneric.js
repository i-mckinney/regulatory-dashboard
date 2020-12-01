import React, { useState } from 'react'
import { makeStyles,TableCell} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import { HelixTextField } from 'helixmonorepo-lib'

// Styling used for MaterialUI
const helixTableCellStyles = makeStyles(() => ({
  initialState: {
    display: 'inline-block',
  },
  modifiedInitialState: {
    display: 'inline-block',
    color: 'green',
  },
  initialCell: {
    textAlign: 'center',
    outline: 'none',
    '& input:focus': {
      outline: 'none',
    },
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
  helixInput: {
    marginTop: '16px',
  },
}))

/**
 * @param {string} value string represents table data cell value from Cell object property
 * @param {int} rowIndex index of the current row
 * @param {string} columnAccessor acessor of current column
 * @param {bool} editable represents whether this cell is editable or not
 * @param {bool} containActions represents whether this cell contains actions or not
 * @param {func} displayActions displays jsx object of actions
 * @param {func} saveEntityData func that allow data to be saved and pass to next component
 * @returns {JSX} renders a custom HelixTableCell
 */
const HelixTableCellGeneric = ({
  value: initialStateValue,
  rowIndex,
  columnAccessor,
  editable,
  containActions,
  displayActions,
  saveEntityData,
}) => {
  /**
   * 1) value will be data from props you get from Cell object property
   * 2) currentStateValue is an editable value data to display
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
    saveEntityData(rowIndex, columnAccessor, true, value)
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

  // Check if a cell was edited and saved, set style accordingly
  const cellDisplayState = () => {
    return !saveChanges ? helixTableCellClasses.initialState 
      : helixTableCellClasses.modifiedInitialState
  }

  // Display the dynamic state value (if no editable data shown returns intiial-state)
  const displayCurrentStateValue = () => {
    return (
      <div className={cellDisplayState()} onClick={handleDivChange}>
        {currentStateValue}
      </div>
    )
  }

  // Display the customized form with input text box and save/cancel button
  const displayCustomizedForm = () => {
    if (!isDivHidden) {
      return (
        <div>
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

  // displayTableCell return jsx object of editable table cell or non-editable table cell
  const displayTableCell = () => {
    if (editable) {
      return (
        <TableCell  className={helixTableCellClasses.initialCell} >
          {displayCurrentStateValue()}
            <IconButton className= {helixTableCellClasses.matIconSpan} aria-label="edit" size="small" edge="start" onClick={handleDivChange}> 
              <EditIcon/>
            </IconButton>
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
         {displayCurrentStateValue()}
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

HelixTableCellGeneric.propTypes = {
  value: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  editable: PropTypes.bool.isRequired,
  containActions: PropTypes.bool.isRequired,
  displayActions: PropTypes.func.isRequired,
  saveEntityData: PropTypes.func.isRequired,
  externalValues: PropTypes.instanceOf(Array).isRequired,
}

HelixTableCellGeneric.defaultProps = {
  value: "",
  rowIndex: 0,
  columns: [],
  editable: false,
  containActions: false,
  displayActions: () => null,
  saveEntityData: () => null,
  externalValues: [],
}

export default HelixTableCellGeneric
