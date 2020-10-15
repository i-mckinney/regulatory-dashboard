import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import DialogModalTemplate from '../DialogModalTemplate';
import Grid from '@material-ui/core/Grid';

const PerformTestDialog = ({ open, onClose, requestData: { requestName, _id : requestId } }) => {
  const [testResponse, setTestResponse] = useState(null);
  const [response, setResponse] = useState(null);
  const [mappedResponse, setMappedResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const testRequest = async () => {
      setLoading(true);
      //const response = await axios.get(getTestUrl(requestId))
      const response = await axios.get(`http://localhost:5000/companies/5f7e1bb2ab26a664b6e950c8/customapi/${requestId}/test`);
      setTestResponse(response.data);
      setResponse(response.data.externalSourceData)
      setMappedResponse(response.data.responseMapped)
      setLoading(false);
    };
    if (open) {
      testRequest();
    }
  }, [requestId, open]);

  if (!open) {
    return null;
  }
    return (
      <DialogModalTemplate
        title='API Response:'
        open={open}
        onClose={onClose}
      >
        <h3>Testing API Call "{`${requestName}`}"</h3>
          <Grid container spacing={2}>
            <Grid item md={6} style={{ borderRight: "1px solid gray" }}>
              <h4>Response</h4>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </Grid>
            <Grid item md={6}>
              <h4>Mapped Response</h4>
              <pre>{JSON.stringify(mappedResponse, null, 2)}</pre>
            </Grid>
          </Grid>
      </DialogModalTemplate>
    );
};

export default PerformTestDialog;
