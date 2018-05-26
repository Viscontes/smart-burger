import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const button = (props) =>
  <button className={classes[props.btnType]} disabled={props.disabled} onClick={props.clicked}>{props.children}</button>

button.propTypes = {
  btnType: PropTypes.string,
  clicked: PropTypes.func,
  disabled: PropTypes.bool
}

export default button;