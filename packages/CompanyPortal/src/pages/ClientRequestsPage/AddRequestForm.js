import React from 'react';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import * as newRequestService from '../../services/newRequestService';

const initialFieldValues = {
  id: 0,
  requestName: '',
  requestMethod: '',
  requestUrl: '',
  requestDescription: '',
  addParameters: '',
  requestParams: '',
  requestAuth: '',
  requestHeaders: '',
  requestBody: '',
  addRequestToCollection: false,
  requestAddedDate: new Date(),
};

const parametersYesNo = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
];

const buttonStyle = {
  marginTop: '150px',
};

/**
 * @return {JSX} returns a custom form constructed with individual form control components
 */
export default function AddRequestForm() {
  const { values, handleInputChange, resetForm } = useForm(
    initialFieldValues
  );

  /**
   * @param {Object} e the submit event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    newRequestService.addNewApiRequest(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='requestName'
            label='Request Name'
            value={values.requestName}
            onChange={handleInputChange}
          />
          <Controls.Input
            name='requestDescription'
            label='Request Description'
            value={values.requestDescription}
            onChange={handleInputChange}
          />
          <Controls.Select
            name='requestMethod'
            label='Method'
            value={values.requestMethod}
            onChange={handleInputChange}
            options={newRequestService.getRequestMethods()}
          />
          <Controls.Input
            name='requestUrl'
            label='Request URL'
            value={values.requestUrl}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='addParameters'
            label='Add Parameters'
            value={values.addParameters}
            onChange={handleInputChange}
            items={parametersYesNo}
          />
          <div style={buttonStyle}>
            <Controls.Button type='submit' size='large' text='Save' />
            <Controls.Button
              type='Reset'
              size='large'
              text='Clear'
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
