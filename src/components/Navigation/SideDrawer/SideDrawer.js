import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <NavigationItems isAuth={props.isAuth} />
        <div className={classes.Legal}>
          &copy; 2017 by Smart Burger. All rights reserved.
        </div>
      </div>
    </Aux>
  );
};

sideDrawer.propTypes = {
  open: PropTypes.bool,
  closed: PropTypes.func,
  isAuth: PropTypes.bool
};

export default sideDrawer;