import React, { Component } from 'react';

class UserHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="/">FCC Voting App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/my_polls">My Polls</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">New Poll</a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="navbar-text">Hi, {this.props.username}</span>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#" onClick={this.props.handleLogOut}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default UserHeader;
