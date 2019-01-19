import React, { Component } from 'react';

class PollForm extends Component {
  constructor() {
    super();
    this.state = {
      votes: []
    }
    this.addVoteOption = this.addVoteOption.bind(this);
    this.voteNameChange = this.voteNameChange.bind(this);
    this.voteForOption = this.voteForOption.bind(this);
    this.unvoteForOption = this.unvoteForOption.bind(this);
    this.removeVoteOption = this.removeVoteOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addVoteOption() {
    this.setState({
      votes: this.state.votes.concat({ name: '', times: 0 })
    })
  }

  voteNameChange(event, index) {
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

  removeVoteOption(index) {
    this.setState({
      votes: this.state.votes.filter((v, i) => i !== index)
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.fetchData("/my_polls", {
      method: "POST",
      body: data,
      headers: { "Authorization": localStorage.getItem("auth_token") }
    }, res => {
      this.props.redirect(`my_polls/${res.id}`)
    })
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
              <input name="votes_attributes[][name]" type="text"
                className="form-control d-inline-block w-75"
                id={"inputVote" + i} placeholder={`Option ${i + 1}`}
                onChange={e => this.voteNameChange(e, i)}
              />
              <input name="votes_attributes[][times]" type="hidden" value={vote.times} />
              {
                vote.times
                ? <button type="button" className="btn btn-link" onClick={() => this.unvoteForOption(i)}>Unvote</button>
                : <button type="button" className="btn btn-link" onClick={() => this.voteForOption(i)}>Vote</button>
              }
              <button type="button" className="btn btn-link text-danger" onClick={() => this.removeVoteOption(i)}>Remove option</button>
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
