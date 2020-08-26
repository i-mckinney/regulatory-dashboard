import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import * as requestService from '../../services/requestService';

const defaultRequestValues = {
  id: 0,
  requestName: '',
  requestMethod: '',
  requestUrl: '',
  requestDescription: '',
  addParameters: '',
  requestParams: '',
  requestAuth: '',
  requestHeaders: '',
  requestBody: '',
  addRequestToCollection: false,
  requestAddedDate: new Date(),
};

const parametersYesNo = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'no' },
];

const buttonStyle = {
  marginTop: '150px',
};

export default function AddRequestForm() {
  const validate = () => {
    let obj = {};
    obj.requestMethod =
      values.requestMethod.length != 0 ? '' : 'A request method is required';
    obj.requestUrl = values.requestUrl ? '' : 'An request URL is required';
  };
  const { values, setValues, handleInputChange, resetForm } = useForm(
    defaultRequestValues
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    requestService.addApiRequest(values);
    resetForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='requestName'
            label='Request Name'
            value={values.requestName}
            onChange={handleInputChange}
          />
          <Controls.Input
            name='requestDescription'
            label='Request Description'
            value={values.requestDescription}
            onChange={handleInputChange}
          />
          <Controls.Select
            name='requestMethod'
            label='Method'
            value={values.requestMethod}
            onChange={handleInputChange}
            options={requestService.getRequestMethods()}
          />
          <Controls.Input
            name='requestUrl'
            label='Request URL'
            value={values.requestUrl}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='addParameters'
            label='Add Parameters'
            value={values.addParameters}
            onChange={handleInputChange}
            items={parametersYesNo}
          />
          <div style={buttonStyle}>
            <Controls.Button type='submit' size='large' text='Save' />
            <Controls.Button
              type='Reset'
              size='large'
              text='Clear'
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
