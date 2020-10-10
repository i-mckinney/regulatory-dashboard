// Provides dropdown menu with available request Method options
export const getMethodCollection = () => [
  { id: 'GET', title: 'GET' },
  { id: 'POST', title: 'POST' },
  { id: 'PUT', title: 'PUT' },
  { id: 'DELETE', title: 'DELETE' },
];

export const getBodyFormat = () => [
  { id: 'Text', title: 'Text' },
  { id: 'Javascript', title: 'Javascript' },
  { id: 'JSON', title: 'JSON' },
  { id: 'HTML', title: 'HTML' },
  { id: 'XML', title: 'XML' },
];

export const getBodyType = () => [
  { id: 'none', title: 'none' },
  { id: 'raw', title: 'raw' },
  { id: 'GraphQL', title: 'GraphQL' },
];
