import React, { Component } from 'react';
import Title from './Title';
import PollList from './PollList';

class UserPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      isLoaded: false
    }
    this.updatePolls = this.updatePolls.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + "/my_polls", {
      headers: { "Authorization": localStorage.getItem("auth_token") }
    }).then(res => res.json()).then(
      this.updatePolls,
      this.props.handleError
    )
  }

  updatePolls(polls) {
    this.setState({ polls: polls, isLoaded: true })
  }

  render() {
    return (
      <div className="container mt-4">
        <Title text="My Polls" />
        {
          this.state.isLoaded
          ? <PollList
            polls={this.state.polls}
            username={this.props.username}
            updatePolls={this.updatePolls}
            handleError={this.props.handleError}
          />
          : <h3>Loading...</h3>
        }
      </div>
    )
  }
}

export default UserPolls;
