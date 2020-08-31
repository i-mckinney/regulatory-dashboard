import React from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
} from '@material-ui/core';

/**
 * @return {JSX} returns a reusable Radio Group form control component
 */
export default function RadioGroup(props) {
  /** 
  name: the form control name 
  label: the form control label
  value: the form control value
  onChange: the function called on form change detection
  items: an array of radio button objects defining radio button value and title
  */
  const { name, label, value, onChange, items } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row={true} name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          ></FormControlLabel>
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}
