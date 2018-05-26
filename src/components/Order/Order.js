import React from 'react';
import PropTypes from 'prop-types';

import classes from './Order.css';

const order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, amount: props.ingredients[key] });
  }
  const ingredientOutput = ingredients.map(ing =>
    <span className={classes.MainInfo} key={ing.name}>{ing.name}({ing.amount})</span>);

  return (
    <div className={classes.Order}>
      <h2 className={classes.OrderHeader}>Order number:&nbsp;
          <span className={classes.MainInfo}>{props.id.slice(1, 8)}</span>
      </h2>

      <div className={classes.OrderInfo}>Your order is confirmed.</div>
      <div className={classes.Wrapper}>
        <p className={classes.OrderText}>Final amount:&nbsp;
            <span className={classes.MainInfo}>${props.price.toFixed(2)}</span>
        </p>
        <p className={classes.OrderText}>Order details:&nbsp;
            {ingredientOutput}
        </p>
        <p className={classes.OrderText}>Delivery method:&nbsp;
            <span className={classes.MainInfo}>{props.deliveryMethod}</span>
        </p>
      </div>
    </div>
  );
}

order.propTypes = {
  id: PropTypes.string,
  ingredients: PropTypes.object,
  price: PropTypes.number,
  deliveryMethod: PropTypes.string
}

export default order;