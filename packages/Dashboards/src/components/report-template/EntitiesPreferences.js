import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  axios from "axios";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper,FormControl, FormLabel, IconButton, InputLabel, RadioGroup as MuiRadioGroup, Button as MuiButton, Select, Switch, MenuItem, FormHelperText, FormControlLabel, Radio } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import {API_HOST} from '../../config'

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

const EntitiesPreferences = ({reportTemplate, setReportTemplate}) => {
  const entitiesPreferencesClasses = useEntitiesPreferencesClasses();
  // const [template, setTemplate] = useState('');
  const [template, setTemplate] = useState({});
  const [toggleValue, setToggleValue] = useState(true)
  const [tableRows, setTableRows] = useState(reportTemplate.selectedEntityApiRequests)
  const [tableRowsDisplay, setTableRowsDisplay] = useState(reportTemplate.selectedEntityApiRequestsDisplay)
  const [entityRequests, setEntityRequests] = useState([])

  let companyId = "5f7e1bb2ab26a664b6e950c8"
  let entityApiURL = `${API_HOST}/companies/${companyId}/customapi/entity`

  useEffect(()=> {
    setReportTemplate({
      ...reportTemplate,
      enableEntities: toggleValue,
      selectedEntityApiRequests: toggleValue !== false ? tableRows : [],
      selectedEntityApiRequestsDisplay: toggleValue !== false ? tableRowsDisplay : []
    })
    const fetchEntityRequests = async () =>{
      const response = await axios.get(entityApiURL)
      setEntityRequests(response.data)
    }
    fetchEntityRequests()
   }, [toggleValue,tableRows])

 const handleChange = (e) => {
    setTemplate(e.target.value);
  };

const handleToggleChange = e => {
    setToggleValue(e.target.value)
    setToggleValue(e.target.checked)
    setTableRows([])
    setTableRowsDisplay([])
  }

  const handleAddToTable = () => {
    if(template.requestName){
      // setTableRows([...tableRows, template.requestName])
       setTableRows([template._id])
       setTableRowsDisplay([template.requestName])
      // setTableRows({...tableRows, rowName: template.requestName, requestId: template._id })
       setTemplate({})
     } else {
       return null
     }
  }

  const handleDeleteRow = () => {
    setTableRows([])
    setTableRowsDisplay([])
  };

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
           // value={template}
            onChange={handleChange}
          //  displayEmpty
            defaultValue = ''
            className={entitiesPreferencesClasses.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
           // options={getEntitesPreferences()}
          >
            {/* <MenuItem value=""> <em>None</em> </MenuItem> */}
            {/* {getEntitesPreferences().map((entity) => {
             return <MenuItem 
                value={entity.title}
                key={entity.id}
                style={{display:(tableRows.includes(entity.title) ? 'none': '')}}
              >
                {entity.title}
              </MenuItem>
              })
            } */}
            {entityRequests.map((entity) => {
              return <MenuItem 
                value={entity}
                key={entity._id}
                style={{display:(tableRowsDisplay.includes(entity.requestName) ? 'none': '')}}
              >
                {entity.requestName}
              </MenuItem>
              })
            }
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
              {tableRowsDisplay.map((row) => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  <TableCell>
                    <IconButton variant='contained' color='primary' size='medium' onClick={handleDeleteRow}>
                      <DeleteIcon  />
                    </IconButton>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Grid>
    </Grid> ) : <div><h3>Use the toggle button to add Entity Report Template preferences</h3></div>}
    
    </>
  )
}

export default EntitiesPreferences
