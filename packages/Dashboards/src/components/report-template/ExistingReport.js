import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  axios from "axios";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, FormControl, FormLabel, IconButton, InputLabel, RadioGroup as MuiRadioGroup, Button as MuiButton, Select, MenuItem, FormHelperText, FormControlLabel, Radio } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import {API_HOST} from '../../config'

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
    { id: 'yes', title: 'Yes', templateValue: true },
    { id: 'no', title: 'No', templateValue: false },
]

const ExistingReport = ({reportTemplate, setReportTemplate}) => {
  const existingReportClasses = useExistingReportClasses();
  const [template, setTemplate] = useState('');
  //const [radioVal, setRadioVal] = useState('no')
  const [radioVal, setRadioVal] = useState(reportTemplate.doesReportExist? 'yes' : 'no')
  const [tableRows, setTableRows] = useState(reportTemplate.doesReportExist ? reportTemplate.selectedReportApiRequests: [])
  const [tableRowsDisplay, setTableRowsDisplay] = useState(reportTemplate.doesReportExist ? reportTemplate.selectedReportApiRequestsDisplay: [])
  const [reportRequests, setReportRequests] = useState([])

  let companyId = "5f7e1bb2ab26a664b6e950c8"
  let reportApiURL = `${API_HOST}/companies/${companyId}/customapi/report`

 useEffect(()=> {
  setReportTemplate({
    ...reportTemplate,
    doesReportExist: radioVal==='no' ? false : true,
    selectedReportApiRequests: radioVal !=='no' ? tableRows : [] ,
    selectedReportApiRequestsDisplay: radioVal !=='no' ? tableRowsDisplay : [] 
  })
  const fetchReportRequests = async () =>{
    const response = await axios.get(reportApiURL)
    setReportRequests(response.data)
  }
  fetchReportRequests()
 }, [radioVal,tableRows])

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
    // if(template!==''){
    //   setTableRows([template])
    //   setTemplate('')
    // } else {
    //   return null
    // }
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

  const handleRadioChange = e => {
    setRadioVal(e.target.value)
    setTableRowsDisplay([])
    setTableRows([])
  }

  return (
    <>
    <FormControl>
            <FormLabel>Does Report Exist?</FormLabel>
            <MuiRadioGroup row
                name='reportExists'
                value={radioVal}
                onChange={handleRadioChange}
                >
                {
                    radioItems.map(
                        item => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
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
             // value={template}
              onChange={handleChange}
              defaultValue = ''
             // displayEmpty
              className={existingReportClasses.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
             // options={getExistingReports()}
            >
              {/* <MenuItem value=""><em>None</em></MenuItem> */}
              {/* {getExistingReports().map((report) => {
             return <MenuItem 
                value={report.title}
                key={report.id}
                style={{display:(tableRows.includes(report.title) ? 'none': '')}}
              >
                {report.title}
              </MenuItem>
              })
            } */}
            {reportRequests.map((report) => {
              return <MenuItem 
                value={report}
                key={report._id}
                style={{display:(tableRowsDisplay.includes(report.requestName) ? 'none': '')}}
              >
                {report.requestName}
              </MenuItem>
              })
            }
            </Select>
          <FormHelperText>Please select your API</FormHelperText>
        </FormControl>
      </Grid>
      <Grid container item xs={1} alignContent='flex-start'>
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
    </Grid>
       </div>) : <div><h3>If Report already exists, select YES above and pick a report for your template</h3></div>
}
    </>
  )
}

export default ExistingReport
