import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  axios from "axios";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper,FormControl, FormLabel, IconButton, InputLabel, RadioGroup as MuiRadioGroup, Button as MuiButton, Select, Switch, MenuItem, FormHelperText, FormControlLabel, Radio } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';


const useEntitiesPreferencesClasses = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: 350,
  },
  selectEmpty: {
  },
  mediumContainer: {
    width: "80%",
    margin: "auto",
    marginTop: "5rem",
    paddingBottom: "5rem",
  },
  createIconStyle: {
    float: "right",
    cursor: "pointer",
    marginLeft: "auto",
  },
  header: {
    paddingBottom: "2rem",
  },
  testButtonStyle: {
    color: "#00c200",
  },
  actionTableCell: {
    display: "flex",
    justifyContent: "space-evenly"
  }
}));

const EntitiesPreferences = (props) => {
  const entitiesPreferencesClasses = useEntitiesPreferencesClasses();
  const [template, setTemplate] = React.useState('');
  const [toggleValue, setToggleValue] = React.useState(true)
  const [tableRows, setTableRows] = useState([])


  const getReportTemplatePreferences = () => [
  { id: '1', title: 'GET Test#1_FIS' },
  { id: '2', title: 'GET Test#4_DataWarehouse' },
  { id: '3', title: 'POST Test#6_Temenos' },
];

 const handleChange = (e) => {
    setTemplate(e.target.value);
  };

const handleToggleChange = e => {
    setToggleValue(e.target.value)
    setToggleValue(e.target.checked)

  }

  const handleAddToTable = () => {
    setTableRows([{ name: template }])
  }

  const handleDeleteRow = (e) => {};

  
  return (
    <>
    <FormControl>
      <FormLabel>Entities</FormLabel>
        <Switch
          checked={toggleValue}
          onChange={handleToggleChange}
          name='checkedA'
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    </FormControl>
    {toggleValue === true ? (<Grid container spacing={4}>
    <Grid item xs={11}>
      <FormControl 
        variant='outlined'
        fullWidth 
        className={entitiesPreferencesClasses.formControl}>
        <InputLabel ></InputLabel>
          <Select
            value={template}
            onChange={handleChange}
            displayEmpty
            className={entitiesPreferencesClasses.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
            options={getReportTemplatePreferences()}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>GET Test#1_FIS</MenuItem>
            <MenuItem value={2}>POST Test#6_Temenos</MenuItem>
            <MenuItem value={3}>GET Test#4_DataWarehouse</MenuItem>
          </Select>
        <FormHelperText>Please select your API</FormHelperText>
      </FormControl>
    </Grid>
      <Grid container item xs={1} alignContent='flex-start'>
        <IconButton variant='contained' color='primary' size='medium' onClick={handleAddToTable}>
          <AddBoxIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} elevation={6}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Selected Custom API Request</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <IconButton variant='contained' color='primary' size='medium' onClick={() => setTableRows([])}>
                      <DeleteIcon  />
                    </IconButton>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Grid>
      <Grid item xs={12}>
        <Grid container direction='row-reverse' spacing={1}>
          <Grid item> 
            <MuiButton color='primary' variant='contained' startIcon={<SaveIcon />}
            >Save
            </MuiButton>
          </Grid>
          <Grid item>   
            <MuiButton color='secondary' variant='contained' startIcon={<CancelIcon />}
            >Cancel
            </MuiButton>
          </Grid>
     </Grid>
    </Grid>
    </Grid> ) : <div><h3>Use the toggle button to add Entity Report Template preferences</h3></div>}
    
    </>
  )
}

export default EntitiesPreferences
