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
 * 
 * ###Params
 * * _**notification**_ **\<state variable\>** State hook variable of an object that contains
 *      * _**isOpen**_ **\<boolean\>** Boolean for opening (true) and closing (false) notification banner
 *      * _**message**_ **\<string\>** String represents message displayed in notification
 *      * _**type**_ **\<string\>** String for alert notification type (can be either 'error', 'warning', 'info', or 'success')
 * * _**setNotification**_ **\<state function\>** State hook function to change state hook notification
 * 
 * ###Returns 
 * * **\<JSX\>** Renders a react custom notification banner component
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