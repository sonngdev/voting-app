import React, { Component } from 'react';
import Title from './Title';

class LogIn extends Component {
  render() {
    return (
      <div className="container mt-4">
        <Title text="Log In" />
        <form onSubmit={this.props.handleLogIn}>
          <div className="form-group">
            <label htmlFor="inputUsername">Username</label>
            <input name="username" type="text" required
              className="form-control" id="inputUsername"
              placeholder="Enter unique username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input name="password" type="password" required
              className="form-control" id="inputPassword"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    )
  }
}

export default LogIn;
