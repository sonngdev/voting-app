import React, { Component } from 'react';
import Title from '../shared/Title';
import PollList from '../shared/PollList';

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
          fetchData={this.props.fetchData}
          path="/my_polls"
          options={requestOptions}
        />
      </div>
    )
  }
}

export default UserPolls;
