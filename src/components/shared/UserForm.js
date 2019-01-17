import React, { Component } from 'react';

class UserForm extends Component {
  validatePassword() {
    const password = document.getElementById("inputPassword");
    const passwordConfirmation = document.getElementById("inputPasswordConfirmation");

    if (password.value !== passwordConfirmation.value)
      passwordConfirmation.setCustomValidity("Passwords don't match")
    else
      passwordConfirmation.setCustomValidity("")
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
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
        {
          this.props.passwordConfirmation &&
          <div className="form-group">
            <label htmlFor="inputPasswordConfirmation">Password confirmation</label>
            <input name="password_confirmation" type="password" required
              className="form-control" id="inputPasswordConfirmation"
              placeholder="Re-type password" onChange={this.validatePassword.bind(this)}
            />
          </div>
        }
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    )
  }
}

export default UserForm;
