import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  axios from "axios";
import { Grid, FormControl, FormLabel, IconButton, InputLabel, RadioGroup as MuiRadioGroup, Button as MuiButton, Select, Switch, MenuItem, FormHelperText, FormControlLabel, Radio } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { HelixTable, HelixTableCell } from 'helixmonorepo-lib';
import { sortableExcludes, columnMetadata, API_HOST } from '../../config';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';


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
  },
  buttonSize:{
    width: 150,
    marginTop: 100
  }
}));

const LoanPreferences = (props) => {
  const loansPreferencesClasses = useLoansPreferencesClasses();
  const [toggleValue, setToggleValue] = React.useState(true)
  const [toggleState, setToggleState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [template, setTemplate] = React.useState('');

  // USED TO FETCH PLACEHOLDER DATA
  const companyId = "5f7e1bb2ab26a664b6e950c8";
  const [companyData, setCompanyData] = useState([]);
  const customApiUrl = `${API_HOST}/companies/${companyId}/customapi`;

  // FETCHING PLACEHOLDER DATA
  useEffect(() => {
    const fetchCompanies = () => {
      axios
        .get(customApiUrl, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          // setRows(res.data[0].CustomApiRequests);
          setCompanyData(res.data);
        });
    };

    fetchCompanies();
  }, [customApiUrl]);

  let columns = [];

  columns = columnMetadata.map(({ key }) => ({
    Accessor: key,
    Sortable: sortableExcludes.includes(key) ? false : true,
  }));
  columns.push({
    Accessor: "Actions",
    Sortable: false,
  });
 
  const handleDeleteRow = async (_id) => {
    try {
      await axios.delete(`${customApiUrl}/${_id}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      setCompanyData(companyData.filter((d) => d._id !== _id));
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * @param {object} row the row is an object of data
   * @param {object} column the column is an object of the header with accessor and label props
   * @param {int} rowIndex the rowIndex represents index of the row
   * @param {int} columnIndex the columnIndex represents index of the column
   * @return {JSX} HelixTableCell of object properties in that Table row
   */
  const customCellRender = (row, column, rowIndex, columnIndex) => {
    const columnAccessor = column.Accessor;
    const displayActions = () => (
      <div className={loansPreferencesClasses.actionTableCell}>
        <IconButton
          aria-label="delete"
          size="small"
          edge="start"
          onClick={() => handleDeleteRow(row._id)}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
    if (columnAccessor === "Actions") {
      return (
        <HelixTableCell
          key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}
          containActions={true}
          displayActions={displayActions}
        />
      );
    } else {
      return (
        <HelixTableCell
          key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}
          value={row[columnAccessor]}
        />
      );
    }
  };

  /**
   * @param {object} column represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customHeadColumnKeyProp = (column) => {
    return column.Accessor;
  };

  /**
   * @param {object} row represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customBodyRowKeyProp = (row) => {
    return row._id;
  };


  const handleChange = (e) => {
    setToggleValue(e.target.checked)
    setToggleState({ ...toggleState, [e.target.name]: e.target.checked });
    console.log(e.target.checked)
  };

  const getExistingReports = () => [
  { id: '1', title: 'GET Test#1_FIS' },
  { id: '2', title: 'GET Test#4_DataWarehouse' },
  { id: '3', title: 'POST Test#6_Temenos' },
];

  return (
    <>
    <FormControl>
     <FormLabel>Loans</FormLabel>
      <Switch
          checked={toggleValue}
        onChange={handleChange}
        name='checkedA'
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
     </FormControl>
     {toggleValue === true ? (<Grid container spacing={4}>
      <Grid item xs={11}>
        <FormControl variant='outlined' fullWidth className={loansPreferencesClasses.formControl}>
          <InputLabel ></InputLabel>
            <Select
              value={template}
              onChange={handleChange}
              displayEmpty
              className={loansPreferencesClasses.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
              options={getExistingReports()}
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
      <Grid item xs={1} alignContent='flex-start'>
      <IconButton variant='contained' color='primary' size='medium'>
        <AddBoxIcon />
      </IconButton>
      </Grid>
       <Grid item xs={12}>
        <HelixTable
          columns={columns}
          rows={companyData}
          customCellRender={customCellRender}
          customHeadColumnKeyProp={customHeadColumnKeyProp}
          customBodyRowKeyProp={customBodyRowKeyProp}
        />
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
    <Grid item xs={12}>
        <Grid container direction='row' justify='center' alignItems='flex-end' spacing={2}>
          <Grid item> 
            <MuiButton className={loansPreferencesClasses.buttonSize} color='primary' variant='contained' size='large'
            >Back
            </MuiButton>
          </Grid>
          <Grid item>   
            <MuiButton className={loansPreferencesClasses.buttonSize} color='default' variant='contained' size='large' 
            >Next
            </MuiButton>
          </Grid>
          <Grid item>   
            <MuiButton className={loansPreferencesClasses.buttonSize} color='secondary' variant='contained' size='large'
            >Cancel
            </MuiButton>
          </Grid>
     </Grid>
    </Grid>
    </Grid>
     ) : <div><h3>Use the toggle button to add Entity Report Template preferences</h3></div>}
    </>
  )
}

export default LoanPreferences
