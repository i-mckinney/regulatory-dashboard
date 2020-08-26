import React, { useState, useEffect } from 'react';
import { Grid, TextField, makeStyles } from '@material-ui/core';
import { useForm, Form } from '../../components/useForm';



const initialApiCallValues = {
  id: 0,
  method: '',
  url: '',
  description: '',
  params: '',
  auth: '',
  headers: '',
  body: '',
  datedCreated: new Date(),
};

export default function AddApiForm() {

  const { values, setValues, handleInputChange } = useForm(
    initialApiCallValues
  );

  return (
      <Form>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              label='URL'
              name='url'
              value={values.url}
              onChange={handleInputChange}
            />
            <TextField
              variant='outlined'
              label='Description'
              name='description'
              value={values.description}
            />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Form>
  );
}
