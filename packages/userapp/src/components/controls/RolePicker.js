import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, List, Card, CardHeader, ListItem, ListItemText, Typography, ListItemIcon, Checkbox, Divider } from '@material-ui/core'
import { HelixButton } from 'helixmonorepo-lib'

// Styling used for MaterialUI
const transferListuseStyles = makeStyles((theme) => ({
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
 * @param {array} self the self is an array of roles that we want to have available
 * @param {array} other the other is an array of roles that is taken
 * @return the array of roles that are not taken
 */
function not(self, other) {
  return self.filter((value) => other.indexOf(value) === -1)
}

/**
 * @param {array} self the self is an array of roles that we want to have available
 * @param {array} other the other is an array of roles that is taken
 * @return the array of roles that are same through comparison of (self, other)
 */
function intersection(self, other) {
  return self.filter((value) => other.indexOf(value) !== -1)
}

/**
 * @param {array} self the self is an array of roles that we want to have available
 * @param {array} other the other is an array of roles that is taken
 * @return the array of roles from self and other (without duplicates from self array) 
 */
function union(self, other) {
  return [...self, ...not(other, self)]
}

/**
 * @param {Object} props the props contains methods and properties from parent component that will used to deliver props back up
 * @return {JSX} RolePicker component - one textbox in left and one textbox in right where you can pick role from left to the right vice versa
 */
const RolePicker = (props) => {
  const transferListclasses = transferListuseStyles()

  // Checked store array of roles that are ready to move to available or assigned
  const [checked, setChecked] = useState([])

  // availableRole stores array of roles available
  const [availableRole, setAvailableRole] = useState(not(["Admin", "Analyst", "Approver"], props.currentRoles))
  
  // assignedRole stores array of roles taken/assigned
  const [assignedRole, setAssignedRole] = useState(props.currentRoles)

  const availableRoleChecked = intersection(checked, availableRole);
  const assignedRoleChecked = intersection(checked, assignedRole);

  /**
   * @param {string} value represents the role label name
   */
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
   * @param {array} items represents an array of roles
   * @return the length of checked roles
   */
  const numberOfChecked = (items) => intersection(checked, items).length

  /**
   * @param {array} items represents an array of roles 
   */
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items))
    } else {
        setChecked(union(checked, items))
    }
  }
  
  /**
   * handleCheckedRight change the state for availableRole and assignedRole and propagate data to parent component
   */
  const handleCheckedRight = () => {
    setAssignedRole(assignedRole.concat(availableRoleChecked))
    setAvailableRole(not(availableRole, availableRoleChecked))
    setChecked(not(checked, availableRoleChecked))
    props.handleRolesChange(assignedRole.concat(availableRoleChecked))
  }

  /**
   * handleCheckedLeft change the state for availableRole and assignedRole and propagate data to parent component
   */
  const handleCheckedLeft = () => {
    setAvailableRole(availableRole.concat(assignedRoleChecked))
    setAssignedRole(not(assignedRole, assignedRoleChecked))
    setChecked(not(checked, assignedRoleChecked))
    props.handleRolesChange(not(assignedRole, assignedRoleChecked))
  }

  /**
   * @param {string} title the name of cardheader (either Available Roles or Assigned Roles)
   * @param {array} items array of roles
   * @return jsx object of role picker component
   */
  const customList = (title, items) => (
    <Card>
      <CardHeader
      className={transferListclasses.cardHeader}
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
      <List className={transferListclasses.list} dense component="div" role="list">
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
                      className={transferListclasses.listItem}
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
    <Grid container spacing={4} justify="center" alignItems="center" className={transferListclasses.root}>
      <Grid item>{customList('Available Role(s)', availableRole)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <HelixButton
            variant="outlined"
            size="small"
            className={transferListclasses.button}
            onClick={handleCheckedRight}
            disabled={availableRoleChecked.length === 0}
            aria-label="move selected right"
            text={">"}
          />
          <HelixButton
            variant="outlined"
            size="small"
            className={transferListclasses.button}
            onClick={handleCheckedLeft}
            disabled={assignedRoleChecked.length === 0}
            aria-label="move selected left"
            text={"<"}
          />
        </Grid>
      </Grid>
      <Grid item>{customList('Assigned Role(s)', assignedRole)}</Grid>
    </Grid>
  )
}

export default RolePicker