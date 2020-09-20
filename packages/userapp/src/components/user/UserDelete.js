import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, Modal } from '@material-ui/core';
import { HelixButton } from 'helixmonorepo-lib'
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import users from '../apis/users'

// Styling used for MaterialUI
const userDeleteStyles = makeStyles(() => ({
    modal: {
        display: "flex",
        padding: "8px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.7)",
    },
    paper: {
        width: "900px",
        margin: 0,
        border: "2px solid #000",
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
        backgroundColor: "#fff",
        borderRadius: ".28571429rem",
        '&:focus': {
            outline: 'none',
        },
    },
    header: {
        fontSize: "1.42857143rem",
        lineHeight: "1.28571429em",
        fontWeight: "700",
        display: "block",
        fontFamily: "Lato, Helvetica Neue, Arial, Helvetica, sans-serif",
        background: "#fff",
        margin: 0,
        padding: "1.25rem 1.5rem",
        boxShadow: "none",
        color: "rgba(0,0,0,.85)",
        borderBottom: "1px solid rgba(34,36,38,.15)",
    },
    content: {
        display: "block",
        fontSize: "1em",
        lineHeight: "1.4",
        padding: "1.5rem",
        background: "#fff",
        fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
    },
    actions: {
        background:" #f9fafb",
        padding: "1rem 1rem",
        borderTop: "1px solid rgba(34,36,38,.15)",
        textAlign: "right",
    },
    uiButton: {
        marginLeft: ".75em",
    }
}))

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} UserDelete site to delete a specific user 
 * routed at /user/delete/:id
 */
const UserDelete = (props) => {
    // Creates an object for styling. Any className that matches key in the userDeleteStyles object will have a corresponding styling
    const userDeleteClasses = userDeleteStyles();
    
    /**
     * deleteUser calls backend api through delete protocol to remove a user with the specific id and nagivate to next component
     */
    const deleteUser = async () => {
        const id = props.location.state._id
        await users.delete(`/users/${id}`)
        props.history.push("/user")
    }


    /**
     * @return {jsx} return jsx modal-style object with header, content, and actions
     */
    const renderModalBody = () => { 
        return (
            <div className={userDeleteClasses.paper}>
                <div className={userDeleteClasses.header} id="simple-modal-title">{`Delete ${props.location.state.FirstName} ${props.location.state.LastName}`}</div>
                <div className={userDeleteClasses.content} id="simple-modal-description">
                    {`Are you sure you want to delete this user: ${props.location.state.FirstName} ${props.location.state.LastName}?`}
                </div>
                <div className={userDeleteClasses.actions}>
                    <HelixButton size="medium" className={userDeleteClasses.uiButton} onClick={deleteUser} startIcon={<DeleteIcon />} variant="contained" color="secondary" text="Delete" />
                    <HelixButton size="medium" className={userDeleteClasses.uiButton} href="/user" startIcon={<CancelIcon />} variant="contained" color="default" text="Cancel" />
                </div>
            </div>
        )
    }
    
    return (
        <div>
            <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={userDeleteClasses.modal}
            >
                {renderModalBody()}
            </Modal>
        </div>
        )
}

export default withRouter(UserDelete)
