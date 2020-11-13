import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import CancelIcon from '@material-ui/icons/Cancel';
import { v4 as uuidv4 } from 'uuid';

import Controls from '../../controls/Controls';

/**
* CUSTOM HEADERS Component
* UI that allows the user to set custom request headers
* Intended to be displayed as a tab panel and is a child of the Custom Request tab group component
*/

/**
* Method generates an object used to store custom params, headers, and mappings set by the user when interacting with the custom request interface
* @returns {Object} Returns a new field object with a generated unique ID, key and value pair. 
*/
const createNewField = () => ({ id: uuidv4(), key: '', value: '' });

export default function CustomParams({ fields, onChange }) {
  useEffect(() => {
    onChange(fields);
  }, [fields, onChange]);

  /**
  * Spreads over the existing header fields object, and adds a newly created field property to the object 
  */
  const handleFieldIncrement = () => {
    onChange([...fields, createNewField()]);
  };

  /**
  * Removes field by targeting unique ID on click event
  * @param {String} id unique field object id generated on object creation
  */
  const removeField = (id) => {
    onChange(fields.filter((f) => f.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <Typography>Use this tab to set custom request headers</Typography>
        <Grid container spacing={0}>
          <Grid item md={5}>
            <h4>Key</h4>
          </Grid>
          <Grid item md={5}>
            <h4>Value</h4>
          </Grid>
        </Grid>

        {fields.map((f, i) => {
          const onFieldChange = (fieldName) => (e) =>
            onChange(
              fields.map((otherField) =>
                otherField.id === f.id
                  ? { ...otherField, [fieldName]: e.target.value }
                  : otherField
              )
            );
          return (
            <Grid container spacing={2} key={f.id}>
              <Grid item md={5}>
                <Controls.Input
                  label='Key'
                  defaultValue='Default Value'
                  width={true}
                  value={f.key}
                  onChange={onFieldChange('key')}
                ></Controls.Input>
              </Grid>
              <Grid item md={5}>
                <Controls.Input
                  label='Value'
                  defaultValue='Default Value'
                  width={true}
                  value={f.value}
                  onChange={onFieldChange('value')}
                ></Controls.Input>
              </Grid>
              <Grid style={{ display: 'flex', alignItems: 'center' }}>
                <CancelIcon onClick={() => removeField(f.id)} />
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
