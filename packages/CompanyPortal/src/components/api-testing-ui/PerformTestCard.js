import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActions, CardContent, Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import * as apiCallService from '../../services/apiCallService';

const CardStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  methodSelect: {
    width: 400,
  },
  endpointInput: {
    width: 400,
  },
}));

export default function PerformTestCard() {
  const cardClasses = CardStyles();

  return (
    <div>
      <Card className={cardClasses.root}>
        <h1>Perform Test</h1>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Controls.Select
              label='Request Method'
              options={apiCallService.getMethodCollection()}
            />
          </Grid>
          <Grid item md={9}>
            <Controls.Input
              // className={cardClasses.endpointInput}
              fullWidth
              label='API Endpoint'
              defaultValue='Default Value'
            ></Controls.Input>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
