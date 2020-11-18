import React, {useState} from "react"
import { withKnobs } from "@storybook/addon-knobs"
import ThemeSelector from "../themes/ThemeSelector"
import CssBaseline from "@material-ui/core/CssBaseline"
import Notification from "../components/Notification/index"
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

export default {
    title:"Helix Components/Notification",
    decorators: [withKnobs],
    component: Notification,    
}
 
/**
 * @param {Object} args state hook variable: notification and state hook function: setNotification
 * notification is an object with properties: 
 * isOpen: (boolean), 
 * message: (string), 
 * type: (string),
 * @return {JSX} snackbar pop-up banner to confirm result of an action (i.e. button click)
 */ 
export const SampleNotification = (args) =>{

    //Set state of notification in response to a button action
    const [notification, setNotification] = useState({
        isOpen: false, 
        message: 'Successfully clicked button', 
        type: 'success'
    }) 

    const handleClick = () => {
        console.log('Button clicked')
        setNotification({
            ...notification,
            isOpen: true
        })
    }

    return(
        <ThemeSelector>
            <CssBaseline/>
            <div> Click the example icon below to see notification</div>
            <IconButton aria-label="delete" size="small" edge="start" color="secondary"
               onClick={handleClick}>
                <DeleteIcon />
            </IconButton> 
            <Notification notification={notification} setNotification={setNotification} />
        </ThemeSelector>
    )
}
    
/**
 * SampleNotification.args are arguments provided to SampleNotification to work functionality
 */
Notification.args = {
    // These args are commented out because they are hooks and thus cause issues in storybook
    // notification: { notification}
    // setNotification: setNotification()
}