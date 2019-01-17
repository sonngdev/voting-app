import React, { Component } from 'react';
import Title from '../shared/Title';
import UserForm from '../shared/UserForm';

class SignUp extends Component {
  render() {
    return (
      <div className="container mt-4">
        <Title text="Sign Up" />
        <UserForm handleSubmit={this.props.handleSignUp} passwordConfirmation />
      </div>
    )
  }
}

export default SignUp;
