import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toolbar.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) =>
  <header className={classes.Toolbar}>
    <Logo />
    <DrawerToggle clicked={props.drawerToggleClicked} sideDrawerState={props.sideDrawerState} />
    <div className={classes.MobileOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </div>
  </header>

toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func,
  sideDrawerState: PropTypes.bool,
  isAuth: PropTypes.bool
}

export default toolbar;