import React, { useState } from 'react'
import { makeStyles, Button, Grid, Typography }  from '@material-ui/core'
import HelixTextField from '../controls/HelixTextField'

// Styling used for MaterialUI
const userFormStyles = makeStyles(() => ({
    userFormStyle: {
        marginTop: '8rem',
        width: '50%',
        margin: 'auto',
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'block',
        position: 'relative',
        padding: '48px',
        borderRadius: '4px',
    },
    buttonStyle: {
        '& button': {
            marginTop: '16px',
            marginRight: '16px',
        },
        '& a': {
            marginTop: '16px',
            marginRight: '16px',
        }
    },
}));

/**
 * @param {object} initialUser represent preset empty user data object
 * @param {func} onSubmit represent a func from parent component pass down to child component to retrieve input form information
 * @return {JSX} UserForm site with input form to fill in
 * routed at /user/new
 */
const UserForm = ({ initialUser, header, onSubmit}) => {
    // Set user with preset empty data for user creation e.g. { FirstName: "", LastName: "", ...}
    const [user, setUser] = useState(initialUser)
    
    // Perform error check for form validatation upon user data
    const [errors, setErrors] = useState(initialUser)

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
        validate(name, value)
    }

    /**
     * @param {string} name represent accessor of the object
     * @param {string} value represent the keyboard input value from the event object
     */
    const validate = (name, value) => {
    }

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
        <form className={userFormClasses.userFormStyle} autoComplete="off" onSubmit={onSubmitForm}>
            <Typography variant="h5" component="h2">{header}</Typography>
            <Grid container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}>
                <Grid item xs={6}>
                    <HelixTextField
                    name='FirstName'
                    label='First Name'
                    value={user.FirstName}
                    required={true}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                    name='LastName'
                    label='Last Name'
                    value={user.LastName}
                    required={true}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                    name='DateOfBirth'
                    label='Date Of Birth'
                    value={user.DateOfBirth}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                    name='Phone'
                    label='Phone'
                    value={user.Phone}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs></Grid>
                <Grid item xs={6} className={userFormClasses.buttonStyle}>
                    <Button 
                    color="primary" 
                    variant="contained" 
                    type="submit" 
                    size="small">
                        Save
                    </Button>
                    <Button
                    color="default"
                    variant="contained"
                    type="cancel"
                    size="small"
                    href="/">
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </form>
    </div>
    )
}

export default UserForm