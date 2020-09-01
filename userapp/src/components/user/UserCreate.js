import React from 'react'
import UserForm from './UserForm'

const initialUser = {
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Phone: "",
    Address: "",
    City: "",
    State: "",
    ZipCode: "",
  }

  /**
 * @return {JSX} UserCreate site
 * routed at /user/new
 */
const UserCreate = () => {
    return (
    <div>
        <UserForm initialUser={initialUser} />
    </div>
    )
}

export default UserCreate
