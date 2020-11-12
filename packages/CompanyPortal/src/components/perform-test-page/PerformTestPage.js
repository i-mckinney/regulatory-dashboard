import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, Typography, Card, CardContent, Grid, InputAdornment  } from '@material-ui/core'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { HelixTextField, HelixButton } from 'helixmonorepo-lib'
import { API_HOST } from '../../config';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import MappedKeyTransferList from './MappedKeyTransferList';

const performTestPageStyles = makeStyles((theme) => ({
    root:{
      marginTop: "100px",
      marginLeft: '100px',
      marginRight: '100px',

    },
    responseContainer: {      
      paddingTop: '100px',
    
    },
    buttonStyle: {
      '& button': {
          marginTop: '16px',
          marginRight: '16px',
      },
      '& a': {
          marginTop: '16px',  
          marginRight: '16px',
      }
    },
    formControl: {
    minWidth: '200px',
    paddingRight: '40px'
  },
  helixTextField: {
    minWidth: '375px'
  },
    cardStyle: {
      root: {
    minWidth: 275,
  }

    }
  }))

// PERFORM TEST PAGE COMPONENT
// Renders page for performing Custom API user tests

/**
 * @param {Object} requestData the modified Custom API request data object
 * @param {String} companyId the ID required to make all Custom API calls to CompanyBackend
 * @param {Function} handleEditRow function passed down from parent component to handle API Table CRUD functions
 * @param {Function} oClose function passed down from parent component to handle open/close of Perform Test UI
 * @returns {JSX} PerformTest page
 */ 
export default function PerformTestPage({
  requestData: { requestName, _id: requestId, responseMapper },
  requestData,
  companyId,
  onClose,
  handleEditRow
}
) {
  const performTestPageClasses = performTestPageStyles()
  // the response provided by making the "Test Custom API Request" GET call to CompanyBackend 
  const [response, setResponse] = useState(null);
  // The nested mappedResponse data object returned in the response
  const [mappedResponse, setMappedResponse] = useState(null);
  // The nested externalSourceData object returned in the response
  const [keys, setKeys] = useState([])
  // The mapped keys to be added to the mappedResponse object by the user
  const [mappedKeys, setMappedKeys] = useState([])
  // The ID required to make a "Test Custom API Request" GET call to CompanyBackend 
  const [borrowerId, setBorrowerId] = useState("")
  // Confirms that a response has been received from CompanyBackend
  const responseLoaded = !!response
  // List of borrower IDs available for prefill using Select component 
  const [prefilledBorrowerId] = React.useState('');
  
    /*
     * Updates the mappedResponse object preparing for an "Update A Custom API Request" made to the CompanyBackend
     */
    const handleSave = () => {
      const updatedResponseMapper = mappedKeys.reduce((acc, k) => ({ ...acc, [k]: responseMapper[k] ?? k}), {})
      handleEditRow({ ...requestData, responseMapper: updatedResponseMapper })
      
    }

    /** 
     * Makes a "Test Custom API Request" call to CompanyBackend and sets the response data for display in UI
     */
    const testRequest = useCallback(
      async () => {
        const response = await axios.get(
          `${API_HOST}/companies/${companyId}/customapi/${requestId}/test/${borrowerId}`
        );
        const mappedKeys = Object.keys(responseMapper);
        setResponse(response.data.externalSourceData);
        setMappedResponse(response.data.responseMapped);
        setKeys(Object.keys(response.data.externalSourceData).filter(key => key !== "_id" && !mappedKeys.includes(key)))
        setMappedKeys(Object.keys(responseMapper));
      },
      [requestId, borrowerId, companyId, responseMapper],
    ) 

   useEffect(() => {
     if(borrowerId && requestData && responseLoaded) {
       testRequest()
     }

   }, [requestData, borrowerId, testRequest, responseLoaded])

  /**
   * @return {jsx} return a HelixTextField and HelixButton for capturing id, and Material UI Select component for prefilling input with known IDs
   */
    const renderTestingActions = () => {
      return (
        <div  >
        <FormControl className={performTestPageClasses.formControl}>
                {/* <FormControl className={performTestPageClasses.formControl} style={{width:200, paddingRight:20}}> */}

        <InputLabel id="demo-simple-select-label">Prefill ID</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select" 
          value={prefilledBorrowerId}
          onChange={e => setBorrowerId(e.target.value)}
        >
          <MenuItem value={'258ad85e-f6f0-44dc-bf61-4ce55f41ea96'}>FIS</MenuItem>
          <MenuItem value={'fd979084-4e36-4983-90e7-c743933518db'}>Sales Force</MenuItem>
          <MenuItem value={''}>DataWarehouse</MenuItem>
          <MenuItem value={'a58946c5-b227-45e0-9f2b-fc33103b1587'}>Temenos</MenuItem>
        </Select>
      </FormControl>

        <HelixTextField
        className={performTestPageClasses.helixTextField}
        label="Search for ID" 
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        value={borrowerId}
        onChange={e => setBorrowerId(e.target.value)}
        />
          <HelixButton 
              color="secondary"
              variant="contained" 
              type="submit" 
              size="large"
              text="Perform Test"
              style={{marginLeft: '2em'}}
              onClick={() => testRequest()}
            />
        </div> 
      )
    }

  /**
   * @return {JSX} returns UI card for displaying external source response data
   */
    const renderExternalSourceData = () => {
      return (
    <Card elevation={10}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          External Source Data:
        </Typography>
        <Typography variant="body2" component="p">
          {response ? <pre>{JSON.stringify(response, null, 2)}</pre> : ""}
        </Typography>
      </CardContent>
    </Card>
  );
    }

  /**
   * @return {jsx} returns UI cards for displaying user mapped response data
   */
     const renderMappedResponseData = () => {
       return (
    <Card elevation={10}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Mapped Response:
        </Typography> 
        <Typography variant="body2" component="p">
          
           {response ? <pre>{JSON.stringify(mappedResponse, null, 2)}</pre> : ""}
        </Typography>
      </CardContent>
    </Card>
  );   
    }

  /**
   * @return {jsx} returns HelixButton component for save and cancel actions
   */
    const renderButtonActions = () => {
      return (
          <>
              <HelixButton 
              color="primary" 
              variant="contained" 
              type="submit" 
              size="large"
              onClick={() => {handleSave(); onClose();}}
              startIcon={<SaveIcon />}
              text="Save" />
              <HelixButton
              color="default"
              variant="contained"
              type="cancel"
              size="large"
              onClick={onClose}
              startIcon={<CancelIcon />}
              text="Cancel" />
          </>
      )
  }

  return (
    <div className={performTestPageClasses.root}> 
     <Grid container spacing={6}>
      <Grid item xs='12'>{renderTestingActions()}</Grid>
      <Grid item xs='6' className={performTestPageClasses.responseContainer}>{renderExternalSourceData()}</Grid>
      <Grid item xs='6'className={performTestPageClasses.responseContainer}>{renderMappedResponseData()}</Grid>
      <Grid item xs='12'><MappedKeyTransferList  availableResponseKeys={keys} setAvailableResponseKeys={setKeys} selectedResponseKeys={mappedKeys} setSelectedResponseKeys={setMappedKeys} /></Grid>
      <Grid item xs='12' className={performTestPageClasses.buttonStyle} style={{textAlign: 'center'}}>
        {renderButtonActions()}
      </Grid>
     </Grid>
    </div>
  )
}
