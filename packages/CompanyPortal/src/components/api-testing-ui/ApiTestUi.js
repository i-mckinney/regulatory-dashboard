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

/**
* API TEST UI Component
* Container component that displays the API Add/Edit UI and all of its child components
*/


/** 
* Generates an object used to store custom params, headers, and mappings set by the user when interacting with the custom request interface
* @returns {Object} Returns a new field object with a generated unique ID, key and value pair. This object can be used to store custom params, headers, and mappings created in the Custom API interface
*/
const createNewField = () => ({ id: uuidv4(), key: '', value: '' });

export default function ApiTestUi({ data, onSave }) {
  const cardClasses = ApiTestUiStyles();
  // The custom request name from the name input
  const [name, setName] = useState('')
  // The custom request method from the select dropdown
  const [method, setMethod] = useState('');
  // The custom request url from the endpoint input
  const [url, setUrl] = useState('');
  // The custom params object 
  const [params, setParams] = useState([]);
  // The custom mapping object
  const [mapping, setMapping] = useState([]);
  // The custom headers object
  const [headers, setHeaders] = useState([]);


 /**
 * @returns {Object} reduces array to a plain object 
 */
  const reduceToPlainObj = (arr) =>
    arr.reduce(
      (acc, val) => ({ ...acc, ...(val.key && { [val.key]: val.value }) }),
      {}
    );

   /**
 * @returns {array} expands object to an array
 */
  const expandToArray = (obj) =>
    obj &&
    Object.entries(obj).map(([key, value]) => ({ id: uuidv4(), key, value }));

  useEffect(() => {
    setName(data.requestName)
    setMethod(data.requestType);
    setUrl(data.requestUrl);
    setParams(expandToArray(data.requestParams) || [createNewField()]);
    setMapping(expandToArray(data.responseMapper) || [createNewField()]);
    setHeaders(expandToArray(data.requestHeaders) || [createNewField()]);
  }, [data]);

  
  /**
  * @returns {Object} spreads over the existing data state object and overwrites its properties with updated values on save 
  */ 
  const handleSave = () => {
    const requestData = {
      ...data,
      requestType: method,
      requestUrl: url,
      requestName: name,
      requestParams: reduceToPlainObj(params),
      responseMapper: reduceToPlainObj(mapping),
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
      <h3>Mapped Response</h3>
      <pre>
        {JSON.stringify(reduceToPlainObj(mapping), null, 2)}
      </pre>
    </div>
  );
}
