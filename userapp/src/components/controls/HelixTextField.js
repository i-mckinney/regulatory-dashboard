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
     * InputLabelProps: the properties of input label
     * value: the form control value
     * required: textfield is required to have value
     * helperText: a label that can provide content in the UI
     * placeholder: a text in the textfield with default value as a placeholder
     * onChange: the function called on form change detection
     * inputProps: the properties of input
     */
  const { name, type = "", error = false, label, InputLabelProps = {}, value, required = false, helperText = "", placeholder = "", onChange, inputProps = { maxLength: 26 } } = props

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
    />
  );
}

export default HelixTextField