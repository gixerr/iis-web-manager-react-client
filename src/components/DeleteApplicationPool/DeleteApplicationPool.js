import React from 'react';
import classes from './DeleteApplicationPool.module.css';

const DeleteApplicationPool = (props) => (
    <div className={classes.deleteApplicationPoolForm}>
        <h2>Delete Application Pool</h2>
        <div>
            <p>Are you sure you want to delete <b>{props.applicationPoolName}</b>? This operation cannot be undone.</p>
            <div className={classes.deleteApplicationPoolButtons}>
                <button className={classes.deleteApplicationPoolSuccessButton} onClick={props.deleteClick}>Delete
                </button>
                <button className={classes.deleteApplicationPoolDangerButton} onClick={props.cancelClick}>Cancel
                </button>
            </div>
        </div>
    </div>
);

export default DeleteApplicationPool;