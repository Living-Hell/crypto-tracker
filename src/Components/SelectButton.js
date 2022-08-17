import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(({
    selectbutton:{
        border: "1px solid #59bfff",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Roboto",
        cursor: "pointer",
        "&:hover":{
            backgroundColor: "#008ecc",
            color: "black",
        },
        width: "22%",
        margin: 5,
    }
}));

const SelectButton = ({children, selected, onClick}) => {
  
    const classes = useStyles();

    return (

    <span 
    onClick={onClick} 
    className={classes.selectbutton} 
    style={{
        backgroundColor: selected? "#89cff0" : "",
        color: selected? "black": "",
        fontWeight: selected? "700": "",
    }}>
        {children}
    </span>
  )
}

export default SelectButton