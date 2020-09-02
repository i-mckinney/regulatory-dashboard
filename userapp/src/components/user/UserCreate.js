import React from 'react'
import { withRouter } from 'react-router-dom'
import UserForm from './UserForm'

// InitialUser with preset data
const initialUser = {
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Phone: "",
  }

  /**
   * 
   * @param {Object} props Using the history property to route next component with data state
   * @return {JSX} UserCreate site with UserForm provided for user creation
   * routed at /user/new
   */
const UserCreate = (props) => {

    const onSubmit = (user) => {
        history.push({
            pathname: "/",
            state: { type: "CREATE" , user }
        })
    }

    return (
    <div>
        <UserForm initialUser={initialUser} onSubmit={onSubmit} />
    </div>
    )
}

export default withRouter(UserCreate)
