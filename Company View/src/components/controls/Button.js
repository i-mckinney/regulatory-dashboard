import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useButtonStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const buttonClasses = useButtonStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "secondary"}
            onClick={onClick}
            {...other}
            buttonClasses={{ root: buttonClasses.root, label: buttonClasses.label }}>
            {text}
        </MuiButton>
    )
}
