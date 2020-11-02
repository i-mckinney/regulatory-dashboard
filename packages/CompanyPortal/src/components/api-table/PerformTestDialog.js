import React, { useState, useEffect } from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Button, InputBase } from '@material-ui/core';
import axios from 'axios';
import DialogModalTemplate from '../DialogModalTemplate';
import Grid from '@material-ui/core/Grid';
import { API_HOST } from '../../config';
// import { Controls } from '../controls/Controls';
import ResponseKeyPicker from '../controls/ResponseKeyPicker'

const PerformTestDialog = ({
  open,
  onClose,
  requestData: { requestName, _id: requestId },
  companyId,
  initialKeys
}) => {
  const [response, setResponse] = useState(null);
  const [mappedResponse, setMappedResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [keys, setKeys] = useState([])

  useEffect(() => {
    setResponse(null)
    setMappedResponse(null)
  }, [open])

  const [inputState, setInputState] = useState('');

  const testRequest = async (borrowerId) => {
    // setLoading(true);
    const response = await axios.get(
      `${API_HOST}/companies/${companyId}/customapi/${requestId}/test/${borrowerId}`
    );
    setResponse(response.data.externalSourceData);
    setMappedResponse(response.data.responseMapped);
    console.log('RESPONSE EXT', response.data.externalSourceData)
    setKeys(Object.keys(response.data.externalSourceData))
    console.log('TEST REQUEST AFTER')
  };

      console.log('TESTINNG OUTSIDE')


  const handleSubmit = (evt) => {
    evt.preventDefault();
    testRequest(inputState);
  };
  const handleChange = (evt) => {
    setInputState(evt.target.value);
  };

  if (!open) {
    return null;
  }

  console.log('KEYS', keys)
  /////////////////////////////////////////////
  const handleKeyChange = (keys) => {
        setKeys([...keys])
    }

  return (
    <DialogModalTemplate
      title='Test API Response'
      open={open}
      onClose={onClose}
    >
          <h3>Testing API Call "{`${requestName}`}"</h3>

      {/* <form noValidate autoComplete="off" onSubmit={handleSubmit}> */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <TextField
          id='standard-basic'
          label='Borrower ID'
          onChange={handleChange}
        />
        <Button
          style={{ marginLeft: '10px' }}
          variant='contained'
          color='secondary'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      {/* </form> */}
      <Grid container spacing={4} style={{width: '100%'}}>
        <Grid item md={6} style={{ border: '1px solid gray', paddingTop: '10px' }}>
          <h4>Response</h4>
          <pre>{response ? JSON.stringify(response, null, 2) : null}</pre>
        </Grid>
        <Grid item md={6} style={{ border: '1px solid gray' }}>
          <h4>Mapped Response</h4>
          <pre>{response ? JSON.stringify(mappedResponse, null, 2) : null}</pre>
        </Grid>
        <Grid item md={12} style={{ border: '1px solid gray', paddingTop: '10px' }}>
          <h4>Selected Response Keys</h4>
            {/* <ResponseKeyPicker currentKeys={keys} handleKeyChange={handleKeyChange}/> */}
        </Grid>
      </Grid>
    </DialogModalTemplate>
  );
};

export default PerformTestDialog;
