import React from "react";
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css'

const NavigationItems = (props) => (
    <ul className={classes.navigationItems}>
        <NavigationItem link='/applicationPools' exact>Application Pools</NavigationItem>
        <NavigationItem link='/applications' exact>Applications</NavigationItem>
        <NavigationItem link='/builds' exact>Builds</NavigationItem>
    </ul>
);

export default NavigationItems;