import React from 'react'
import { withRouter } from 'react-router-dom'
import UserForm from './UserForm'

/**
 * @param {Object} props Using the history property to route next component with data state and location for state object
 * @return {JSX} UserEdit site with UserForm provided for edit user
 * routed at /user/edit
 */
const UserEdit = (props) => {
    const user = props.location.state

    const onSubmit = (editedUser) => {
        props.history.push({
            pathname: "/user",
            state: { type: "UPDATE", payload: editedUser }
        })
    }

    return (
    <div>
        <UserForm header="Edit User" initialUser={user} onSubmit={onSubmit} />
    </div>
    )
}

export default withRouter(UserEdit)
