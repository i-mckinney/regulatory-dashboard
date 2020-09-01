import React, { useState } from 'react'
import { makeStyles,
    TextField,
    Grid,
}  from '@material-ui/core';

  const useStyles = makeStyles((theme) => ({
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
 * @return {JSX} UserCreate site
 * routed at /user/new
 */
const UserForm = ({ initialUser }) => {
    const [user, setUser] = useState(initialUser);
    const classes = useStyles();
    

    const handleInputChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    return (
    <div>
        <form className={classes.root} autoComplete="off" >
         {/* onSubmit={handleSubmit}> */}
            <Grid container>
                <Grid item xs={3}>
                    <TextField
                        name='FirstName'
                        label='First Name'
                        value={user.FirstName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name='LastName'
                        label='Last Name'
                        value={user.LastName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name='DateOfBirth'
                        label='Date Of Birth'
                        value={user.DateOfBirth}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    Hello
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