import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, Button, Modal } from '@material-ui/core';

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
        // padding: "16px 32px 24px",
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
        // width: "100%",
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
 * @return {JSX} UserDelete site
 * routed at /user/delete/:id
 */
const UserDelete = (props) => {
    // Creates an object for styling. Any className that matches key in the userDeleteStyles object will have a corresponding styling
    const userDeleteClasses = userDeleteStyles();
    
    const body = (
        <div className={userDeleteClasses.paper}>
          <div className={userDeleteClasses.header} id="simple-modal-title">{`Delete TODO: Replace with Username ${props.location.state.FirstName} ${props.location.state.LastName}`}</div>
          <div className={userDeleteClasses.content} id="simple-modal-description">
            {`Are you sure you want to delete this user: ${props.location.state.FirstName} ${props.location.state.LastName}?`}
          </div>
          <div className={userDeleteClasses.actions}>
            <Button size="medium" className={userDeleteClasses.uiButton} onClick={() => (props.history.push({ pathname: "/", state: { type: "DELETE", payload: props.location.state.ID} }))} variant="contained" color="secondary">Delete</Button>
            <Button size="medium" className={userDeleteClasses.uiButton} href="/" variant="contained" color="default">Cancel</Button>
          </div>
        </div>
      )
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
                    {body}
            </Modal>
        </div>
        )
}

export default withRouter(UserDelete)
