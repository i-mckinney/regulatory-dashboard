import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, List, Card, CardHeader, ListItem, ListItemText, Typography, ListItemIcon, Checkbox, Divider } from '@material-ui/core'
import { HelixButton } from 'helixmonorepo-lib'

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

function not(self, other) {
  return self.filter((value) => other.indexOf(value) === -1)
}

function intersection(self, other) {
  return self.filter((value) => other.indexOf(value) !== -1)
}

function union(self, other) {
  return [...self, ...not(other, self)]
}

const TransferList = () => {
  const transferListclasses = transferListuseStyles()

  const [checked, setChecked] = useState([])
  const [availableRole, setAvailableRole] = useState(["Admin", "Member", "Banker", "Financial Analyst", "Investment Analyst", "Rating Analyst"])
  const [assignRole, setAssignRole] = useState([])

  const availableRoleChecked = intersection(checked, availableRole);
  const assignRoleChecked = intersection(checked, assignRole);

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

  const numberOfChecked = (items) => intersection(checked, items).length

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items))
    } else {
        setChecked(union(checked, items))
    }
  }
  
  const handleCheckedRight = () => {
    setAssignRole(assignRole.concat(availableRoleChecked))
    setAvailableRole(not(availableRole, availableRoleChecked))
    setChecked(not(checked, availableRoleChecked))
  }

  const handleCheckedLeft = () => {
    setAvailableRole(availableRole.concat(assignRoleChecked))
    setAssignRole(not(assignRole, assignRoleChecked))
    setChecked(not(checked, assignRoleChecked))
  }

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
      <Grid item>{customList('Role(s)', availableRole)}</Grid>
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
            disabled={assignRoleChecked.length === 0}
            aria-label="move selected left"
            text={"<"}
          />
        </Grid>
      </Grid>
      <Grid item>{customList('Selected Role(s)', assignRole)}</Grid>
    </Grid>
  )
}

export default TransferList