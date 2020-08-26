import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import * as requestService from '../../services/requestService';

const parametersYesNo = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'no' },
];

const initialApiCallValues = {
  id: 0,
  method: '',
  url: '',
  description: '',
  addParameters: '',
  params: '',
  auth: '',
  headers: '',
  body: '',
  addToCollection: false,
  datedCreated: new Date(),
};

export default function AddApiForm() {
  const validate = () => {
    let temp = {};
    temp.method = values.method.length!=0?"":"Request method is required"
    temp.url = values.url?"":"An API request URL is required";
  };
  const { values, setValues, handleInputChange, resetForm } = useForm(
    initialApiCallValues
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
          <Controls.Select
            name='method'
            label='Method'
            value={values.method}
            onChange={handleInputChange}
            options={requestService.getRequestMethods()}
          />
          <Controls.Input
            name='url'
            label='Request URL'
            value={values.url}
            onChange={handleInputChange}
          />
          <Controls.Input
            name='description'
            label='Request Description'
            value={values.description}
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
          <Controls.Checkbox
            name='addToCollection'
            label='Save this Request to a Collection?'
            value={values.addToCollection}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type='submit' text='Save' />
            <Controls.Button type='Reset' text='Clear' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
