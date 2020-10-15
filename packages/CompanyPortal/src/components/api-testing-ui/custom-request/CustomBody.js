import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';

import Controls from '../../controls/Controls';
import * as apiCallService from '../../../services/apiCallService';

/**
* CUSTOM REQUEST BODY 
* Interface that allows the user to set a custom request body
* Intended to be displayed as a tab panel and is a child of the Custom Request tab group component
*/


export default function CustomBody() {
  /**
  * @param {String} type state variable to store request body type
  */
  const [type, setType] = useState('none');

  /**
  *Handles change event when user selects request body type
  */
  const handleChange = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
  }, [type]);

  return (
    <div>
      <Typography>Use this tab to set a custom request body</Typography>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Controls.RadioGroup
            name='type'
            items={apiCallService.getBodyType()}
            width={true}
            onChange={handleChange}
            value={type}
          />
        </Grid>
        <Grid item md={2}>
          <Controls.Select
            label='Format'
            options={apiCallService.getBodyFormat()}
            width={true}
          />
        </Grid>
      </Grid>

      <div style={{ marginTop: '15px' }}>
        {type === 'none' ? (
          <div>
            <p style={{ color: 'gray' }}>This request does not have a body</p>
          </div>
        ) : type === 'raw' ? (
          <div>
            <Controls.Textarea
              options={apiCallService.getBodyFormat()}
              placeholder='must be a valid Format'
              width={true}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
