//Component for creating a confirmation modal
import React from 'react'
import {Dialog, DialogContent, DialogActions, Typography, makeStyles} from '@material-ui/core'
import { HelixButton } from 'helixmonorepo-lib'

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
 * @param {Object} props state variable: confirmDialog and state function: setConfirmDialog
 *  confirmDialog is an object with properties: 
 * isOpen: (boolean), 
 * title: (string), 
 * subtitle: (string), 
 * onConfirm: (callback function)
 * @return {JSX} ConfirmDialog modal window to confirm a button click
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
                <HelixButton text="Cancel" color="default" onClick={()=> setConfirmDialog({...confirmDialog, isOpen: false})} />
                <HelixButton text="Yes" color="primary" onClick={confirmDialog.onConfirm}/>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog