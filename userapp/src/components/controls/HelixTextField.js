import React from 'react'
import { TextField } from '@material-ui/core'

/**
 * @return {JSX} returns a reusable form input text field component
 */
const HelixTextField = (props) => {

    /**
     * name: the form control name 
     * type: the type of component TextField (e.g. date)
     * label: the form control label
     * value: the form control value
     * onChange: the function called on form change detection
     * other: other properties that TextField has
     */
    const { 
      name, 
      type = "", 
      error = false, 
      label, 
      InputLabelProps = {}, 
      value,
      required = false,
      helperText = "", 
      placeholder = "", 
      onChange, 
      inputProps = { maxLength: 26 },
      ...other
    } = props

  return (
    <TextField
    error={error}
    label={label}
    InputLabelProps={InputLabelProps}
    name={name}
    type={type}
    value={value}
    required={required}
    helperText={helperText}
    placeholder={placeholder}
    onChange={onChange}
    inputProps={inputProps}
    {...other}
    />
  )
}

export default HelixTextField