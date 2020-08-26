import React from 'react';
import ApiCallSummaryContainer from './CompanyApiCall/ApiCallSummaryContainer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const style = {
  Grid: { padding: 150, marginTop: 20, marginBottom: 20 },
};

export default (props) => (
  <Grid container spacing={0} style={style.Grid}>
    <Grid item xs={4}>
      <Paper>
        <h1>List Goes Here</h1>
      </Paper>
    </Grid>
    <Grid item xs={8}>
      <Paper>
        <ApiCallSummaryContainer />
      </Paper>
    </Grid>
  </Grid>
);
