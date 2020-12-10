import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  axios from "axios";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, FormControl, FormLabel, IconButton, InputLabel, RadioGroup as MuiRadioGroup, Button as MuiButton, Select, MenuItem, FormHelperText, FormControlLabel, Radio } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';


const useExistingReportClasses = makeStyles((theme) => ({
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

const radioItems = [
    { id: 'yes', title: 'Yes' },
    { id: 'on', title: 'No' },
]

const ExistingReport = (props) => {
  const existingReportClasses = useExistingReportClasses();
  const { value } = props;
  const [template, setTemplate] = React.useState('');
  const [radioVal, setRadioVal] = useState("yes")
  const [tableRows, setTableRows] = useState([])
 

  // Populates Select dropdown menu
  const getExistingReports = () => [
  { id: '1', title: 'GET Test#1_FIS' },
  { id: '2', title: 'GET Test#4_DataWarehouse' },
  { id: '3', title: 'POST Test#6_Temenos' },
];

  const handleChange = (event) => {
    setTemplate(event.target.value);
  };

  const handleAddToTable = () => {
    setTableRows([{ name: template }])
  }

  const handleDeleteRow = (e) => {};

  const handleRadioChange = e => {
    setRadioVal(e.target.value)
  }

  return (
    <>
    <FormControl>
            <FormLabel>Does Report Exist?</FormLabel>
            <MuiRadioGroup row
                name='radioItems'
                value={value}
                items={radioItems}>
                {
                    radioItems.map(
                        item => (
                            <FormControlLabel onChange={handleRadioChange} key={item.id} value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
    </FormControl>
    {radioVal === "yes"  ? (<div>
    <h2>Existing Report API</h2>
    <Grid container spacing={4}>
      <Grid item xs={11}>
        <FormControl variant='outlined' fullWidth className={existingReportClasses.formControl}>
            <Select
              value={template}
              onChange={handleChange}
              displayEmpty
              className={existingReportClasses.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
              options={getExistingReports()}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"GET Test#1_FIS"}>GET Test#1_FIS</MenuItem>
              <MenuItem value={"POST Test#6_Temenos"}>POST Test#6_Temenos</MenuItem>
              <MenuItem value={"GET Test#4_DataWarehouse"}>GET Test#4_DataWarehouse</MenuItem>
            </Select>
          <FormHelperText>Please select your API</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={1} alignContent='flex-start'>
      <IconButton variant='contained' color='primary' size='medium' onClick={handleAddToTable}>
        <AddBoxIcon  />
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
    </Grid>
       </div>) : <div><h3>If Report already exist, select YES above and pick a report for your template</h3></div>
}
    </>
  )
}

export default ExistingReport
