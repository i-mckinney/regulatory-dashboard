import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { v4 as uuidv4 } from 'uuid';

import Controls from '../../controls/Controls';

export default function CustomMapping() {
  const [fields, setFields] = useState([uuidv4()]);

  useEffect(() => {
    console.log('fields', fields.length);
  }, [fields]);

  const handleFieldIncrement = () => {
    setFields((prevValue) => [...prevValue, uuidv4()]);
  };

  const removeField = (id) => {
    let getFields = [...fields];
    getFields = getFields.filter((f) => f !== id);
    setFields(getFields);
  };

  return (
    <div>
      <Typography>
        Use this tab to map data values from external sources
      </Typography>
      <div style={{ marginBottom: '12px' }}>
        <Grid container spacing={0}>
          <Grid item md={5}>
            <h4>Key</h4>
          </Grid>
          <Grid item md={5}>
            <h4>Value</h4>
          </Grid>
        </Grid>

        {fields.map((f, i) => {
          return (
            <Grid container spacing={2} key={f}>
              <Grid item md={5}>
                <Controls.Input
                  label='Key'
                  defaultValue='Default Value'
                  width={true}
                ></Controls.Input>
              </Grid>
              <Grid item md={5}>
                <Controls.Input
                  label='Value'
                  defaultValue='Default Value'
                  width={true}
                ></Controls.Input>
              </Grid>
              <Grid style={{ display: 'flex', alignItems: 'center' }}>
                <CancelIcon onClick={() => removeField(f)} />
              </Grid>
            </Grid>
          );
        })}
      </div>

      <Controls.Button
        text='Add Item'
        size='medium'
        onClick={handleFieldIncrement}
      />
    </div>
  );
}
