import React, { Component } from 'react';

class GuestHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="/">FCC Voting App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default GuestHeader;
