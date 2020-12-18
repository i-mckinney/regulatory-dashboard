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
    "firstName",
    "lastName",
    "middleName"
  ])
  // New key item value captured by form input
  const [keyItemValue, setKeyItemValue] = useState('')
  const [dialogAction, setDialogAction] = useState("C")
  const [currentKey, setCurrentKey] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortType, setSortType] = useState("A")


   // Updates items state array with added key item object  
   const handleAddKeyItem = () => {
      const newItemList = [ ... items, keyItemValue]
      setItems(newItemList)
      console.log('newItemList:', newItemList)
  }

  const onEditSave = () => {
    setItems(items.map((k) => k == currentKey ? keyItemValue : k))
  }

  const handleEditKey = (key) => {
    setOpenDialog(true)
    setDialogAction("E");
    setCurrentKey(key)
    setKeyItemValue(key)
  }

  const handleAddKey = () => {
    setOpenDialog(true);
    setDialogAction("C");
    setKeyItemValue("")
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
          value={keyItemValue}
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
          text={dialogAction === "C" ? "Add" : "Edit"}
          style={{width: '8em'}}
          onClick={() => { setOpenDialog(false); dialogAction === "C" ? handleAddKeyItem() : onEditSave()}}/>
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

  const sortedItems = React.useMemo(() => sortType == "A" ? items.sort() : items.sort().reverse(), [items, sortType])
  const filteredItems = sortedItems.filter(i => !searchTerm || i.includes(searchTerm))



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
                onClick = {handleAddKey}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <MenuItem value="A">Ascending</MenuItem>
                  <MenuItem value="D">Descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {filteredItems.map((key) => (
        <Grid key={key} item md={12}>
          <TableKeysCard
            keyName={key}
            onEdit={() => handleEditKey(key)}
            onDelete={() => setItems(items.filter((k) => k != key))}
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
