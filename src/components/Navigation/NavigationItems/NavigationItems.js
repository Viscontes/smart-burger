import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import NavigationItem from './NavigationItem/NavigationItem';
import spriteImg from '../../../assets/img/sprite.svg';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
  let loginItems = (
    <NavigationItem link="/auth">
      <svg className={classes.Icon}>
        <use xlinkHref={spriteImg + '#icon-user'} />
      </svg>
      <span className={classes.Label}>Login</span>
    </NavigationItem>
  );

  if (props.isAuth) {
    loginItems = (
      <Aux>
        <NavigationItem link="/orders">
          <svg className={classes.Icon}>
            <use xlinkHref={spriteImg + '#icon-cart'} />
          </svg>
          <span className={classes.Label}>Orders</span>
        </NavigationItem>
        <NavigationItem link="/logout">
          <svg className={classes.Icon}>
            <use xlinkHref={spriteImg + '#icon-enter'} />
          </svg>
          <span className={classes.Label}>Logout</span>
        </NavigationItem>
      </Aux>
    );
  }

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        <svg className={classes.Icon}>
          <use xlinkHref={spriteImg + '#icon-home'} />
        </svg>
        <span className={classes.Label}>Home</span>
      </NavigationItem>

      {loginItems}
    </ul>
  );
};

navigationItems.propTypes = {
  isAuth: PropTypes.bool
};

export default navigationItems;