import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sumIngredients = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, value) => sum + value, 0);
    return sumIngredients;
  }

  purchaseHandler = () => {
    if (this.props.isLogin) {
      this.setState({ purchasing: true });
    }
    else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ?
      <Aux>Ingredietns can't be loaded.</Aux> :
      <Spinner />;

    let orderSummary = null;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            purchasable={this.updatePurchaseState(this.props.ingredients) > 0}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
            isAuth={this.props.isLogin} />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  };
};

BurgerBuilder.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  error: PropTypes.bool,
  isLogin: PropTypes.bool,
  onIngredientAdded: PropTypes.func,
  onIngredientRemoved: PropTypes.func,
  onInitIngredients: PropTypes.func,
  onInitPurchase: PropTypes.func,
  onSetAuthRedirectPath: PropTypes.func
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isLogin: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () =>
      dispatch(actions.initIngredients()),
    onInitPurchase: () =>
      dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path =>
      dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));