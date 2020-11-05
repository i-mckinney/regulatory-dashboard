import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, Typography, Card, CardContent, Grid, InputAdornment } from '@material-ui/core'
import { HelixTextField, HelixButton } from 'helixmonorepo-lib'
import { API_HOST } from '../../config';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import MappedKeyTransferList from './MappedKeyTransferList';

const performTestPageStyles = makeStyles(() => ({
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
    cardStyle: {
      root: {
    minWidth: 275,
  },
    }
  }))
 
 
export default function PerformTestPage({
  requestData: { requestName, _id: requestId, responseMapper },
  requestData,
  companyId,
  onClose,
  handleEditRow
}
) {
  const performTestPageClasses = performTestPageStyles()
  
    const [response, setResponse] = useState(null);
    const [mappedResponse, setMappedResponse] = useState(null);
    const [keys, setKeys] = useState([])
    const [mappedKeys, setMappedKeys] = useState([])
    const [borrowerId, setBorrowerId] = useState("")
    const responseLoaded = !!response

    const handleSave = () => {
      const updatedResponseMapper = mappedKeys.reduce((acc, k) => ({ ...acc, [k]: responseMapper[k] ?? k}), {})
      handleEditRow({ ...requestData, responseMapper: updatedResponseMapper })
      
    }


    /** *
     * Executes the Test Custom API Request backend call and sets the response data for use in UI display 
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
   * @return {jsx} return a HelixTextField and HelixButton for capturing id 
   */
    const renderTestingActions = () => {
      return (
        <div  >
        <HelixTextField
        label="Borrower ID"
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
   * @return {jsx} returns UI card for displaying response data
   */
    const renderExternalSourceData = () => {
      return (
    <Card>
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
   * @return {jsx} returns UI cards for displaying response data
   */
     const renderMappedResponseData = () => {
       return (
    <Card>
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
