import React, { useState } from 'react'
import { makeStyles, Button, Grid }  from '@material-ui/core'
import HelixTextField from '../controls/HelixTextField'

// Styling used for MaterialUI
const userFormStyles = makeStyles(() => ({
    userForm: {
        marginTop: '8rem',
        width: '50%',
        margin: 'auto',
    },
}));

/**
 * @param {object} initialUser represent preset empty user data object
 * @param {func} onSubmit represent a func from parent component pass down to child component to retrieve input form information
 * @return {JSX} UserForm site with input form to fill in
 * routed at /user/new
 */
const UserForm = ({ initialUser, onSubmit}) => {
    // Set user with preset empty data for user creation e.g. { FirstName: "", LastName: "", ...}
    const [user, setUser] = useState(initialUser)
    
    // Perform error check for form validatation upon user data
    // const [errors, setErrors] = useState(initialUser)

    // Creates an object for styling. Any className that matches key in the userFormStyles object will have a corresponding styling
    const userFormClasses = userFormStyles()
    
    /**
     * @param {Object} event the event object
     * name: the name property on the target text field element
     * value: the value property on the target text field element
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
        // validate(name, value)
    }

    /**
     * TODO: Function will need to change
     * @param {string} name represent accessor of the object
     * @param {string} value represent the keyboard input value from the event object
     */
    // const validate = (name, value) => {
    //     switch(name) {
    //         case "FirstName":
    //             if(value.length > 3) {
    //                 console.log("no name")
    //                 setErrors({ ...user, [name]: ""})
    //             } else {
    //                 setErrors({ ...user, [name]: "First name cannot be empty"})
    //             }
    //             break
    //         case "LastName":
    //             if(value.length > 3) {
    //                 setErrors({ ...user, [name]: ""})
    //             } else {
    //                 setErrors({ ...user, [name]: "Last name cannot be empty"})
    //             }
    //             break
    //         case "DateOfBirth":
    //             if(value.length === 8) {
    //                 setErrors({ ...user, [name]: ""})
    //             } else {
    //                 setErrors({ ...user, [name]: "Date of Birth should be  MMDDYYYY"})
    //             }
    //             break
    //         case "Phone":
    //             if(value.length === 10) {
    //                 setErrors({ ...user, [name]: ""})
    //             } else {
    //                 setErrors({ ...user, [name]: "Phone must have length of 10"})
    //             }
    //             break
    //         default:
    //             break
    //     }
    // }

    /**
     * @param {Object} event the event object 
     * Send the created user back to parent component
     */
    const onSubmitForm = (event) => {
        event.preventDefault()
        onSubmit(user);
    }

    return (
    <div>
        <form className={userFormClasses.userForm} autoComplete="off" onSubmit={onSubmitForm}>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item xs={6}>
                    <HelixTextField
                        name='FirstName'
                        label='First Name'
                        value={user.FirstName}
                        onChange={handleInputChange}
                    />
                    {/* {errors.FirstName.length > 0 && <span className='error'>{errors.FirstName}</span>} */}
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                        name='LastName'
                        label='Last Name'
                        value={user.LastName}
                        onChange={handleInputChange}
                    />
                    {/* {errors.LastName.length > 0 && <span className='error'>{errors.LastName}</span>} */}
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                        name='DateOfBirth'
                        label='Date Of Birth'
                        value={user.DateOfBirth}
                        onChange={handleInputChange}
                    />
                    {/* {errors.DateOfBirth.length > 0 && <span className='error'>{errors.DateOfBirth}</span>} */}
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                        name='Phone'
                        label='Phone'
                        value={user.Phone}
                        onChange={handleInputChange}
                    />
                    {/* {errors.Phone.length > 0 && <span className='error'>{errors.Phone}</span>} */}
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Button 
                        color="primary" 
                        variant="contained" 
                        type="submit" 
                        size="large">
                            Save
                        </Button>
                        <Button
                        color="default"
                        variant="contained"
                        type="cancel"
                        size="large"
                        href="/">
                            Cancel
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    </div>
    )
}

export default UserForm