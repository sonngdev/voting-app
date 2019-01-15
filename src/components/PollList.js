import React, { Component } from 'react';
import Poll from './Poll';

class PollList extends Component {
  render() {
    return (
      <table className="table table-hover table-light">
        <tbody>
          {
            this.props.polls.map((poll, index) => <Poll
              key={poll.title + index}
              updatePolls={this.props.updatePolls}
              handleError={this.props.handleError}
              index={index}
              id={poll.id}
              title={poll.title}
              question={poll.question}
              createdBy={poll.created_by}
              votes={poll.votes.length}
              username={this.props.username}
            />)
          }
        </tbody>
      </table>
    )
  }
}

export default PollList;
