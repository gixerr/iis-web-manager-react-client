import React, { useState } from 'react';
import classes from './ApplicationPool.module.css';
import './ApplicationPool.module.css';
import axios from '../../../axios';
import {Link} from 'react-router-dom';

const ApplicationPool = (props) => {
    const [details, setDetails] = useState('applicationPool__details--hide');
    const [applicationPoolStatus, setApplicationPoolStatus] = useState(props.status);

    const toggleDetailsDisplay = () => {
        if (details === 'applicationPool__details--hide') {
            setDetails('applicationPool__details--show');
        } else {
            setDetails('applicationPool__details--hide');
        }
    };

    const setAppPoolStatus = () => axios.get(`/ApplicationPools/${props.name}`)
        .then(async response => {
            if (response.data.status === 'Stopping' || response.data.status === 'Starting') {
                setTimeout(() => setAppPoolStatus(`/ApplicationPools/${props.name}`), 1000);
            }
            setApplicationPoolStatus(response.data.status);
        });

    const stopApplicationPool = () => axios.put(`/ApplicationPools/${props.name}/stop`);

    const startApplicationPool = () => axios.put(`/ApplicationPools/${props.name}/start`);

    const recycleApplicationPool = async () => axios.put(`/ApplicationPools/${props.name}/recycle`);

    const detailsStateHandler = () => {
        toggleDetailsDisplay();
    };

    const stopButtonHandler = async () => {
        await stopApplicationPool();
        await setAppPoolStatus();
    };

    const startButtonHandler = async () => {
        await startApplicationPool();
        await setAppPoolStatus();
    };

    const recycleButtonHandler = async () => {
        setApplicationPoolStatus('Recycling');
        await recycleApplicationPool();
        await setAppPoolStatus();
    };

    const isStarted = () => applicationPoolStatus.toLowerCase() === 'started';


    return (
        <div className={classes.applicationPool}>
            <section className={classes['applicationPool__main-area']}>
                <div className={classes['applicationPool__base-info']}>
                    <p>Name: <b>{props.name}</b></p>
                    <p>Status: <b><span
                        className={classes[applicationPoolStatus.toLowerCase()]}>{applicationPoolStatus}</span></b></p>
                </div>
                <div className={classes['applicationPool__button-area']}>
                    <button className={classes['applicationPool__button--start']} disabled={isStarted()}
                            onClick={startButtonHandler}/>

                    <button className={classes['applicationPool__button--stop']} disabled={!isStarted()}
                            onClick={stopButtonHandler}/>

                    <button className={classes['applicationPool__button--recycle']} disabled={!isStarted()}
                            onClick={recycleButtonHandler}/>

                    <button className={classes['applicationPool__button--delete']}
                            onClick={props.deleteHandler}/>
                    
                    <Link to={`/applicationPool/edit/${props.name}`} className={classes['applicationPool__button--edit']}
                            name={props.name}/>
                    <button className={classes['applicationPool__button--details']}
                            onClick={detailsStateHandler}/>
                </div>
            </section>
            <div className={classes[details]}>
                <p>Managed Runtime Version: <b>{props.managedRuntimeVersion}</b></p>
                <p>Managed Pipeline Mode: <b>{props.managedPipelineMode}</b></p>
                <p>Identity: <b>{props.identity}</b></p>
                <p>Applications: <b>{props.applications}</b></p>
            </div>
        </div>
    );
};

export default ApplicationPool;