import React from "react";
import iisLogo from '../../assets/iis-logo.jpg'
import classes from './Logo.module.css';
const Logo = (props) => (
    <div className={classes.logo}>
        <img src={iisLogo} alt="iis Logo"/>
    </div>
);

export default Logo;