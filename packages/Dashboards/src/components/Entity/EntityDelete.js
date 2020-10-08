import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core'
import { HelixButton } from 'helixmonorepo-lib'
import DeleteIcon from '@material-ui/icons/Delete'
import CancelIcon from '@material-ui/icons/Cancel'
import entities from '../apis/entities'

// Styling used for MaterialUI
const entityDeleteStyles = makeStyles(() => ({
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
    username: {
        fontWeight: "700",
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
 * @return {JSX} EntityDelete site to delete a specific entity 
 * routed at /entity/delete/:id
 */
const EntityDelete = (props) => {
    // Creates an object for styling. Any className that matches key in the entityDeleteStyles object will have a corresponding styling
    const entityDeleteClasses = entityDeleteStyles();
    
    /**
     * deleteEntity calls backend api through delete protocol to remove a user with the specific id and nagivate to next component
     */
    const deleteEntity = async () => {
        const id = props.location.state._id
        await entities.delete(`/entity/${id}`)
        props.history.push("/entity")
    }

    /**
     * displayUserName return a jsx object with bold font for clarity when delete a entity
     */
    const displayEntity = () => {
        return (
            <span className={entityDeleteClasses.BorrowerName}>
                {` ${props.location.state.BorrowerName}`}
            </span>
        )
    }

    /**
     * @return {jsx} return jsx modal-style object with header, content, and actions
     */
    const renderModalBody = () => { 
        return (
            <Fade in>
                <div className={entityDeleteClasses.paper}>
                    <div className={entityDeleteClasses.header} id="simple-modal-title">Delete Entity</div>
                    <div className={entityDeleteClasses.content} id="simple-modal-description">
                        Are you sure you want to delete this entity: {displayEntity()}?
                    </div>
                    <div className={entityDeleteClasses.actions}>
                        <HelixButton size="medium" className={entityDeleteClasses.uiButton} onClick={deleteEntity} startIcon={<DeleteIcon />} variant="contained" color="secondary" text="Delete" />
                        <HelixButton size="medium" className={entityDeleteClasses.uiButton} href="/entity" startIcon={<CancelIcon />} variant="contained" color="default" text="Cancel" />
                    </div>
                </div>
            </Fade>
        )
    }
    
    return (
        <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={entityDeleteClasses.modal}
        >
            {renderModalBody()}
        </Modal>
        )
}

export default withRouter(EntityDelete)
