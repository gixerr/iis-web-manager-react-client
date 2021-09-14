import React, {useEffect, useState} from 'react';
import classes from './EditApplicationPool.module.css';
import axios from '../../axios';
import {useHistory} from 'react-router-dom';

const EditApplicationPool = (props) => {

    const [applicationPoolName, setApplicationPoolName] = useState('');
    const [managedRunTimeVersion, setManagedRunTimeVersion] = useState('');
    const [managedPipelineMode, setManagedPipelineMode] = useState('');
    const [identity, setIdentity] = useState('');

    const getEditableProperties = async (applicationPoolName) =>
        await axios.get(`/ApplicationPools/${applicationPoolName}/editableProperties`)
            .then(response => {
                    setApplicationPoolName(response.data.name);
                    setManagedRunTimeVersion(response.data.managedRuntimeVersion);
                    setManagedPipelineMode(response.data.managedPipelineMode);
                    setIdentity(response.data.identity);
                }
            );
    const currentApplicationPoolName = window.location.pathname.split('/').pop();

    const updateApplicationPool = () =>
        axios.put('/ApplicationPools', {name: decodeURI(currentApplicationPoolName),
        newName: applicationPoolName, managedPipelineMode, managedRunTimeVersion, identity})

    useEffect(async () => await getEditableProperties(currentApplicationPoolName), []);

    const nameFieldChangeHandler = (event) => {
        setApplicationPoolName(event.target.value);
    };

    const managedRunTimeVersionHandler = (event) => {
        setManagedRunTimeVersion(event.target.value);
    };

    const managedPipelineModeHandler = (event) => {
        setManagedPipelineMode(event.target.value);
    };

    const identityHandler = (event) => {
        setIdentity(event.target.value);
    };

    const updateButtonHandler = async () => {
        await updateApplicationPool()

    }

    return (
        <div className={classes.editApplicationPoolForm}>
            <h2>Edit Application Pool</h2>
            <div>
                <div className={classes.editApplicationPoolField}>
                    <label className={classes.applicationPoolLabel}>Name</label>
                    <input className={classes.applicationPoolName}
                           value={applicationPoolName}
                           onChange={nameFieldChangeHandler}/>
                </div>
                <div className={classes.editApplicationPoolField}>
                    <label className={classes.applicationPoolLabel}>Managed Runtime Version</label>
                    <select className={classes.applicationPoolSelect} onChange={managedRunTimeVersionHandler}
                            value={managedRunTimeVersion}>
                        <option>v4.0</option>
                        <option>v2.0</option>
                        <option>No Managed Code</option>
                    </select>
                </div>
                <div className={classes.editApplicationPoolField}>
                    <label className={classes.applicationPoolLabel}>Managed PipelineMode</label>
                    <select className={classes.applicationPoolSelect} onChange={managedPipelineModeHandler}
                            value={managedPipelineMode}>
                        <option>Integrated</option>
                        <option>Classic</option>
                    </select>
                </div>
                <div className={classes.editApplicationPoolField}>
                    <label className={classes.applicationPoolLabel}>Identity</label>
                    <select className={classes.applicationPoolSelect} onChange={identityHandler}
                            value={identity}>
                        <option>LocalSystem</option>
                        <option>LocalService</option>
                        <option>NetworkService</option>
                        <option>ApplicationPoolIdentity</option>
                    </select>
                </div>
                <div className={classes.applicationPoolButtons}>
                    <button className={classes.addApplicationPoolSuccessButton}
                            onClick={updateButtonHandler}>Update
                    </button>
                    <button className={classes.addApplicationPoolDangerButton} onClick={useHistory().goBack}>Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditApplicationPool;