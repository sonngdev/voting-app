import React, { Component } from 'react';
import Title from '../shared/Title';
import VoteForm from '../shared/VoteForm';
// import PollGraph from '../shard/PollGraph';

class ShowPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: '',
      question: '',
      created_by: '',
      votes: [],
      isLoaded: false
    }
    this.pollUpdated = this.pollUpdated.bind(this);
  }

  componentDidMount() {
    this.props.fetchData(this.props.url, {}, (res) => {
      this.setState({ ...res, isLoaded: true })
    })
  }

  pollUpdated(poll) {
    this.setState(poll)
  }

  render() {
    return this.state.isLoaded
    ? (
      <div className="container mt-4">
        <Title text={this.state.title} />
        <p className="lead">{this.state.question}</p>
        <p className="small">by {this.state.created_by}</p>

        <div className="row">
          <div className="col-sm-4">
            <VoteForm votes={this.state.votes} fetchData={this.props.fetchData}
              pollUrl={this.props.url} pollUpdated={this.pollUpdated}
            />
          </div>

          <div className="col-sm-8">
            {/* <PollGraph /> */}
          </div>
        </div>
      </div>
    )
    : <div className="container mt-4"><h3>Loading...</h3></div>
  }
}

export default ShowPoll;
