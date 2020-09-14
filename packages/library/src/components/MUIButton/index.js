import React from "react";
import MatButton from "@material-ui/core/Button"; 

const MUIButton = ({type,disabled,children}) =>{
    return <MatButton variant="contained" color={type} disabled={disabled}>
        {children}
    </MatButton> 
}

export default MUIButton;