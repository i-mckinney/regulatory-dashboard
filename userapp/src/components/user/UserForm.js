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

//Used to perform error checks for validation
const userError = {
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Phone: "",
}

/**
 * @param {object} initialUser represent preset empty user data object
 * @param {string} header represent the header title of this form
 * @param {func} onSubmit represent a func from parent component pass down to child component to retrieve input form information
 * @return {JSX} UserForm site with input form to fill in
 * routed at /user/new
 */
const UserForm = ({ initialUser, header, onSubmit}) => {
    // Set user with preset empty data for user creation e.g. { FirstName: "", LastName: "", ...}
    const [user, setUser] = useState(initialUser)
    
    // Perform error check for form validatation upon user data
    const [error, setError] = useState(userError)

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
        switch(name) {
            case "FirstName":
                if(value.length === 0) {
                    setError({ ...error, [name]: "First Name cannot be empty" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break
            case "LastName":
                if(value.length === 0) {
                    setError({ ...error, [name]: "Last Name cannot be empty" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break
            case "Phone":
                if(0 < value.length && value.length < 10) {
                    setError({ ...error, [name]: "Must be length of 10" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break
            default:
                break
        }
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
                    error={error.FirstName.length !== 0}
                    name='FirstName'
                    label='First Name'
                    value={user.FirstName}
                    required={true}
                    placeholder="John"
                    helperText={error.FirstName}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                    error={error.LastName.length !== 0}
                    name='LastName'
                    label='Last Name'
                    value={user.LastName}
                    required={true}
                    placeholder="Doe"
                    helperText={error.LastName}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                    name='DateOfBirth'
                    label='Date Of Birth'
                    type="date"
                    value={user.DateOfBirth}
                    InputLabelProps={{ shrink: true }}
                    onChange={handleInputChange}
                    />
                </Grid>
                {error.DateOfBirth.length > 0 && <span className='error'>{error.DateOfBirth}</span>}
                <Grid item xs={6}>
                    <HelixTextField
                    error={error.Phone.length > 0}
                    name='Phone'
                    label='Phone'
                    value={user.Phone}
                    helperText={error.Phone}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 10 }}
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