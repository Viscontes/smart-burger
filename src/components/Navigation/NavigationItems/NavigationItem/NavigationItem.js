import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) =>
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} className={classes.Link} activeClassName={classes.active} exact={props.exact}>
      {props.children}
    </NavLink>
  </li>

navigationItem.propTypes = {
  link: PropTypes.string,
  active: PropTypes.bool,
  exact: PropTypes.bool
};

export default navigationItem;