import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div 
          style={{visibility: this.props.show ? 'visible' : 'hidden',
                  opacity: this.props.show ? '1' : '0'}} 
          className={classes.Modal}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
} 

Modal.propTypes = {
  show: PropTypes.bool,
  modalClosed: PropTypes.func
}

export default Modal;