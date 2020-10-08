import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

/**
 * @param {Object} initialFieldValues the initial set form control values
 * @param {Boolean} validateOnChange determines if form should be validated as the user types
 * @param {Function} validate function for validation logic set at the form component level
 * @returns {Object} containing the values state object, setValues function, handleInputChange function and resetForm function
 */
export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  /**
   * @param {Object} e the event object
   * name: the name property on the target form control element
   * value: the value property on the target form control element
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
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
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete='off' {...other}>
      {props.children}
    </form>
  );
}
