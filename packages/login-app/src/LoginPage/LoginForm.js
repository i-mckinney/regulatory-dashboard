import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';

export default function LoginForm() {
  const initialFieldValues = {
    userId: '',
    password: '',
  };

  const [values, setValues] = useState(initialFieldValues);

  return (
    <form>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            label='User ID'
            value={values.userId}
          ></TextField>
        </Grid>
      </Grid>
    </form>
  );
}
