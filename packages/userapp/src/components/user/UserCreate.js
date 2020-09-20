import React from 'react'
import { withRouter } from 'react-router-dom'
import UserForm from './UserForm'
import users from '../apis/users'

// InitialUser with preset data
const initialUser = {
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Phone: "",
}

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} UserCreate site with UserForm provided for user creation
 * routed at /user/new
 */
const UserCreate = (props) => {
    const onSubmitCreateUser = async (user) => {
        await users.post("/users", user)
        props.history.push("/user")
    }

    return (
    <div>
        <UserForm header="Create User" initialUser={initialUser} onSubmit={onSubmitCreateUser} />
    </div>
    )
}

export default withRouter(UserCreate)
