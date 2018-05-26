import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { textInputObj } from '../../components/InputDataObj/InputDataObj';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility'
import spriteImg from '../../assets/img/sprite.svg';
import * as actions from '../../store/actions/index';
import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: textInputObj({ type: 'email', id: 'email', placeholder: 'Your email' }),
      password: textInputObj({ type: 'password', id: 'password', placeholder: 'Your password' }),
    },
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.buildingProcess && this.props.authRedirectPath !== '/') {
      this.props.onSetRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  };

  switchAuthModeHandler = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        key: key,
        config: this.state.controls[key]
      });
    }

    const choosedMode = this.state.isSignUp ?
      <div className={classes.BtnContainer}>
        <Button btnType="Continue" clicked={this.submitHandler}>Login</Button>
        <p className={classes.SignUp}>Not a member?
          <button className={classes.SignUpBtn} onClick={this.switchAuthModeHandler}>Sign up now</button>
        </p>
      </div> :
      <div className={classes.BtnContainer}>
        <Button btnType="Continue" clicked={this.submitHandler}>Register</Button>
      </div>;

    const signInTitle = this.state.isSignUp ?
      <h2 className={classes.FormTitle}>Login to SMART BURGER</h2> :
      <h2 className={classes.FormTitle}>Register in SMART BURGER</h2>;

    let form =
      <form className={classes.Form}>
        {signInTitle}
        {formElementsArray.map(element =>
          <Input
            key={element.key}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            touched={element.config.touched}
            changed={(event) => this.inputChangedHandler(event, element.key)} />)
        }
        {choosedMode}
      </form>;

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p className={classes.ErrorMessage}>
          <svg className={classes.Icon}>
            <use xlinkHref={spriteImg + '#icon-lock'} />
          </svg>
          Error:&nbsp;{this.props.error.message}
        </p>);
    }

    let authRedirect = null;
    if (this.props.isLogin) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <div className={classes.Img}></div>
      </div>
    );
  };
};

Auth.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  isLogin: PropTypes.bool,
  buildingProcess: PropTypes.bool,
  authRedirectPath: PropTypes.string,
  onSetRedirectPath: PropTypes.func,
  onAuth: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isLogin: state.auth.token !== null,
    buildingProcess: state.burgerBuilder.buildingProcess,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.fetchAuth(email, password, isSignUp)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);