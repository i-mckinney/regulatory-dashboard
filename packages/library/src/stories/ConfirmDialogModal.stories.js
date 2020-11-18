import React, {useState} from "react"
import { withKnobs } from "@storybook/addon-knobs"
import ThemeSelector from "../themes/ThemeSelector"
import CssBaseline from "@material-ui/core/CssBaseline"
import ConfirmDialogModal from "../components/ConfirmDialogModal/index"
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

export default {
    title:"Helix Components/Confirm Dialog Modal",
    decorators: [withKnobs],
    component: ConfirmDialogModal,    
}
  
export const SampleConfirmDialogModal = (args) =>{

    const [confirmDialog, setConfirmDialog] = useState({ 
        isOpen: false, 
        title: 'confirmDialog.title: Main text to display',
        subtitle:'confirmDialog.subtitle: Additional text if needed',
        cancelText: 'Cancel',
        confirmText: 'Yes to trigger onConfirm function (see console)',
        })

    const handleClick = () => {
        console.log('Button clicked')
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }

    return(
        <ThemeSelector>
            <CssBaseline/>
            <div> Click the example icon below to see confirm dialog modal</div>
            <IconButton aria-label="delete" size="small" edge="start" color="secondary"
                onClick={() => { 
                    setConfirmDialog({
                        ...confirmDialog,
                        isOpen: true, 
                        onConfirm: ()=>{handleClick()}
                    }) 
                }}>
                <DeleteIcon />
            </IconButton> 
            <ConfirmDialogModal confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </ThemeSelector>
    )
}
    
/**
 * SampleConfirmDialogModal.args are arguments  provided to SampleConfirmDialogModal to work functionality
 */
SampleConfirmDialogModal.args = {
    // These args are commented out because they are hooks and thus cause issues in storybook
    // confirmDialog: { confirmDialog}
    // setConfirmDialog: setConfirmDialog()
}

