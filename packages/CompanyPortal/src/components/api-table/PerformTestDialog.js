import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import DialogModalTemplate from '../DialogModalTemplate';

const PerformTestDialog = ({ open, onClose, requestData, companyData }) => {
  const [testResponse, setTestResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const testRequest = async () => {
      const { _id, requestType, requestBody } = requestData;
      const payload = { ...requestData };
      delete payload._id;
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/companies',
        body: payload,
      });
      setTestResponse(response.data);
      setLoading(false);
    };
    if (open) {
      testRequest();
    }
  }, [requestData, open]);

  if (!open) {
    return null;
  }
  return (
    <DialogModalTemplate
      title='API Response:'
      open={open}
      onClose={onClose}
    >
      <h3>Testing API Call "{`${requestData.requestName}`}"</h3>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <pre>{JSON.stringify(testResponse, null, 2)}</pre>
        </div>
      )}
    </DialogModalTemplate>
  );
};

export default PerformTestDialog;
