import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Box, InputAdornment, Select, MenuItem, FormControl, InputLabel,} from '@material-ui/core'
import { HelixButton, HelixTextField } from 'helixmonorepo-lib'
import SearchIcon from '@material-ui/icons/Search'
import TableKeysCard from './HelixTableKeysCard'
import FormDialog from './FormDialog'

const useTableKeysStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

/**
 * @return {JSX} Right section of the Helix Table Keys view
 */
const HelixTableKeysRight = (props) => {
  const useTableKeysClasses = useTableKeysStyles()
  // Opens dialog to add new key dialog 
  const [ openDialog, setOpenDialog ] = useState(false)
  // Provides list of mock key nanme items
  const [ items, setItems] = useState([
    {key: "firstName", value: 1},
    {key: "lastName", value: 2},
    {key: "relationshipName", value: 3},
    {key: "accountNumber", value: 4},
    {key: "accountID", value: 5},
  ])
  // New key item value captured by form input
  const [keyItemValue, setKeyItemValue] = useState('')

   // Updates items state array with added key item object  
   const handleAddKeyItem = () => {
      const newItemList = [ ... items, keyItemValue]
      setItems(newItemList)
  }

  const handleChange = (e) => {
  };

  // Renders form input and button controls for adding/updating keys
  const renderNewKeyForm = () => {
  return (
    <Container>
      <Grid container 
      spacing={4}
      justify='center'
      alignItems='center'
      direction='column'>
        <Grid item md={12}>
          <HelixTextField
          fullWidth
          name = 'newKey'
          label = 'Add Key'
          onChange={(e) => setKeyItemValue(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid 
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={6}
      >
        <Grid item md={12}>
          <HelixButton
          color='primary'
          size='large'
          variant='contained'
          text='Add'
          style={{width: '8em'}}
          onClick={() => {setOpenDialog(false); handleAddKeyItem()}}/>
          <HelixButton
          color='secondary'
          size='large'
          variant='contained'
          text='Cancel'
          style={{width: '8em'}}
          onClick={() => {setOpenDialog(false)}}/>
        </Grid>
      </Grid>
    </Container>
  )
}

  return (
    <>
    <Container>
      <Grid container spacing={2} >
        <Grid item md={12}>
          <Box display='flex' p={1}>
            <Box p={1} flexGrow={1}>
              <div>
                <h1>Entities Table Keys</h1>
                <h3>Total Number of Keys: {props.quantity}</h3>
              </div>
            </Box>
            <Box p={1}>
              <HelixButton 
                color="primary"
                variant="contained" 
                size="large"
                text="Add New Key"
                style={{marginLeft: '2em'}}
                onClick = {() => setOpenDialog(true)}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box display='flex' p={1}>
            <Box p={1} flexGrow={1}>
              <HelixTextField
                style={{width: '25em'}}  
                label="Search" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                    )
                  }}
              />
            </Box>
            <Box p={1}> 
              <FormControl variant="filled" className={useTableKeysClasses.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Sort By</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                  <em>Recently Added</em>
                  </MenuItem>
                  <MenuItem value={'Key Name'}>Key Name</MenuItem>
                  <MenuItem value={'Key Value'}>Key Value</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {items.map(({ key, value }) => (
        <Grid key={key} item md={12}>
          <TableKeysCard
            keyName={key}
            value={value}
            onEdit={(newKey) => setItems(items.map(({ key: k, value: v }) => k == key ? { key: newKey, value: v } : { key: k, value: v } ))}
            onDelete={() => setItems(items.filter(({ key: k }) => k != key))}
            />
        </Grid>
          ))}
      </Grid>
    </Container>
    <FormDialog
    title = 'Add/Edit Entities Key Field'
    openDialog= { openDialog }
    setOpenDialog = { setOpenDialog }>
      {renderNewKeyForm()}
    </FormDialog>
    </>
  )
}

export default HelixTableKeysRight
