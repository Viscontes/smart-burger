import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';
import spriteImg from '../../../../assets/img/sprite.svg';

const buildControl = (props) =>
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>
      <svg className={classes.Icon} width='32' height='32' viewBox='0 0 32 32'>
        <use xlinkHref={spriteImg + '#icon-minus'} />
      </svg>
    </button>
    <button className={classes.More} onClick={props.added}>
    <svg className={classes.Icon} width='32' height='32' viewBox='0 0 32 32'>
        <use xlinkHref={spriteImg + '#icon-plus'} />
      </svg>
    </button>
  </div>

buildControl.propTypes = {
  label: PropTypes.string
}

export default buildControl;