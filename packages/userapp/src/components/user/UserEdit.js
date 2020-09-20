import React from 'react'
import { withRouter } from 'react-router-dom'
import UserForm from './UserForm'
import users from '../apis/users'

/**
 * @param {Object} props Using the history property to route next component with data state and location for state object
 * @return {JSX} UserEdit site with UserForm provided for edit user
 * routed at /user/edit
 */
const UserEdit = (props) => {
    const user = { ...props.location.state }
    const id = user._id
    delete user._id

    const onSubmitEditedUser = async (editedUser) => {
        await users.put(`/users/${id}`, editedUser)
        props.history.push("/user")
    }

    return (
    <div>
        <UserForm header="Edit User" initialUser={user} onSubmit={onSubmitEditedUser} />
    </div>
    )
}

export default withRouter(UserEdit)
