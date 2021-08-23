﻿import React from "react";
import classes from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => (
    <li className={classes.navigationItem}>
       <NavLink to={props.link} exact={props.exact}>{props.children}</NavLink>
    </li>
);

export default NavigationItem;