// sortableExcludes is array of identifier that we do not want to sort
export const sortableExcludes = ['_id'];

// columnExcludes is array of identifier that we do not want to display in the table
export const columnExcludes = ['requestBody'];

// columnFields is array of fields that NewApiForm will have
export const columnFields = [];

// columnLabels is array of label name that correspondings to columnFields EXCEPT _id (primary key)
// PRIMARY KEY must be FIRST in the array (required)
// These KEYS must be LAST in the array (required unless place it in columnExcludes)
// (1) User Created ( It replaces "createdAt" (mongodb semantics) )
// (2) User Updated ( It replaces "updatedAt" (mongodb semantics) )
// (3) Actions
export const columnLabels = [
  '_id',
  'Request Name',
  'Request Method',
  'Request URL',
  'Request Body',
  'Actions',
];

export const columnMetadata = [
  {
    key: 'requestName',
    label: 'Request Name',
  },
  {
    key: 'requestType',
    label: 'Request Method',
  },
  {
    key: 'requestUrl',
    label: 'Request URL',
  },
];

// dateTypeFields is array of fieldname that are date type
export const dateTypeFields = ['DateOfBirth'];
