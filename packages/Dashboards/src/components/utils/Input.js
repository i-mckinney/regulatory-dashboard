import React from 'react';
import { TextField } from '@material-ui/core';

/**
 * @return {JSX} returns a reusable form input form control component
 */
export default function Input(props) {
  /** 
  name: the form control name 
  label: the form control label
  value: the form control value
  onChange: the function called on form change detection
  */
  const { name, label, value, onChange, width, padding, InputProps } = props;

  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: width && '100%' , padding: padding && '0.5rem'}}
      InputProps={InputProps}
    />
  );
}
