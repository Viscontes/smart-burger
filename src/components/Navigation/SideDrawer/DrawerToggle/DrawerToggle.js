import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.css';

const drawerToggle = (props) =>
  <div className={classes.DrawerToggle}>
    <input type='checkbox' id='toggle' className={classes.Checkbox} onClick={props.clicked} 
           checked={props.sideDrawerState} />
    <label htmlFor='toggle' className={classes.Toggle}>
      <span className={classes.Icon}></span>
    </label>
  </div>

drawerToggle.propTypes = {
  clicked: PropTypes.func,
  sideDrawerState: PropTypes.bool
}

export default drawerToggle;