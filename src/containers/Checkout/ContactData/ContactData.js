import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { textInputObj, radioSelectObj } from '../../../components/InputDataObj/InputDataObj';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: textInputObj({ type: 'text', id: 'name', placeholder: 'Your name' }),
      email: textInputObj({ type: 'email', id: 'email', placeholder: 'Your email' }),
      street: textInputObj({ type: 'text', id: 'street', placeholder: 'Street' }),
      zipCode: textInputObj({ type: 'text', id: 'zipCode', placeholder: 'ZIP code' }),
      phone: textInputObj({ type: 'text', id: 'phone', placeholder: 'Phone number' }),
      deliveryMethod: {
        options: [
          radioSelectObj({ type: 'radio', id: 'car', placeholder: '', name: 'delivery' }),
          radioSelectObj({ type: 'radio', id: 'e-bike', placeholder: '', name: 'delivery' }),
          radioSelectObj({ type: 'radio', id: 'scooter', placeholder: '', name: 'delivery' })]
      }
    },
    formValid: false
  };

  submitHandler = (event) => {
    event.preventDefault();

    let formData = {};
    for (let elementIdentifier in this.state.orderForm) {
      if (elementIdentifier === 'deliveryMethod') {
        for (let number in this.state.orderForm[elementIdentifier].options) {
          if (this.state.orderForm[elementIdentifier].options[number].checked) {
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].options[number].value;
          }
        }
      }
      else {
        formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
      }
    };

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      userId: this.props.userId,
      orderData: formData
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkTextValidation = (updatedOrderForm) => {
    let dataValid = true;
    for (let key in updatedOrderForm) {
      if (key !== 'deliveryMethod') {
        dataValid = updatedOrderForm[key].valid && dataValid;
      }
    }
    return dataValid;
  };

  checkRadioValidation = (updatedOrderForm) => {
    for (let i in updatedOrderForm['deliveryMethod'].options) {
      if (updatedOrderForm['deliveryMethod'].options[i].checked) {
        return true;
      }
    }
    return false;
  };

  updateFormValidation = (updatedOrderForm) => {
    const isDataValid = this.checkTextValidation(updatedOrderForm);
    const isRadioValid = this.checkRadioValidation(updatedOrderForm);
    this.setState({ orderForm: updatedOrderForm, formValid: isDataValid && isRadioValid });
  };

  textChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
      touched: true
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    this.updateFormValidation(updatedOrderForm);
  };

  radioChangedHandler = (event, optionNumber) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedOptions = [...{ ...updatedOrderForm['deliveryMethod'] }.options].map(option => {
      return {
        ...option,
        'checked': false
      }
    });
    const updatedFormElement = updatedOptions[optionNumber];
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.checked = true;
    updatedOrderForm['deliveryMethod'].options[optionNumber] = updatedFormElement;

    this.updateFormValidation(updatedOrderForm);
  };

  render() {
    const textElementsArray = [];
    const radioElementsArray = [];
    for (let key in this.state.orderForm) {
      if (key === 'deliveryMethod') {
        for (let number in this.state.orderForm[key].options) {
          if (this.state.orderForm[key].options[number].value) {
            radioElementsArray.push({
              key: number,
              config: this.state.orderForm[key].options[number]
            })
          }
        }
      }
      else {
        textElementsArray.push({
          key: key,
          config: this.state.orderForm[key]
        });
      }
    };

    let form =
      <form className={classes.Form} onSubmit={this.submitHandler}>
        <h2 className={classes.FormTitle}>Enter your data</h2>
        {textElementsArray.map(element =>
          <Input
            key={element.key}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            touched={element.config.touched}
            changed={(event) => this.textChangedHandler(event, element.key)} />)
        }

        <p className={classes.RadioTitle}>Choose delivery method</p>
        <div className={classes.RadioWrapper}>
          {radioElementsArray.map(element =>
            <Input
              key={element.key}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              invalid={!element.config.valid}
              checked={element.checked}
              changed={(event) => this.radioChangedHandler(event, element.key)}>
              {element.config.elementConfig.id}
            </Input>)
          }
        </div>
        <Button btnType="Continue" disabled={!this.state.formValid}>Order</Button>
      </form>;

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>{form}</div>
    );
  };
};

ContactData.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  loading: PropTypes.bool,
  token: PropTypes.string,
  userId: PropTypes.string,
  onOrderBurger: PropTypes.func
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));