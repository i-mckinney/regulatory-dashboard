import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import Button from './Button'

// Styling used for MaterialUI
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#e8edec',
    margin: '.25rem',
    '&.expanded': {
      maxHeight: '64px',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  summary: {
    flexGrow: 'inherit',
    padding: '0.5rem',
    display: 'flex',
  },
  summaryContent: {
    flexGrow: 'inherit',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    display: 'inline-block',
    padding: '0.5rem',
  },
  newKey: {
    width: '50%'
  },
  actions: {
    justifyContent: 'center'
  },
  warning: {
    fontStyle: 'italic',
    fontSize: '.9rem'
  }
}));

/**
* @param {func} addKey function passed from parent to update keys in collection
* @return {JSX} React accordion component that allows for adding keys to a collection
*/
const AddMissingKey = ({addKey}) => {
  // Creates an object for styling. Any className that matches the key in classes object will have a corresponding styling
  const classes = useStyles();
  // State of checkbox component
  const [checked, setChecked] = useState(false);
  // State of Accordion component, expands or collapses component
  const [expanded, setExpanded] = useState(false);
  // State of input value of the text field for adding a new key
  const [inputValue, setInputValue] = useState('')

  /**
   * Handle action of clicking on accordion header
   */
  const handleClick = () => {
    setChecked(false)
    setInputValue('')
    setExpanded(!expanded)
  }

  /**
   * Handles checkbox action
   */
  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  /**
   * Collapses accordion and resets input value of text field
   */
  const handleCancel = () => {
    setInputValue('')
    setExpanded(false);
  }

  /**
   * Handle change in text field input
   */
  const handleInputValueChange = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }
  
  /**
   * Sends inputValue to parent component to add key, collapses accordion and resets states
   */
  const handleSave = () => {
    addKey(inputValue)
    setInputValue('')
    setExpanded(false)
  }

  return (
    <div>
      <Accordion className={classes.root} expanded={expanded}>
        <AccordionSummary
          className={classes.summary}
          classes = {{content: classes.summaryContent}}
          expandIcon={<ExpandMoreIcon />}
          onClick={handleClick}
          aria-controls="panel-header"
          id="panel-header"
          >
            <Typography className={classes.heading}>Add Missing Key</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography color="textPrimary" className={classes.warning}>
            <ErrorOutlineOutlinedIcon className={classes.icon}/> 
            New written key will be added to global normalization table. Do you want to confirm?
          </Typography> 
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="checkbox"
                  color="primary"/>
              }
              label="Confirm"/>
            <TextField 
              className={classes.newKey} 
              disabled={!checked} 
              id="AddNewKey" 
              value={inputValue}
              onChange={handleInputValueChange}
              label="New Key" /> 
          </div>
        </AccordionDetails>
        <AccordionActions className= {classes.actions}> 
          <Button onClick={handleSave} color="primary" text="Save"  size='small'/>
          <Button onClick={handleCancel} color="default" text="Cancel" size='small' />
        </AccordionActions>
      </Accordion>
    </div>
  )
}

export default AddMissingKey