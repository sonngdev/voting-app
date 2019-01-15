import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import UserHeader from './components/UserHeader';
import GuestHeader from './components/GuestHeader';
import Home from './components/Home';
import LogIn from './components/LogIn';

class App extends Component {
  constructor() {
    super();

    const authToken = localStorage.getItem("auth_token");
    const username = localStorage.getItem("username");
    if (authToken && username) this.state = { username: username, error: null }
    else this.state = { username: '', error: null };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleLogIn(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch(`${process.env.REACT_APP_API_URL}/login`, { method: 'POST', body: data })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem("auth_token", res.auth_token);
      localStorage.setItem("username", res.user.username);
      this.setState({ username: res.user.username });
      this.props.history.push("/")
    }, this.handleError);
  }

  handleLogOut() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    this.setState({ username: '' });
  }

  handleError(error) {
    this.setState(error)
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
          </Switch>
        </div>
      );
    }
  }
}

export default withRouter(App);
