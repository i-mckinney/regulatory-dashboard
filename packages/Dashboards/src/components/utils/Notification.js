//Component for creating a pop-up notification banner
import React from 'react'
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// Styling used for MaterialUI
const useStyles = makeStyles(theme=> ({
    root:{
        top: theme.spacing(9)
    }
}))

/**
 * @param {Object} props state variable: notification and state function: setNotification
 *  notification is an object with properties: 
 * isOpen: (boolean), 
 * message: (string), 
 * type: (string),
 * @return {JSX} snackbar pop-up banner to confirm result of an action (i.e. button click)
 */
const Notification = (props) => {
    
    //Extracts properties from props parameter
    const {notification, setNotification} = props;
    
    // Creates an object for styling. Any className that matches key in the requestTableStyles object will have a corresponding styling
    const classes= useStyles()

    // Handles closing of pop-up banner
    const handleClose = () => {
        setNotification({
            ...notification,
            isOpen: false
        })
    }

    return(
        <Snackbar 
        open={notification.isOpen} 
        autoHideDuration={3000} 
        className={classes.root} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert severity={notification.type} onClose={handleClose}>
                {notification.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification