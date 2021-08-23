import React, { useState } from 'react';
import classes from './ApplicationPoolsSearchBar.module.css'
const ApplicationPoolsSearchBar = (props) => {
    return (
        <div className={classes.manage__bar}>
            <input className={classes.search__input} placeholder='Application Pool Name' onChange={props.searchFieldHandler} value={props.value}/>
            <button className={classes.search__button} onClick={props.searchButtonHandler}/>
            <button className={classes.refresh__button} onClick={props.refreshButtonHandler}/>
        </div>
    );
};

export default ApplicationPoolsSearchBar;