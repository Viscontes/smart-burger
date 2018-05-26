import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    const oldState = this.state.showSideDrawer;
    this.setState({ showSideDrawer: !oldState });
  };

  render() {
    return (
      <Aux>
        <SideDrawer
          isAuth={this.props.isLogin}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />

        <Toolbar
          isAuth={this.props.isLogin}
          drawerToggleClicked={this.sideDrawerToggleHandler}
          sideDrawerState={this.state.showSideDrawer} />

        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  };
};

Layout.propTypes = {
  isLogin: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isLogin: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);