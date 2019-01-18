import React, { Component } from 'react';

class PollForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      question: '',
      votes: []
    }
    this.addVoteOption = this.addVoteOption.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.voteForOption = this.voteForOption.bind(this);
    this.unvoteForOption = this.unvoteForOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addVoteOption() {
    this.setState({
      votes: this.state.votes.concat({ name: '', times: 0 })
    })
  }

  inputChange(event, index) {
    this.setState({
      votes: this.state.votes.map((v, i) => {
        if (i === index) return { name: event.target.value, times: v.times };
        return v;
      })
    })
  }

  voteForOption(index) {
    this.setState({
      votes: this.state.votes.map((v, i) => {
        if (i === index) return { name: v.name, times: 1 };
        return v;
      })
    })
  }

  unvoteForOption(index) {
    this.setState({
      votes: this.state.votes.map((v, i) => {
        if (i === index) return { name: v.name, times: 0 };
        return v;
      })
    })
  }

  deleteOption(index) {
    this.setState({
      votes: this.state.votes.filter((v, i) => i !== index)
    })
  }

  handleSubmit() {

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputTitle">Title</label>
          <input name="title" type="text" required
            className="form-control" id="inputTitle"
            placeholder="Enter poll title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputQuestion">Question</label>
          <input name="question" type="text" required
            className="form-control" id="inputQuestion"
            placeholder="Ask something"
          />
        </div>

        <hr />

        {
          this.state.votes.map((vote, i) => (
            <div key={`vote${i}`} className="form-group">
              <label htmlFor={"inputVote" + i} className="d-block">Vote option {i + 1}</label>
              <input type="text" className="form-control d-inline-block w-75"
                id={"inputVote" + i} placeholder={`Option ${i+1}`} value={vote.name}
                onChange={e => this.inputChange(e, i)}
              />
              {
                vote.times
                ? <button type="button" className="btn btn-link" onClick={() => this.unvoteForOption(i)}>Unvote</button>
                : <button type="button" className="btn btn-link" onClick={() => this.voteForOption(i)}>Vote</button>
              }
              <button type="button" className="btn btn-link text-danger" onClick={() => this.deleteOption(i)}>Delete option</button>
            </div>
          ))
        }

        <button type="button" className="btn btn-light d-block mb-4" onClick={this.addVoteOption}>Add vote option</button>
        <button type="submit" className="btn btn-primary">Create poll</button>
      </form>
    )
  }
}

export default PollForm;
