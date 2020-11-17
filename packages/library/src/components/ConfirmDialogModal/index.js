//Component for creating a confirmation modal
import React from 'react'
import {Dialog, DialogContent, DialogActions, Typography, makeStyles} from '@material-ui/core'
import HelixButton  from '../HelixButton/index'

// Styling used for MaterialUI
const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    }
}))

/**
 * 
 * ###Params
 * * _**confirmDialog**_ **\<state variable\>** State hook variable of an object that contains:
 *      * _**isOpen**_ **\<boolean\>** Boolean for opening (true) and closing (false) modal window
 *      * _**title**_ **\<string\>** String represents main text/title in modal window
 *      * _**subtitle**_ **\<string\>** String for additional information below title text in modal window
 *      * _**confirmText**_ **\<string\>** String to display on the 'confirm' button (i.e. 'Yes', 'Confirm', 'Continue', etc.)
 *      * _**cancelText**_ **\<string\>** String  to display on the 'cancel'  button (i.e. 'No', 'Cancel', 'Go Back', etc.)
 *      * _**onConfirm**_ **\<callback function\>** Callback function to handle response of an onClick event to confirmText button
 * * _**setConfirmDialog**_ **\<state function\>** State hook function to change state hook confirmDialog

 * 
 * ###Returns 
 * * **\<JSX\>** renders a react custom dialog modal component
 */
const ConfirmDialog = (props)=>{

    //Extracts properties from props parameter
    const{confirmDialog, setConfirmDialog} = props;
    
    // Creates an object for styling. Any className that matches key in the requestTableStyles object will have a corresponding styling
    const classes = useStyles()

    return (
        <Dialog open= {confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <HelixButton text={confirmDialog.cancelText} color="default" onClick={()=> setConfirmDialog({...confirmDialog, isOpen: false})} />
                <HelixButton text={confirmDialog.confirmText} color="primary" onClick={confirmDialog.onConfirm}/>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog