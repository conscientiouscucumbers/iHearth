import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    const {user, logout} = this.props;
    return (user &&
      <div className="container">
        <h1>{user.company_name}</h1>

        <div className="login-success">
          <p>Hi, {user.email}. You have just successfully logged in.
          </p>
          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
      </div>
    );
  }
}
