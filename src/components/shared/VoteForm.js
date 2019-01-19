import React, { Component } from 'react';

class VoteForm extends Component {
  constructor(props) {
    super(props);

    const votes = this.props.votes
    this.state = {
      otherOption: '',
      voteOption: votes.length ? votes[0].id : 0
    }

    this.selectOptionChange = this.selectOptionChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.createNewVote = this.createNewVote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectOptionChange(event) {
    this.setState({ voteOption: Number(event.target.value),  otherOption: "" })
  }

  inputChange(event) {
    this.setState({ otherOption: event.target.value })
  }

  createNewVote(voteName) {
    this.props.fetchData(`${this.props.pollUrl}/votes`, {
      method: "POST",
      body: JSON.stringify({ name: voteName }),
      headers: { "Content-Type": "application/json" }
    }, this.props.pollUpdated)
  }

  updateVote(voteId) {
    this.props.fetchData(
      `${this.props.pollUrl}/votes/${voteId}`,
      { method: "PUT" },
      this.props.pollUpdated
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    const { voteOption, otherOption } = this.state;

    if (voteOption) this.updateVote(voteOption)
    else this.createNewVote(otherOption);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <select name="voteOption" className="form-control" onChange={this.selectOptionChange}>
            <option disabled>Choose an option</option>
            {
              this.props.votes.map((vote, index) => {
                return <option key={"vote" + index} value={vote.id}>{vote.name}</option>
              })
            }
            <option value="0">Your own option</option>
          </select>
        </div>

        {
          !this.state.voteOption &&
          <div className="form-group">
            <input name="otherOption" type="text" className="form-control" required
              id="inputVoteOption" placeholder="Type here" onChange={this.inputChange}
            />
          </div>
        }

        <button type="submit" className="btn btn-primary">Submit vote</button>
      </form>
    )
  }
}

export default VoteForm;
