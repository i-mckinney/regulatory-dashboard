import React from "react"
import { TextField } from "@material-ui/core"

/**
 * @return {JSX} returns a reusable form input text field component
 */
const HelixTextField = (props) => {

    /**
     * name: the form control name 
     * label: the form control label
     * value: the form control value
     * onChange: the function called on form change detection
     * other: other properties that TextField has
     */
    const { 
      name, 
      label, 
      value,
      onChange, 
      ...other
    } = props

  return (
    <TextField
    variant="outlined"
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    {...other}
    />
  )
}

export default HelixTextField