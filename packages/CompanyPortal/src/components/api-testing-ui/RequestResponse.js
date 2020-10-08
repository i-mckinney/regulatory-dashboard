import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';

const ResponseStyles = makeStyles({
  root: {
    height: 500,
    width: '75%',
    margin: '0 auto',
    paddingTop: 50,
  },
});

export default function RequestResponse() {
  const responseClasses = ResponseStyles();

  return (
    <div className={responseClasses.root}>
      <Paper variant='outlined' square width={1 / 2}>
        <div>
          <p>Request response goes here</p>
        </div>
      </Paper>
    </div>
  );
}
