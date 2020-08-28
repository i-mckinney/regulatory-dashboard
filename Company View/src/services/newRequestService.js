const KEYS = {
  apiRequests: 'requests',
  apiRequestId: 'requestId',
};

// Provides AddRequestForm component with available options for the Methods dropdown select menu
export const getRequestMethods = () => [
  { id: '1', title: 'GET' },
  { id: '2', title: 'POST' },
  { id: '3', title: 'PUT' },
  { id: '4', title: 'PATCH' },
  { id: '5', title: 'DELETE' },
];

// Saving data from AddRequestForm in local storage in lieu of a set up backend
export function addNewApiRequest(data) {
  let requests = getAllApiRequests();
  data['id'] = generateApiRequestId();
  requests.push(data);
  localStorage.setItem(KEYS.apiRequests, JSON.stringify(requests));
}
// Generating unique new request id
export function generateApiRequestId() {
  if (localStorage.getItem(KEYS.apiRequestId) == null)
    localStorage.setItem(KEYS.apiRequestId, '0');
  var id = parseInt(localStorage.getItem(KEYS.apiRequestId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

// Retrieves all of the API request records that have been stored inside the key 'request'
export function getAllApiRequests() {
  if (localStorage.getItem(KEYS.apiRequests) == null)
    localStorage.setItem(KEYS.apiRequests, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEYS.requests));
}
