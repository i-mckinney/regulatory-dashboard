import React from 'react';

import Controls from '../../controls/Controls';

export default function CustomParams() {
  return (
    <div>
      <p>custom request params section</p>
      <Controls.Button
      text='Add Item'
      size='medium'/>
    </div>
  );
}
