import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';


/**
 * @param {Object} initialFieldValues the initial set form control values
 * @returns {Object} containing the values state object, setValues function, handleInputChange function and resetForm function
 */
export function useForm(initialFieldValues) {
  const [values, setValues] = useState(initialFieldValues);

  /**
   * @param {Object} e the event object
   * name: the name property on the target form control element
   * value: the value property on the target form control element
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the value of the form control from which the onChange function is triggered
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialFieldValues);
  };

  return { values, setValues, handleInputChange, resetForm };
}


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete='off'>
      {props.children}
    </form>
  );
}
