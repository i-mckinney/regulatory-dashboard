import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import DialogModalTemplate from '../DialogModalTemplate';

//const BASE_URL = 'http://localhost:4005/customapi';

const PerformTestDialog = ({ open, onClose, requestData, companyData }) => {
  const [testResponse, setTestResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const testRequest = async () => {
      const { _id, requestMethod, requestBody } = requestData;
      setLoading(true);
      const response = await axios({
        //method: requestMethod,
        //url: `${BASE_URL}/${_id}`,
        //body: requestBody,
        method: 'GET',
        url: 'http://localhost:4005/companies',
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
      title='API Test Response:'
      open={open}
      onClose={onClose}
    >
      <h3>{`Request Name: ${requestData.requestName}`}</h3>
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