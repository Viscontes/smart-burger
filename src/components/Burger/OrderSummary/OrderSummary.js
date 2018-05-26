import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import Logo from '../../../components/Logo/Logo';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(key => <li key={key} className={classes.Item}>
                  <span className={classes.Name}>{key}</span>: {props.ingredients[key]}
                </li>
    )

  return (
    <Aux>
      <div className={classes.Wrapper}>
        <Logo />
      </div>
      <p className={classes.Title}>Your delicious burger for ${props.price.toFixed(2)}</p>
      <p className={classes.Subtitle}>with following ingredients:</p>
      <ul className={classes.List}>{ingredientsSummary}</ul>
        <p className={classes.Text}>Continue to checkout?</p>
      <div className={classes.Wrapper}>
        <Button btnType="Cancel" clicked={props.purchaseCanceled}>Cancel</Button>
        <Button btnType="Continue" clicked={props.purchaseContinued}>Continue</Button>
      </div>
    </Aux>
  )
}

orderSummary.propTypes = {
  price: PropTypes.number,
  ingredients: PropTypes.object,
  purchaseCanceled: PropTypes.func,
  purchaseContinued: PropTypes.func
}

export default orderSummary;