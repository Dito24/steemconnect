import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from './actions';
import Sidebar from './app/sidebar';
import Login from './auth/Login';

class Wrapper extends Component {
  componentWillMount() {
    this.props.login();
  }
  render() {
    const className = (!this.props.app.sidebarIsVisible) ? 'app-wrapper full-width' : 'app-wrapper';
    return (
      !this.props.auth.isAuthenticated ? <Login {...this.props} /> : <div className={className}>
        <Sidebar />
        <div className="main-panel">
          <div className="view-app">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Wrapper.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }),
  app: PropTypes.shape({
    sidebarIsVisible: PropTypes.bool,
  }),
  children: PropTypes.element,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  login() { dispatch(login()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);