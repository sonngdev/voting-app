import React, { Component } from 'react';
import Title from '../shared/Title';
import PollForm from '../shared/PollForm';

class NewPoll extends Component {
  render() {
    return (
      <div className="container mt-4">
        <Title text="New Poll" />
        <PollForm />
      </div>
    )
  }
}

export default NewPoll;
