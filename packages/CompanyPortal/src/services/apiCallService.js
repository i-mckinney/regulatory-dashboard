const KEYS = {
  apiCallList: 'apiCallList',
  apiCallId: 'apiCallId',
};

// Provides ApiCallForm with available options for the Methods dropdown select menu
export const getMethodCollection = () => [
  { id: '1', title: 'GET' },
  { id: '2', title: 'POST' },
  { id: '3', title: 'PUT' },
  { id: '4', title: 'DELETE' },
];

// Saving data from ApiCallForm in local storage until backend is set up
export function addNewApiCall(data) {
  let apiCallList = getAllApiCalls();
  data['id'] = generateApiCallId();
  apiCallList.push(data);
  localStorage.setItem(KEYS.apiCallList, JSON.stringify(apiCallList));
}

// Updates API table records
export function updateApiCall(data) {
  let apiCallList = getAllApiCalls();
  let recordIndex = apiCallList.findIndex((x) => x.id === data.id);
  apiCallList[recordIndex] = { ...data };
  localStorage.setItem(KEYS.apiCallList, JSON.stringify(apiCallList));
}

export function generateApiCallId() {
  if (localStorage.getItem(KEYS.apiCallId) == null)
    localStorage.setItem(KEYS.apiCallId, '0');
  var id = parseInt(localStorage.getItem(KEYS.apiCallId));
  localStorage.setItem(KEYS.apiCallId, (++id).toString());
  return id;
}

// Retrieves all of the API request records that have been stored 
export function getAllApiCalls() {
  if (localStorage.getItem(KEYS.apiCallList) == null)
    localStorage.setItem(KEYS.apiCallList, JSON.stringify([]));
  let apiCallList = JSON.parse(localStorage.getItem(KEYS.apiCallList));
  let apiMethods = getMethodCollection();
  return apiCallList.map((x) => ({
    ...x,
    department: apiMethods[x.departmentId - 1].title,
  }));
}
