import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GuestHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link to="/" className="navbar-brand">FCC Voting App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">Log In</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link active">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default GuestHeader;
