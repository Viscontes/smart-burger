import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => 
  <div className={classes.CheckoutSummary}>
    <p className={classes.Text}>Enjoy your tasty burger</p>
    <div className={classes.BurgerContainer}>
      <Burger ingredients={props.ingredients} />
    </div>
    <div className={classes.BtnContainer}>
      <Button btnType='Cancel' clicked={props.checkoutCancelled}>Cancel</Button>
      <Button btnType='Continue' clicked={props.checkoutContinued}>Continue</Button>
    </div>
  </div>

checkoutSummary.propTypes = {
  ingredients: PropTypes.object,
  checkoutCancelled: PropTypes.func,
  checkoutContinued: PropTypes.func
}

export default checkoutSummary;