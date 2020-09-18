import React from 'react'
import { withRouter } from 'react-router-dom'
import UserForm from './UserForm'

// InitialUser with preset data
const initialUser = {
    ID: (Math.random() * 100).toFixed(0),
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Phone: "",
    Actions: "",
}

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} UserCreate site with UserForm provided for user creation
 * routed at /user/new
 */
const UserCreate = (props) => {
    const onSubmit = (user) => {
        props.history.push({
            pathname: "/user",
            state: { type: "CREATE", payload: user }
        })
    }

    return (
    <div>
        <UserForm header="Create User" initialUser={initialUser} onSubmit={onSubmit} />
    </div>
    )
}

export default withRouter(UserCreate)
