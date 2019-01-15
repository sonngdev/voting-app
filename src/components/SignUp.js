import React, { Component } from 'react';
import Title from './Title';
import Form from './Form';

class SignUp extends Component {
  render() {
    return (
      <div className="container mt-4">
        <Title text="Sign Up" />
        <Form handleSubmit={this.props.handleSignUp} passwordConfirmation />
      </div>
    )
  }
}

export default SignUp;
