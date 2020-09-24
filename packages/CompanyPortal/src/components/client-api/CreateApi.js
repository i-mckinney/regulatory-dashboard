import React from 'react';
import { withRouter } from 'react-router-dom';
// import NewApiForm from './NewApiForm';
import users from '../apis/users';
import { columnFields } from '../../config';
import ApiCallForm from './ApiCallForm';
// import * as apiCallService from '../../services/apiCallService';


// InitialUser with preset data
const initialUser = {};
columnFields.forEach((columnField) => {
  initialUser[[columnField]] = '';
});

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} CreateApi site with NewApiForm provided for api creation
 * routed at /api/new
 */
const CreateApi = (props) => {
  /**
   * @param {object} api represent api object with props values that it will create
   */
  const createUser = async (api) => {
    api['createdAt'] = '';
    api['updatedAt'] = '';
    api['Actions'] = '';
    await users.post('/users', api);
    props.history.push('/users');
  };

  return (
    <div>
      <ApiCallForm/>
      {/* <NewApiForm
        header='Add API Call'
        initialUser={initialUser}
        onSubmit={createUser}
      /> */}
    </div>
  );
};

export default withRouter(CreateApi);
