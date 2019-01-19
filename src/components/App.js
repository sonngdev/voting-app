import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import UserHeader from './navbars/UserHeader';
import GuestHeader from './navbars/GuestHeader';
import Home from './paths/Home';
import LogIn from './paths/LogIn';
import SignUp from './paths/SignUp';
import UserPolls from './paths/UserPolls';
import NewPoll from './paths/NewPoll';
import ShowPoll from './paths/ShowPoll';

class App extends Component {
  constructor() {
    super();

    const authToken = localStorage.getItem("auth_token");
    const username = localStorage.getItem("username");
    if (authToken && username) this.state = { username: username, error: null }
    else this.state = { username: '', error: null };

    this.saveUserInfo = this.saveUserInfo.bind(this);
    this.removeUserInfo = this.removeUserInfo.bind(this);
    this.redirect = this.redirect.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  saveUserInfo(res) {
    localStorage.setItem("auth_token", res.auth_token);
    localStorage.setItem("username", res.user.username);
    this.setState({ username: res.user.username });
  }

  removeUserInfo() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    this.setState({ username: '' });
  }

  redirect(path) {
    this.props.history.push(path)
  }

  fetchData(route, options, fetchSucceeded) {
    fetch(process.env.REACT_APP_API_URL + route, options)
    .then(async res => {
      const json = await res.json();
      if (!res.ok) throw new Error(json.message)
      else return json
    })
    .then(fetchSucceeded)
    .catch(this.handleError)
  }

  handleLogIn(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.fetchData('/login', { method: "POST", body: data }, (res) => {
      this.saveUserInfo(res);
      this.redirect("/")
    });
  }

  handleLogOut() {
    this.removeUserInfo();
  }

  handleSignUp(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.fetchData('/signup', { method: "POST", body: data }, this.saveUserInfoAndRedirect);
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
              render={() => <Home username={username} fetchData={this.fetchData} />}
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
              render={() => <UserPolls username={username} fetchData={this.fetchData} />}
            />
            <Route
              path="/new_poll" exact
              render={() => <NewPoll fetchData={this.fetchData} redirect={this.redirect} /> }
            />
            <Route
              path="/polls/:id" exact
              render={({ match }) => <ShowPoll url={match.url} fetchData={this.fetchData} />}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default withRouter(App);
