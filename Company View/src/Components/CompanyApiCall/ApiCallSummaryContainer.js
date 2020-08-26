import React from 'react';
import RequestUrlTextField from './RequestUrlTextField';
import MethodSelect from './MethodSelect';
import SaveRequestButton from './SaveRequestButton';
import ApiCallSummary from './ApiCallSummary';

export default (props) => (
  <div>
    <div style={{ display: 'flex' }}>
      <MethodSelect />
      <RequestUrlTextField />
      <SaveRequestButton />
    </div>
    <ApiCallSummary />
  </div>
);
