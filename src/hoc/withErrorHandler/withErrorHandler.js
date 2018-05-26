import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      errorState: false,
      errorMessage: null
    }
    
    componentWillMount() {
      axios.interceptors.request.use(request => {
        this.requestInterceptor = this.setState({errorState: false, errorMessage: null});
        return request;
      })
      axios.interceptors.response.use(response => response, error => {
        this.responseInterceptor = this.setState({errorState: true, errorMessage: 'Oops, something went wrong. ' + error})
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({errorState: false, errorMessage: null})
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.errorState} modalClosed={this.errorConfirmedHandler}>
            {this.state.errorState ? this.state.errorMessage : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;