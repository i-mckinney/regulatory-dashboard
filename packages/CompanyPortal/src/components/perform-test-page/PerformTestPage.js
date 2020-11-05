import React, { useState, useEffect } from 'react'
import { makeStyles, Typography, Card, CardActions, CardContent, Grid, InputAdornment } from '@material-ui/core'
import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import { HelixTextField, HelixButton } from 'helixmonorepo-lib'
import { API_HOST } from '../../config';


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
  requestData: { requestName, _id: requestId },
  companyId,
  onClose
}
) {
  const performTestPageClasses = performTestPageStyles()
  
    const [requestData, setRequestData] = useState({});
    const [response, setResponse] = useState(null);
    const [mappedResponse, setMappedResponse] = useState(null);
    const [keys, setKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    const [borrowerId, setBorrowerId] = useState("")


    /** *
     * Executes the Test Custom API Request backend call and sets the response data for use in UI display 
     */
    const testRequest = async () => {
     const response = await axios.get(
       `${API_HOST}/companies/${companyId}/customapi/${requestId}/test/${borrowerId}`
     );
     setResponse(response.data.externalSourceData);
     setMappedResponse(response.data.responseMapped);
     setKeys(Object.keys(response.data.responseMapped))
   };

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
              href="/api-table"

              // onClick={handleSaveEntityConfiguration}
              startIcon={<SaveIcon />}
              text="Save" />
              <HelixButton
              color="default"
              variant="contained"
              type="cancel"
              size="large"
              href="/api-table"
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
        <Grid item xs='12'><MappedKeyTransferList keys={keys} setKeys={setSelectedKeys} /></Grid>
        <Grid item xs='12' className={performTestPageClasses.buttonStyle} style={{textAlign: 'center'}}>
          {renderButtonActions()}
      </Grid>
     </Grid>
    </div>
  

  )
}
