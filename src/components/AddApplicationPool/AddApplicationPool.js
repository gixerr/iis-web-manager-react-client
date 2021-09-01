import React, {useEffect, useState} from 'react';
import classes from './AddApplicationPool.module.css';

const AddApplicationPool = (props) => {
    const [newName, setNewName] = useState('');
    const [newManagedRunTimeVersion, setNewManagedRunTimeVersion] = useState('v4.0');
    const [newManagedPipelineMode, setManagedPipelineMode] = useState('Integrated');
    const [newStartImmediately, setStartImmediately] = useState(true);

    const newNameHandler = (event) => {
        setNewName(event.target.value);
    };

    const newManagedRunTimeVersionHandler = (event) => {
        setNewManagedRunTimeVersion(event.target.value);
    };

    const newManagedPipelineModeHandler = (event) => {
        setManagedPipelineMode(event.target.value);
    };

    const newStartImmediatelyHandler = (event) => {
        setStartImmediately(event.target.checked);
    };

    const generateNewApplicationPool = () => ({
        name: newName,
        managedRuntimeVersion: newManagedRunTimeVersion,
        managedPipelineMode: newManagedPipelineMode,
        autoStart: newStartImmediately
    });

    return (
        <div className={classes.addApplicationPoolForm}>
            <h2>Add Application Pool</h2>
            <input placeholder={'Application Pool name'} className={classes.applicationPoolName}
                   onChange={newNameHandler} value={newName}/>
            <div>
                <div className={classes.applicationPoolField}>
                    <label className={classes.applicationPoolLabel}>Managed Runtime Version</label>
                    <select className={classes.applicationPoolSelect} onChange={newManagedRunTimeVersionHandler}
                            value={newManagedRunTimeVersion}>
                        <option>v4.0</option>
                        <option>v2.0</option>
                        <option>No Managed Code</option>
                    </select>
                </div>
                <div className={classes.applicationPoolField}>
                    <label className={classes.applicationPoolLabel}>Managed PipelineMode</label>
                    <select className={classes.applicationPoolSelect} onChange={newManagedPipelineModeHandler}
                            value={newManagedPipelineMode}>
                        <option>Integrated</option>
                        <option>Classic</option>
                    </select>
                </div>
                <div className={classes.applicationPoolField}>
                    <label className={classes.applicationPoolLabel}>Start Immediately</label>
                    <input type="checkBox" onChange={newStartImmediatelyHandler} checked={newStartImmediately}/>
                </div>
                <div className={classes.applicationPoolButtons}>
                    <button className={classes.addApplicationPoolSuccessButton}
                            onClick={props.addClick.bind(null, generateNewApplicationPool())}>Add
                    </button>
                    <button className={classes.addApplicationPoolDangerButton} onClick={props.cancelClick}>Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddApplicationPool;