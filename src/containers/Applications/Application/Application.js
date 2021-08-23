import React from 'react';
import classes from './Application.module.css'

const Application = (props) => (
    <div className={classes.application}>
        <p>Name: <b>{props.name}</b></p>
        <p>Application pool: <b>{props.applicationPoolName}</b></p>
        <p>Application pool status: <b>{props.applicationPoolStatus}</b></p>
        <p>Physical path: <b>{props.physicalPath}</b></p>
    </div>
);

export default Application;