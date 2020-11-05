import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
  import { Card, Grid } from '@material-ui/core';
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

/**
* ADD/EDIT REQUEST HEADER CARD Component
* Displays and captures core custom request data such as Request Name, Request Method, and Request Endpoint
* Child of the ApiTestUi modal component
*/

/**
 * @param {String} name the request name
 * @param {String} method the request method type
 * @param {String} url the request URL
 */
export default function PerformTestCard({ name, method, url, setName, setMethod, setUrl }) {
  const cardClasses = CardStyles();

  return (
    <div>
      <Card className={cardClasses.root}>
        <Grid container spacing={2}>
          <Grid item md={12} style={{ marginLeft: 'auto' }}>
            <Controls.Input
              fullWidth
              label='Request Name'
              defaultValue='Default Value'
              width={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Controls.Input>
          </Grid>
          <Grid item md={3}>
            <Controls.Select
              label='Request Method'
              options={apiCallService.getMethodCollection()}
              width={true}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </Grid>
          <Grid item md={8} style={{ marginLeft: 'auto' }}>
            <Controls.Input
              // className={cardClasses.endpointInput}
              fullWidth
              label='API Endpoint'
              defaultValue='Default Value'
              width={true}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            ></Controls.Input>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
