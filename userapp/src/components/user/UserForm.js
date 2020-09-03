import React, { useState } from 'react'
import { makeStyles, Grid }  from '@material-ui/core';
import HelixTextField from '../controls/HelixTextField'

// Styling used for MaterialUi
const userFormStyles = makeStyles((theme) => ({
root: {
    '& .MuiFormControl-root': {
    width: '80%',
    margin: theme.spacing(1),
    },
    '& > *': {
    margin: theme.spacing(1),
    },
},
}));

/**
 * @param {object} initialUser object with preset empty data
 * @return {JSX} UserCreate site
 * routed at /user/new
 */
const UserForm = ({ initialUser }) => {
    // Set user with preset empty data for user creation e.g. { FirstName: "", LastName: "", ...}
    const [user, setUser] = useState(initialUser);

    // Creates an object for styling. Any className that matches key in the userFormStyles object will have a corresponding styling
    const userFormClasses = userFormStyles();
    
    /**
     * @param {Object} event the event object
     * name: the name property on the target text field element
     * value: the value property on the target text field element
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (
    <div>
        <form className={userFormClasses.root} autoComplete="off" >
         {/* onSubmit={handleSubmit}> */}
            <Grid container>
                <Grid item xs={3}>
                    <HelixTextField
                        name='FirstName'
                        label='First Name'
                        value={user.FirstName}
                        onChange={handleInputChange}
                    />
                    <HelixTextField
                        name='LastName'
                        label='Last Name'
                        value={user.LastName}
                        onChange={handleInputChange}
                    />
                    <HelixTextField
                        name='DateOfBirth'
                        label='Date Of Birth'
                        value={user.DateOfBirth}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    {/* <div style={buttonStyle}>
                        <Controls.Button type='submit' size='large' text='Save' />
                        <Controls.Button
                        type='Reset'
                        size='large'
                        text='Clear'
                        onClick={resetForm}
                        />
                    </div> */}
                </Grid>
            </Grid>
        </form>
    </div>
    )
}

export default UserForm