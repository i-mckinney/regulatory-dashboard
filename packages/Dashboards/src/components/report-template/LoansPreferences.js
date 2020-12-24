import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  axios from "axios";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper,FormControl, FormLabel, IconButton, InputLabel, RadioGroup as MuiRadioGroup, Button as MuiButton, Select, Switch, MenuItem, FormHelperText, FormControlLabel, Radio } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import {API_HOST} from '../../config'

const useLoansPreferencesClasses = makeStyles((theme) => ({
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

const LoanPreferences = ({reportTemplate, setReportTemplate}) => {
  const loansPreferencesClasses = useLoansPreferencesClasses();

  const [loanRequests, setLoanRequests] = useState([])
  const [template, setTemplate] = useState({});
  //const [template, setTemplate] = useState('');
  const [toggleValue, setToggleValue] = useState(true)
  //const [tableRows, setTableRows] = useState(reportTemplate.selectedLoanApiRequests)
  
  const [tableRows, setTableRows] = useState(reportTemplate.selectedLoanApiRequests)
  const [tableRowsDisplay, setTableRowsDisplay] = useState(reportTemplate.selectedLoanApiRequestsDisplay)

  let companyId = "5f7e1bb2ab26a664b6e950c8"
  let loanApiURL = `${API_HOST}/companies/${companyId}/customapi/loan`

  useEffect(()=> {
    setReportTemplate({
      ...reportTemplate,
      enableLoans: toggleValue,
      selectedLoanApiRequests: toggleValue !== false ? tableRows : [],
      selectedLoanApiRequestsDisplay: toggleValue !== false ? tableRowsDisplay: []
    })
    const fetchLoanRequests = async () =>{
      const response = await axios.get(loanApiURL)
      setLoanRequests(response.data)
    }
    fetchLoanRequests()
   }, [toggleValue,tableRows])


  console.log('loanRequests', loanRequests)
  console.log('reportTemplate inside step 2',reportTemplate)
  console.log('template', template)
  console.log('table rows,',tableRows)
  console.log('table rows display,',tableRowsDisplay)

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
      setTableRows([...tableRows, template._id])
      setTableRowsDisplay([...tableRowsDisplay, template.requestName])
     // setTableRows({...tableRows, rowName: template.requestName, requestId: template._id })
      setTemplate({})
    } else {
      return null
    }
   }

  const handleDeleteRow = (rowTodelete) => {
    const newTableRows = tableRows.filter((row)=> row !== rowTodelete )
    setTableRows(newTableRows)

    const newTableRowsDisplay = tableRowsDisplay.filter((row)=> row !== rowTodelete )
    setTableRowsDisplay(newTableRowsDisplay)
  };

  return (
    <>
    <FormControl>
     <FormLabel>Loans</FormLabel>
      <Switch
        checked={toggleValue}
        onChange={handleToggleChange}
        name='checkedA'
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
     </FormControl>
     {toggleValue === true ? (<Grid container spacing={4}>
      <Grid item xs={11}>
        <FormControl variant='outlined' fullWidth className={loansPreferencesClasses.formControl}>
          <InputLabel ></InputLabel>
            <Select
              //value={template}
              //value=''
              defaultValue =''
              onChange={handleChange}
              className={loansPreferencesClasses.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
             // options={loanRequests}
            >
              {/* <MenuItem value=""> <em>None</em> </MenuItem> */}
              {/* {getLoanTemplatePreferences().map((loan) => {
              return <MenuItem 
                value={loan.title}
                key={loan.id}
                style={{display:(tableRows.includes(loan.title) ? 'none': '')}}
              >
                {loan.title}
              </MenuItem>
              })
            } */}
            {loanRequests.map((loan) => {
              return <MenuItem 
                value={loan}
                key={loan._id}
              //  style={{display:(tableRows.includes(loan.requestName) ? 'none': '')}}
                style={{display:(tableRowsDisplay.includes(loan.requestName) ? 'none': '')}}
               // style={{display:(tableRows.rowName.includes(loan.requestName) ? 'none': '')}}
              >
                {loan.requestName}
              </MenuItem>
              })
            }
            </Select>
          <FormHelperText>Please select your API</FormHelperText>
        </FormControl>
      </Grid>
      <Grid container item xs={1} alignContent='flex-start'>
      <IconButton onClick={handleAddToTable} variant='contained' color='primary' size='medium'>
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
              {/* {tableRows.map((row) => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  <TableCell>
                    <IconButton variant='contained' color='primary' size='medium' onClick={()=>handleDeleteRow(row)}>
                      <DeleteIcon  />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))} */}

              {tableRowsDisplay.map((row) => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  <TableCell>
                    <IconButton variant='contained' color='primary' size='medium' onClick={()=>handleDeleteRow(row)}>
                      <DeleteIcon  />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
     ) : <div><h3>Use the toggle button to add Entity Report Template preferences</h3></div>}
    </>
  )
}

export default LoanPreferences
