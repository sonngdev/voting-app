import React, { Component } from 'react';
import Title from './Title';
import PollList from './PollList';

class UserPolls extends Component {
  render() {
    const requestOptions = {
      headers: { "Authorization": localStorage.getItem("auth_token") }
    }

    return (
      <div className="container mt-4">
        <Title text="My Polls" />
        <PollList
          username={this.props.username}
          handleError={this.props.handleError}
          path="/my_polls"
          options={requestOptions}
        />
      </div>
    )
  }
}

export default UserPolls;
