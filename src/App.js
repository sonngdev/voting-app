import React, { Component } from 'react';
import UserHeader from './UserHeader.js';
import GuestHeader from './GuestHeader.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    document.cookie = '';
    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.username
          ? <UserHeader username={this.state.username} handleLogOut={this.handleLogOut} />
          : <GuestHeader />
        }
      </div>
    );
  }
}

export default App;
