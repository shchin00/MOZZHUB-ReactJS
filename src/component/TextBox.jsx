import React from "react";
import { TextField } from "@mui/material";

const DisplayTextBox = ({label})=>{

    return(
        <TextField
        label={label}
        variant='standard'
        color='secondary'
        />
    )
}

export default DisplayTextBox