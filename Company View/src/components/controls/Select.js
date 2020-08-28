import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from '@material-ui/core';

/**
 * @return {JSX} returns a reusable Select form control component
 */
export default function Select(props) {
  /** 
   name: the form control name
   label: the form control label
   value: the form control value
   onChange: the function called on form control change
   options: an array of objects containing the select menu options
  */
  const { name, label, value, onChange, options } = props;
  return (
    <FormControl variant='outlined'>
      <InputLabel> {label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value=''>None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
