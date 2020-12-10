import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Controls from './Controls'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

// Styling used for MaterialUI
const useStyles = makeStyles((theme) => ({
  popover: {
    maxWidth: 'calc(50% - 32px)',
    minHeaight: '200px'
  },
  typography: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  radio: {
    marginLeft: "0.5rem",
    '&:hover': {
      backgroundColor: '#add8e6',
    },
  },
  radioGroup: {
    zIndex: "0",
  },
  header: {
    position: 'sticky',
    top: '0',
    zIndex: '3',
    background: 'white',
    boxShadow: '0 4px 2px -2px grey'
  },
  buttonGroup: {
    zIndex: '2',
    position: 'sticky',
    bottom: '0',
    textAlign: 'center',
    background:'white',
    boxShadow: 'inset 0 2px 4px -2px grey'
  },
  headerGrid: {
    justifyContent: 'center'
  },
}));

/**
* @return {JSX} React Popup component to allow user to set a key value
*/
const SelectValuePopup = (props) => {
/** 
* title: String - title displayed at the top of the popup
* options: Array - Array of strings to choose key value from
* id: String - Id of Key/Value row being edited
* onClose: Function - handles closing of popup and passes selected value to parent component
* open: State Variable (boolean) - Determines if popup is open or not
* anchorEl: State Variable (event target) - Element to anchor popup to  
* addCollectionKey: Function passed from parent component to update collection keys
**/
  let { title, options, id, onClose, open, anchorEl, addCollectionKey } = props;
  // Selected value in radio button group
  const [value, setValue] = useState('')
  // Text input of search field
  const[input, setInput] = useState('')

  // Creates an object for styling. Any className that matches the key in classes object will have a corresponding styling
  const classes = useStyles();

  /**
   * Closes popup and resets state variables
   */
  const handleClose = () => {
    setValue('')
    setInput('')
    onClose();
  };

  /**
   * Handles change in radio button selection
   **/
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  /**
   * Handles confirmation of selection - passes selected value to parent via onClose function...
   * ... resets states and closes popup 
   */
  const handleOk = () => {
    onClose(value)
    setValue('')
    setInput('')
  };

  /**
   * Handles changes in search bar input
   */
  const handleSearch = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  //Check if searchbar is being used
  if (input.length>0){
    options = options.filter((option)=> {
     return (option.match(input))
    })
  }

  return (
    <div>
      <Popover
        classes = {{paper: classes.popover}}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.header}>
          <Typography className={classes.typography}>{title}</Typography>
           <Grid container spacing ={1} className= {classes.headerGrid}>
             <Grid item xs={5}>           
              <Controls.Input
                label='Search'
                defaultValue={input}
                width={true}
                padding={true}
                value={input}
                InputProps={{
                    placeholder: 'Search for Key Value',
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                onChange={handleSearch}>
              </Controls.Input>
            </Grid>
            <Grid item xs={7}>
              <Controls.AddMissingKey addKey = {addCollectionKey} />
            </Grid> 
          </Grid>
        </div>
        <RadioGroup
          aria-label="values"
          name="collectionValues"
          value={value}
          onChange={handleChange}
          className={classes.radioGroup}
        >
          {options.map((option) => (
            <FormControlLabel className={classes.radio} value={option} key={option} control={<Radio/>} label={option} />
          ))}
          {options.length === 0 ? 
           <Typography className={classes.typography}>No Matches</Typography>
            : null 
          }
        </RadioGroup>
        <div className={classes.buttonGroup}> 
          <Controls.Button onClick={handleOk} color="primary" text="Ok"  size='small'/>
          <Controls.Button onClick={handleClose} color="default" text="Cancel" size='small' />
        </div>
      </Popover>
    </div>
  );
}

export default  SelectValuePopup