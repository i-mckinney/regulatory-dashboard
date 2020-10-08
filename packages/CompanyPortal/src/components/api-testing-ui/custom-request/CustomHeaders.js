import React from 'react';


import Controls from '../../controls/Controls';

export default function CustomHeaders() {
  return (
    <div>
      <p>custom request headers section</p>
      <Controls.Button text='Add Item' size='medium' />
    </div>
  );
}
