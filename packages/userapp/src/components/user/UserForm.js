import React, { useState } from 'react'
import { makeStyles, Grid, Typography }  from '@material-ui/core'
import HelixTextField from '../controls/HelixTextField'
import HelixButton from '../controls/HelixButton'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

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
    Actions: "",
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
     * value: the value property on the target text field element as user input text
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
        validation(name, value)
    }

    /**
     * 
     * @param {string} name  the name property on the target text field element
     * @param {string} value the value property on the target text field element as user input text
     * @param {string} label the label is used for logging errors
     */
    const validate = (name, value, label) => {
        if(name === "Phone" && 0 < value.length && value.length < 10) {
            setError({ ...error, [name]: `${label} must be length of 10` })
        }
        else if((name === "FirstName" || name === "LastName") && value.length === 0) {
            setError({ ...error, [name]: `${label} cannot be empty` })
        }
        else {
            setError({ ...error, [name]: "" })
        }
    }

    /**
     * @param {string} name represent accessor of the object
     * @param {string} value represent the keyboard input value from the event object
     */
    const validation = (name, value) => {
        switch(name) {
            case "FirstName":
                validate(name, value, "First Name")
                break
            case "LastName":
                validate(name, value, "Last Name")
                break
            case "Phone":
                validate(name, value, "Phone")
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

    /**
     * @param {string} name the form control name 
     * @param {string} label the form control label
     * @param {string} placeholder a text in the textfield with default value as a placeholder
     * @param {bool} required the required toggles the required state to fill in the textfield
     * @return {jsx} return a jsx object of HelixTextField
     */
    const setHelixTextField = (name, label, placeholder = "", required = false) => {
        return (
            <HelixTextField
            error={error[[name]].length > 0}
            description={label}
            name={name}
            type={name === "DateOfBirth" ? "date" : ""}
            label={label}
            value={user[[name]]}
            placeholder={placeholder}
            helperText={error[[name]]}
            required={required}
            InputLabelProps={name === "DateOfBirth" ? { shrink: true } : {}}
            inputProps={name === "Phone" ? { maxLength: 10 } : { maxLength: 40 }}
            onChange={handleInputChange}
            />
        )
    }

    /**
     * @return {jsx} return a jsx object of HelixButtons 
     */
    const renderButtonActions = () => {
        return (
            <React.Fragment>
                <HelixButton 
                color="primary" 
                variant="contained" 
                type="submit" 
                size="small"
                startIcon={<SaveIcon />}>
                    Save
                </HelixButton>
                <HelixButton
                color="default"
                variant="contained"
                type="cancel"
                size="small"
                href="/user"
                startIcon={<CancelIcon />}>
                    Cancel
                </HelixButton>
            </React.Fragment>
        )
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
                    {setHelixTextField("FirstName", "First Name", "John", true)}
                </Grid>
                <Grid item xs={6}>
                    {setHelixTextField("LastName", "Last Name", "Doe", true)}
                </Grid>
                <Grid item xs={6}>
                    {setHelixTextField("DateOfBirth", "Date of Birth")}
                </Grid>
                <Grid item xs={6}>
                    {setHelixTextField("Phone", "Phone")}
                </Grid>
                <Grid item xs></Grid>
                <Grid item xs={6} className={userFormClasses.buttonStyle}>
                    {renderButtonActions()}
                </Grid>
            </Grid>
        </form>
    </div>
    )
}

export default UserForm