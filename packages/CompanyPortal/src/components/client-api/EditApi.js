import React from 'react';
import { withRouter } from 'react-router-dom';
import NewApiForm from './NewApiForm';
import users from '../apis/users';

/**
 * @param {Object} props Using the history property to route next component with data state and location for state object
 * @return {JSX} EditApi site with NewApiForm provided for edit api
 * routed at /api/edit
 */
const EditApi = (props) => {
  const api = { ...props.location.state };
  const id = api._id;
  delete api._id;

  /**
   * @param {object} editedUser represent object with edited api props values
   */
  const editUser = async (editedUser) => {
    await users.put(`/users/${id}`, editedUser);
    props.history.push('/users');
  };

  return (
    <div>
      <NewApiForm header='Edit User' initialUser={api} onSubmit={editUser} />
    </div>
  );
};

export default withRouter(EditApi);
