﻿import React from "react";
import classes from  './Backdrop.module.css'

const Backdrop = (props) => (
    props.show ? <div className={classes.backdrop} onClick={props.clicked}/> : null
);

export default Backdrop;