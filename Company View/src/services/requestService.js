const KEYS = {
  apiRequests: 'requests',
  apiRequestId: 'requestId',
};

export const getRequestMethods = () => [
  { id: '1', title: 'GET' },
  { id: '2', title: 'POST' },
  { id: '3', title: 'PUT' },
  { id: '4', title: 'PATCH' },
  { id: '5', title: 'DELETE' },
];

export function addApiRequest(data) {
  let requests = getAllApiRequests();
  data['id'] = generateApiRequestID;
  requests.push(data);
  localStorage.setItem(KEYS.apiRequests, JSON.stringify(requests));
}

export function generateApiRequestID() {
  if (localStorage.getItem(KEYS.apiRequestId) == null)
    localStorage.setItem(KEYS.apiRequestId, '0');
  var id = parseInt(localStorage.getItem(KEYS.apiRequestId))
  localStorage.setItem(KEYS.employeeId, (++id).toString())
  return id;
}

export function getAllApiRequests() {
  if (localStorage.getItem(KEYS.apiRequests) == null)
    localStorage.setItem(KEYS.apiRequests, JSON.stringify)([]);
  return JSON.parse(localStorage.getItem(KEYS.requests));
}
