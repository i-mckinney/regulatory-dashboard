import React from 'react'
import { TextField } from '@material-ui/core'

/**
 * @return {JSX} returns a reusable form input text field component
 */
const HelixTextField = (props) => {

    /**
     * name: the form control name 
     * label: the form control label
     * value: the form control value
     * onChange: the function called on form change detection
     */
  const { name, error = false, label, value, required = false, helperText = "", placeholder = "", onChange } = props

  return (
    <TextField
      error={error}
      label={label}
      name={name}
      value={value}
      required={required}
      helperText={helperText}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default HelixTextField