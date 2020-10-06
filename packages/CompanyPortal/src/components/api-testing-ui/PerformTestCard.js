import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent, Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import * as apiCallService from '../../services/apiCallService';

const useStyles = makeStyles({
  root: {
  },
});

export default function PerformTestCard() {
  const classes = useStyles();

  return (
    <div>
      <Card>
        <h1>test interface</h1>
        <Grid container spacing={1}>
          <Grid item md={3}>
            <Controls.Select
              label='Request Method'
              options={apiCallService.getMethodCollection()}
            />
          </Grid>
          <Grid item md={9}>
            <Controls.Input
              label='API Endpoint'
              defaultValue='Default Value'
            ></Controls.Input>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
