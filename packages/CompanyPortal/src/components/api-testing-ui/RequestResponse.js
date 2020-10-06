import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '80%',
  },
});

export default function RequestResponse() {
  const classes = useStyles();

  return (
    <div width='100%'>
      <Paper variant='outlined' square width={1/2}>
        <div>
          <p>Request response goes here</p>
        </div>
      </Paper>
    </div>
  );
}
