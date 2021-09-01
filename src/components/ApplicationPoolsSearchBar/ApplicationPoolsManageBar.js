import React from 'react';
import classes from './ApplicationPoolsManageBar.module.css';

const ApplicationPoolsManageBar = (props) => {
    return (
        <div className={classes.manage__bar}>
            <input className={classes.search__input} placeholder="Application Pool Name"
                   onChange={props.searchFieldHandler} value={props.searchValue}/>
            <button className={classes.search__button} onClick={props.searchButtonHandler}/>
            <button className={classes.refresh__button} onClick={props.refreshButtonHandler}/>
            <button className={classes.add__button} onClick={props.addButtonHandler}/>
        </div>
    );
};

export default ApplicationPoolsManageBar;