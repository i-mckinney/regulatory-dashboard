import React from 'react';
import { TextareaAutosize } from '@material-ui/core';

export default function TextArea(props) {
  const { value, placeholder, onChange, width } = props;
  return (
    <TextareaAutosize
      rowsMin={20}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ width: width && '100%' }}
    />
  );
}
