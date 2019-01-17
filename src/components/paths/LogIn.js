import React, { Component } from 'react';
import Title from '../shared/Title';
import UserForm from '../shared/UserForm';

class LogIn extends Component {
  render() {
    return (
      <div className="container mt-4">
        <Title text="Log In" />
        <UserForm handleSubmit={this.props.handleLogIn} />
      </div>
    )
  }
}

export default LogIn;
