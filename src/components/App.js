import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import UserHeader from './navbars/UserHeader';
import GuestHeader from './navbars/GuestHeader';
import Home from './paths/Home';
import LogIn from './paths/LogIn';
import SignUp from './paths/SignUp';
import UserPolls from './paths/UserPolls';
import NewPoll from './paths/NewPoll';

class App extends Component {
  constructor() {
    super();

    const authToken = localStorage.getItem("auth_token");
    const username = localStorage.getItem("username");
    if (authToken && username) this.state = { username: username, error: null }
    else this.state = { username: '', error: null };

    this.saveUserInfoAndRedirect = this.saveUserInfoAndRedirect.bind(this);
    this.removeUserInfo = this.removeUserInfo.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  saveUserInfoAndRedirect(res) {
    localStorage.setItem("auth_token", res.auth_token);
    localStorage.setItem("username", res.user.username);
    this.setState({ username: res.user.username });
    this.props.history.push("/")
  }

  submitForm(e, route) {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch(process.env.REACT_APP_API_URL + route, { method: 'POST', body: data })
    .then(async res => {
      const json = await res.json();
      if (!res.ok) throw new Error(json.message)
      else return json
    })
    .then(this.saveUserInfoAndRedirect)
    .catch(this.handleError)
  }

  removeUserInfo() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    this.setState({ username: '' });
  }

  handleLogIn(e) {
    this.submitForm(e, '/login');
  }

  handleLogOut() {
    this.removeUserInfo();
  }

  handleSignUp(e) {
    this.submitForm(e, '/signup');
  }

  handleError(err) {
    this.setState({ error: err.message })
  }

  render() {
    const { error, username } = this.state;
    if (error) {
      return (
        <div className="container mt-4">
          <code className="text-dark">
            <h1 className="text-danger">Error</h1>
            <p>{error}</p>
          </code>
        </div>
      )
    } else {
      return (
        <div className="App">
          {
            username
            ? <UserHeader username={username} handleLogOut={this.handleLogOut} />
            : <GuestHeader handleLogIn={this.handleLogIn} />
          }

          <Switch>
            <Route
              path="/" exact
              render={() => <Home username={username} handleError={this.handleError} />}
            />
            <Route
              path="/login" exact
              render={() => <LogIn handleLogIn={this.handleLogIn} />}
            />
            <Route
              path="/signup" exact
              render={() => <SignUp handleSignUp={this.handleSignUp} />}
            />
            <Route
              path="/my_polls" exact
              render={() => <UserPolls username={username} handleError={this.handleError} />}
            />
            <Route
              path="/new_poll" exact
              render={() => <NewPoll /> }
            />
          </Switch>
        </div>
      );
    }
  }
}

export default withRouter(App);