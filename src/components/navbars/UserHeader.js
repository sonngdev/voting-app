import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link to="/" className="navbar-brand">FCC Voting App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/my_polls" className="nav-link">My Polls</Link>
            </li>
            <li className="nav-item">
              <Link to="/new_poll" className="nav-link">New Poll</Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="navbar-text">Hi, {this.props.username}</span>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link active" onClick={this.props.handleLogOut}>Log Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default UserHeader;
