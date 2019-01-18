import React, { Component } from 'react';
import Poll from './Poll';

class PollList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      isLoaded: false
    };
    this.updatePolls = this.updatePolls.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + this.props.path, this.props.options)
    .then(async res => {
      const json = await res.json();
      if (!res.ok) throw new Error(json.message)
      else return json
    })
    .then(this.updatePolls)
    .catch(this.props.handleError)
  }

  updatePolls(polls) {
    this.setState({ polls: polls, isLoaded: true })
  }

  render() {
    return this.state.isLoaded
    ? (
      <table className="table table-light">
        <tbody>
          {
            this.state.polls.map((poll, index) => <Poll
              key={poll.title + index}
              updatePolls={this.updatePolls}
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
    : <h3>Loading...</h3>
  }
}

export default PollList;
