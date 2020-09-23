import React from 'react';
import { withRouter } from 'react-router-dom';
import NewApiForm from './NewApiForm';
import users from '../apis/users';
import { columnFields } from '../../config';

// InitialUser with preset data
const initialUser = {};
columnFields.forEach((columnField) => {
  initialUser[[columnField]] = '';
});

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} CreateApi site with NewApiForm provided for user creation
 * routed at /user/new
 */
const CreateApi = (props) => {
  /**
   * @param {object} user represent user object with props values that it will create
   */
  const createUser = async (user) => {
    user['createdAt'] = '';
    user['updatedAt'] = '';
    user['Actions'] = '';
    await users.post('/users', user);
    props.history.push('/users');
  };

  return (
    <div>
      <NewApiForm
        header='Create User'
        initialUser={initialUser}
        onSubmit={createUser}
      />
    </div>
  );
};

export default withRouter(CreateApi);
