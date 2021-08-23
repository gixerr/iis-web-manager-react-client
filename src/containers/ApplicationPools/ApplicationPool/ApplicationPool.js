import React from 'react';
import classes from './ApplicationPool.module.css';

const ApplicationPool = (props) => {

    return (
        <div className={classes.applicationPool}>
            <p>Name: <b>{props.name}</b></p>
            <p>Status: <b><span className={classes[props.status.toLowerCase()]}>{props.status}</span></b></p>
            <p>ManagedRuntimeVersion: <b>{props.managedRuntimeVersion}</b></p>
            <p>ManagedPipelineMode: <b>{props.managedPipelineMode}</b></p>
            <p>Identity: <b>{props.identity}</b></p>
            <p>Applications: <b>{props.applications}</b></p>
        </div>
    );
};

export default ApplicationPool;