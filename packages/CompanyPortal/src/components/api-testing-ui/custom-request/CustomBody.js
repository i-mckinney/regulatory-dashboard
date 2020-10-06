import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, Grid } from '@material-ui/core';
import Controls from '../../controls/Controls';
import * as apiCallService from '../../../services/apiCallService';

export default function CustomBody() {
  const [type, setType] = useState('none');

  const handleChange = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    console.log('type', type);
  }, [type]);

  return (
    <div>
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
