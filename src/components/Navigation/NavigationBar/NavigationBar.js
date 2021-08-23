import React from "react";
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './NavigationBar.module.css'

const NavigationBar = (props) => (
    <header className={classes.navigationBar}>
        <div className={classes.navigationBar__logo}>
            <Logo />
        </div>
        <nav className={classes.navigation}>
            <NavigationItems />
        </nav>
    </header>
);

export default NavigationBar;