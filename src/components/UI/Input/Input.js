import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.css';

const input = (props) => {
  let inputElement = ""
  switch (props.elementConfig.type) {
    case ('radio'):
      inputElement =
        <div className={classes.FormRadioGroup}>
          <input
            className={classes.FormRadioInput}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />

          <label htmlFor={props.elementConfig.id} className={classes.FormRadioLabel}>
            <span
              className={classes.FormRadioBtn}></span>
            by {props.elementConfig.id}
          </label>
        </div>
      break;

    default:
      inputElement =
        <div className={classes.FormGroup}>
          <input
            className={props.invalid && props.touched ?
              [classes.FormInput, classes.Invalid].join(' ') :
              classes.FormInput}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
        </div>
  }
  return inputElement;
}

input.propTypes = {
  elementConfig: PropTypes.object,
  value: PropTypes.string,
  changed: PropTypes.func,
  invalid: PropTypes.bool,
  touched: PropTypes.bool
}

export default input;

