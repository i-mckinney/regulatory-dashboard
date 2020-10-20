import React, { useState, useEffect } from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Button, InputBase } from '@material-ui/core';
import axios from 'axios';
import DialogModalTemplate from '../DialogModalTemplate';
import Grid from '@material-ui/core/Grid';
import { API_HOST } from '../../config';

const PerformTestDialog = ({
  open,
  onClose,
  requestData: { requestName, _id: requestId },
  companyId
}) => {
  console.log(requestId);
  const [response, setResponse] = useState(null);
  const [mappedResponse, setMappedResponse] = useState(null);
  const [loading, setLoading] = useState(false);

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
    // setLoading(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    testRequest(inputState);
  };
  const handleChange = (evt) => {
    setInputState(evt.target.value);
  };

  // useEffect(() => {
  //   const testRequest = async () => {
  //     setLoading(true);
  //     //const response = await axios.get(getTestUrl(requestId))
  //     const response = await axios.get(
  //       `http://localhost:5000/companies/5f7e1bb2ab26a664b6e950c8/customapi/${requestId}/test`
  //     );
  //     setTestResponse(response.data);
  //     setResponse(response.data.externalSourceData);
  //     setMappedResponse(response.data.responseMapped);
  //     setLoading(false);
  //   };
  //   if (open) {
  //     testRequest();
  //   }
  // }, [requestId, open]);

  if (!open) {
    return null;
  }

  return (
    <DialogModalTemplate
      title='Test API Response'
      open={open}
      onClose={onClose}
    >
      {/* <form noValidate autoComplete="off" onSubmit={handleSubmit}> */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <TextField
          id='standard-basic'
          label='Borrower Id'
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
      <h3>Testing API Call "{`${requestName}`}"</h3>
      <Grid container spacing={2}>
        <Grid item md={6} style={{ borderRight: '1px solid gray' }}>
          <h4>Response</h4>
          <pre>{response ? JSON.stringify(response, null, 2) : null}</pre>
        </Grid>
        <Grid item md={6}>
          <h4>Mapped Response</h4>
          <pre>{response ? JSON.stringify(mappedResponse, null, 2) : null}</pre>
        </Grid>
      </Grid>
    </DialogModalTemplate>
  );
};

export default PerformTestDialog;
