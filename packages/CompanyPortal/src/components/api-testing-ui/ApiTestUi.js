import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { v4 as uuidv4 } from 'uuid';
import PerformTestCard from './PerformTestCard';
import CustomRequestSection from './CustomRequest';
import RequestResponse from './RequestResponse';
import axios from 'axios';

const ApiTestUiStyles = makeStyles({
  root: {
    padding: 20,
  },
});

const createNewField = () => ({ id: uuidv4(), key: '', value: '' });

export default function ApiTestUi({ data }) {
  const cardClasses = ApiTestUiStyles();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([]);
  const [mapping, setMapping] = useState([]);
  const [response, setResponse] = useState(null);
  const [headers, setHeaders] = useState([]);

  const reduceToPlainObj = (arr) =>
    arr.reduce(
      (acc, val) => ({ ...acc, ...(val.key && { [val.key]: val.value }) }),
      {}
    );

  const expandToArray = (obj) =>
    obj &&
    Object.entries(obj).map(([key, val]) => ({ id: uuidv4(), key, val }));

  useEffect(() => {
    setMethod(data.requestType);
    setUrl(data.requestUrl);
    setParams(expandToArray(data.requestParams) || [createNewField()]);
    setMapping(expandToArray(data.requestMapping) || [createNewField()]);
    setHeaders(expandToArray(data.requestHeaders) || [createNewField()]);
  }, [data]);

  const onSubmitRequest = async () => {
    const requestData = {
      RequestType: method,
      RequestUrl: url,
      RequestName: data.requestName,
      RequestParams: reduceToPlainObj(params),
      RequestMapping: reduceToPlainObj(mapping),
      RequestHeaders: reduceToPlainObj(headers),
    };
    console.log(requestData);
    // make the api call and then setResponse
    const res = await axios.post(
      'http://localhost:5000/companies',
      requestData
    );
    setResponse(res.data);
  };

  return (
    <div className={cardClasses.root}>
      <PerformTestCard
        method={method}
        url={url}
        setMethod={setMethod}
        setUrl={setUrl}
      />
      <CustomRequestSection
        params={params}
        setParams={setParams}
        mapping={mapping}
        setMapping={setMapping}
        headers={headers}
        setHeaders={setHeaders}
        onSubmitRequest={onSubmitRequest}
      />
      <RequestResponse response={response} />
    </div>
  );
}
