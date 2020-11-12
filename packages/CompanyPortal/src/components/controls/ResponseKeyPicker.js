import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { Grid, List, Card, CardHeader, ListItem, ListItemText, Typography, ListItemIcon, Checkbox, Divider } from '@material-ui/core'
import { HelixButton } from 'helixmonorepo-lib'
// Styling used for MaterialUI
const responsePickerStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  listItem : {
    fontSize: "12px",
    display: "inline",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));
/**
 * @param {array} self the self is an array of keys that we want to have available
 * @param {array} other the other is an array of keys that is taken
 * @return the array of keys that are not taken
 */
function not(self, other) {
  return self.filter((value) => other.indexOf(value) === -1)
}
/**
 * @param {array} self the self is an array of keys that we want to have available
 * @param {array} other the other is an array of keys that is taken
 * @return the array of keys that are same through comparison of (self, other)
 */
function intersection(self, other) {
  return self.filter((value) => other.indexOf(value) !== -1)
}
/**
 * @param {array} self the self is an array of keys that we want to have available
 * @param {array} other the other is an array of keys that is taken
 * @return the array of keys from self and other (without duplicates from self array) 
 */
function union(self, other) {
  return [...self, ...not(other, self)]
}
/**
 * @param {Object} props the props contains methods and properties from parent component that will used to deliver props back up
 * @return {JSX} ResponseKeyPicker component - one textbox in left and one textbox in right where you can pick role from left to the right vice versa
 */
const ResponseKeyPicker = (props) => {
  const responsePickerClasses = responsePickerStyles()
  // Checked store array of keys that are ready to move to available or assigned
  const [checked, setChecked] = useState([])
  // availableKeys stores array of keys available
  const [availableKeys, setAvailableKeys] = useState([]);
  // assignedKeys stores array of keys taken/assigned
  const [assignedKeys, setAssignedKeys] = useState([]) 
  const availableKeyChecked = intersection(checked, availableKeys);
  const assignedKeyChecked = intersection(checked, assignedKeys);
  console.log('PROPS.CURRENT KEYS', props.currentKeys);
  console.log('AVAILABLE KEYS', availableKeys);
  console.log('ASSIGNED KEYS', assignedKeys);
  /**
   * @param {string} value represents the role label name
   */

  useEffect(() => {
    setAvailableKeys(props.currentKeys)
  }, [props.currentKeys]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
        newChecked.push(value)
    } else {
        newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }
  /**
   * @param {array} items represents an array of keys
   * @return the length of checked keys
   */
  const numberOfChecked = (items) => intersection(checked, items).length
  /**
   * @param {array} items represents an array of keys 
   */
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items))
    } else {
        setChecked(union(checked, items))
    }
  }
  /**
   * handleCheckedRight change the state for availableKeys and assignedKeys and propagate data to parent component
   */
  const handleCheckedRight = () => {
    setAssignedKeys(assignedKeys.concat(availableKeyChecked))
    setAvailableKeys(not(availableKeys, availableKeyChecked))
    setChecked(not(checked, availableKeyChecked))
    props.handleKeyChange(assignedKeys.concat(availableKeyChecked))
  }
  /**
   * handleCheckedLeft change the state for availableKeys and assignedKeys and propagate data to parent component
   */
  const handleCheckedLeft = () => {
    setAvailableKeys(availableKeys.concat(assignedKeyChecked))
    setAssignedKeys(not(assignedKeys, assignedKeyChecked))
    setChecked(not(checked, assignedKeyChecked))
    props.handleKeyChange(not(assignedKeys, assignedKeyChecked))
  }
  /**
   * @param {string} title the name of cardheader (either Available Keys or Assigned Keys)
   * @param {array} items array of keys
   * @return jsx object of role picker component
   */
  const customList = (title, items) => (
    <Card>
      <CardHeader
      className={responsePickerClasses.cardHeader}
      avatar={
        <Checkbox
          onClick={handleToggleAll(items)}
          checked={numberOfChecked(items) === items.length && items.length !== 0}
          indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
          disabled={items.length === 0}
          inputProps={{ 'aria-label': 'all items selected' }}
        />
      }
      title={title}
      subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={responsePickerClasses.list} dense component="div" role="list">
          {items.map((value) => {
              const labelId = `transfer-list-all-item-${value}-label`
              return (
                  <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                  id={labelId} 
                  primary={
                    <Typography
                      component="span"
                      className={responsePickerClasses.listItem}
                    >
                    {value}
                    </Typography>
                  }/>
                  </ListItem>
            )})}
      </List>
    </Card>
  )
  return (
    <Grid container spacing={4} justify="center" alignItems="center" className={responsePickerClasses.root}>
      <Grid item>{customList('Available Response Key(s)', availableKeys)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <HelixButton
            variant="outlined"
            size="small"
            className={responsePickerClasses.button}
            onClick={handleCheckedRight}
            disabled={availableKeyChecked.length === 0}
            aria-label="move selected right"
            text={">"}
          />
          <HelixButton
            variant="outlined"
            size="small"
            className={responsePickerClasses.button}
            onClick={handleCheckedLeft}
            disabled={assignedKeyChecked.length === 0}
            aria-label="move selected left"
            text={"<"}
          />
        </Grid>
      </Grid>
      <Grid item>{customList('Selected Response Key(s)', assignedKeys)}</Grid>
    </Grid>
  )
}
export default ResponseKeyPicker