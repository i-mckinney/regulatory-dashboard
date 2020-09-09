import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import * as apiCallService from '../../services/apiCallService';

const initialFValues = {
  id: 0,
  departmentId: '',
  requestName: '',
  requestUrl: '',
  requestDescription: '',
};

/**
 * @return {JSX} returns a custom form constructed with individual form control components
 */
export default function ApiCallForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('departmentId' in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? '' : 'This field is required.';
    if ('requestName' in fieldValues)
      temp.requestName =
        fieldValues.requestName.length > 2 ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Select
            name='departmentId'
            label='METHOD'
            value={values.departmentId}
            onChange={handleInputChange}
            options={apiCallService.getMethodCollection()}
            error={errors.departmentId}
          />
          <Controls.Input
            name='requestDescription'
            label='Request Name'
            value={values.requestDescription}
            onChange={handleInputChange}
            error={errors.requestDescription}
          />
          <Controls.Input
            label='Request URL'
            name='requestName'
            value={values.requestName}
            onChange={handleInputChange}
            error={errors.requestName}
          />
          <Controls.Input
            label='Description'
            name='requestUrl'
            value={values.requestUrl}
            onChange={handleInputChange}
            error={errors.requestUrl}
          />
          <div>
            <Controls.Button type='submit' text='Save' />
            <Controls.Button
              text='Cancel'
              color='default'
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
