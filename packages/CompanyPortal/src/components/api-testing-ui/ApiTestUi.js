import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import PerformTestCard from './PerformTestCard';
import CustomRequestSection from './CustomRequest';
import Controls from '../controls/Controls';

const ApiTestUiStyles = makeStyles({
  root: {
    padding: 20,
  },
});

const createNewField = () => ({ id: uuidv4(), key: '', value: '' });

export default function ApiTestUi({ data, onSave }) {
  const cardClasses = ApiTestUiStyles();
  const [name, setName] = useState('')
  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([]);
  const [mapping, setMapping] = useState([]);
  const [headers, setHeaders] = useState([]);

  const reduceToPlainObj = (arr) =>
    arr.reduce(
      (acc, val) => ({ ...acc, ...(val.key && { [val.key]: val.value }) }),
      {}
    );

  const expandToArray = (obj) =>
    obj &&
    Object.entries(obj).map(([key, value]) => ({ id: uuidv4(), key, value }));

  useEffect(() => {
    setName(data.requestName)
    setMethod(data.requestType);
    setUrl(data.requestUrl);
    setParams(expandToArray(data.requestParams) || [createNewField()]);
    setMapping(expandToArray(data.requestMapping) || [createNewField()]);
    setHeaders(expandToArray(data.requestHeaders) || [createNewField()]);
  }, [data]);

  const handleSave = () => {
    const requestData = {
      ...data,
      requestType: method,
      requestUrl: url,
      requestName: name,
      requestParams: reduceToPlainObj(params),
      requestMapping: reduceToPlainObj(mapping),
      requestHeaders: reduceToPlainObj(headers),
    };
    onSave(requestData)
  };

  return (
    <div className={cardClasses.root}>
      <PerformTestCard
        name={name}
        method={method}
        url={url}
        setName={setName}
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
      />
      <Controls.Button text='SAVE' onClick={handleSave}></Controls.Button>
      <h3>Request Mapping:</h3>
      <pre>
        {JSON.stringify(reduceToPlainObj(mapping), null, 2)}
      </pre>
    </div>
  );
}
