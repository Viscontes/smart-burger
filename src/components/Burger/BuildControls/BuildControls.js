import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Tomato', type: 'tomato' }
];

const buildControls = (props) =>
  <div className={classes.BuildControls}>
    <p className={classes.Price}>
      price: ${props.price.toFixed(2)}
    </p>

    <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
      {props.isAuth ? 'order' : 'Login to order'}
    </button>

    {controls.map(ctrl =>
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)} />
    )}
  </div>

buildControls.propTypes = {
  label: PropTypes.string,
  price: PropTypes.number,
  purchasable: PropTypes.bool,
  ordered: PropTypes.func,
  added: PropTypes.func,
  removed: PropTypes.func,
  isAuth: PropTypes.bool
};

export default buildControls;