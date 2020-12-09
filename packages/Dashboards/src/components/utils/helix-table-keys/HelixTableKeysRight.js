import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Box, InputAdornment, Select, MenuItem, FormControl, InputLabel,} from '@material-ui/core'
import { HelixButton, HelixTextField } from 'helixmonorepo-lib'
import SearchIcon from '@material-ui/icons/Search'
import TableKeysCard from './TableKeysCard'

const useTableKeysStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}))

const HelixTableKeysRight = (props) => {
  const useTableKeysClasses = useTableKeysStyles()
  // Provides available sort methods for Select menu
  const [sortMethod, setSortMethod] = React.useState('')
  // Provides list of mock data table keys 
  const [ items, setItems] = useState([
    {key: "firstName", value: 1},
    {key: "lastName", value: 2},
    {key: "relationshipName", value: 3},
    {key: "accountNumber", value: 4},
    {key: "accountID", value: 5},
  ])

  const handleChange = (e) => {
    setSortMethod(e.target.value);
  };

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
                onClick
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
                  value={sortMethod}
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
    </>
  )
}

export default HelixTableKeysRight
