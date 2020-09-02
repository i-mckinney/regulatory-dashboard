import React from 'react'
import { withRouter } from 'react-router-dom'
import UserForm from './UserForm'

const initialUser = {
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Phone: "",
  }

  /**
 * @return {JSX} UserCreate site
 * routed at /user/new
 */
const UserCreate = ({ history }) => {

    const onSubmit = (userValues) => {
        createUser(userValues)
    }

    const createUser = (userValues) => {
        console.log(userValues)
    }
    return (
    <div>
        <UserForm initialUser={initialUser} onSubmit={onSubmit} />
    </div>
    )
}

export default withRouter(UserCreate)
