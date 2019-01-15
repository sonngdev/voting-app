import React, { Component } from 'react';
import Title from './Title';
import PollList from './PollList';

const polls = [
  {
      "id": 3,
      "title": "New poll",
      "question": "What should this poll be about?",
      "created_by": "thanhson",
      "votes": []
  },
  {
      "id": 4,
      "title": "Food",
      "question": "What kind of food do you like?",
      "created_by": "thanhson",
      "votes": [
          {
              "id": 3,
              "name": "Cabbage",
              "times": 4
          },
          {
              "id": 4,
              "name": "Chocolate",
              "times": 1
          }
      ]
  }
]


class Home extends Component {
  constructor() {
    super();
    this.state = {
      polls: polls
    }
  }

  updatePolls(polls) {
    this.setState({ polls: polls })
  }

  render() {
    return (
      <div className="container mt-4">
        <Title text="All Polls" />
        <PollList
          polls={this.state.polls}
          username={this.props.username}
          updatePolls={this.updatePolls}
          handleError={this.props.handleError}
        />
      </div>
    )
  }
}

export default Home;
