import React, { useState } from 'react'
import { makeStyles, Button, TextField, Grid }  from '@material-ui/core'

// Styling used for MaterialUi
const userFormStyles = makeStyles(() => ({
    userForm: {
        marginTop: '8rem',
        width: '50%',
        margin: 'auto',
    },
}));

/**
 * @return {JSX} UserCreate site
 * routed at /user/new
 */
const UserForm = ({ initialUser, onSubmit}) => {
    const [user, setUser] = useState(initialUser)
    const [errors, setErrors] = useState(initialUser)

    // Creates an object for styling. Any className that matches key in the userFormStyles object will have a corresponding styling
    const classes = userFormStyles()
    

    const handleInputChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
        validate(name, value)
    }

    const validate = (name, value) => {
        switch(name) {
            case "FirstName":
                if(value.length > 0) {
                    setErrors({ ...user, [name]: ""})
                } else {
                    setErrors({ ...user, [name]: "First name cannot be empty"})
                }
                break
            case "LastName":
                if(value.length > 0) {
                    setErrors({ ...user, [name]: ""})
                } else {
                    setErrors({ ...user, [name]: "Last name cannot be empty"})
                }
                break
            case "DateOfBirth":
                if(value.length > 0) {
                    setErrors({ ...user, [name]: ""})
                } else {
                    setErrors({ ...user, [name]: "Date Of Birth cannot be empty"})
                }
                break
            case "Phone":
                if(value.length > 0) {
                    setErrors({ ...user, [name]: ""})
                } else {
                    setErrors({ ...user, [name]: "Phone cannot be empty"})
                }
                break
            default:
                break
        }
    }

    const onSubmitForm = () => {
        onSubmit({ ...user });
    }

    const onResetForm = () => {
        setUser(initialUser)
    }

    return (
    <div>
        <form className={classes.userForm} autoComplete="off" onSubmit={onSubmitForm}>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item xs={6}>
                    <TextField
                        name='FirstName'
                        label='First Name'
                        value={user.FirstName}
                        onChange={handleInputChange}
                    />
                    {errors.FirstName.length > 0 && <span className='error'>{errors.FirstName}</span>}
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='LastName'
                        label='Last Name'
                        value={user.LastName}
                        onChange={handleInputChange}
                    />
                    {errors.LastName.length > 0 && <span className='error'>{errors.LastName}</span>}
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='DateOfBirth'
                        label='Date Of Birth'
                        value={user.DateOfBirth}
                        onChange={handleInputChange}
                    />
                    {errors.DateOfBirth.length > 0 && <span className='error'>{errors.DateOfBirth}</span>}
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='Phone'
                        label='Phone'
                        value={user.Phone}
                        onChange={handleInputChange}
                    />
                    {errors.Phone.length > 0 && <span className='error'>{errors.Phone}</span>}
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
                        type="reset"
                        size="large"
                        text="Clear"
                        onClick={onResetForm}>
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    </div>
    )
}

export default UserForm