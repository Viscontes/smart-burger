import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './Orders.css';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (this.props.orders) {
      orders = (this.props.orders.map(order =>
        <Order
          key={order.id}
          id={order.id}
          ingredients={order.ingredients}
          price={+order.price}
          deliveryMethod={order.orderData.deliveryMethod} />
      ));
    }

    return (
      <div className={classes.Orders}>
        {orders}
      </div>
    );
  };
};

Orders.propTypes = {
  orders: PropTypes.array,
  loading: PropTypes.bool,
  token: PropTypes.string,
  userId: PropTypes.string,
  onFetchOrders: PropTypes.func
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));