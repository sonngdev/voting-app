import React, { Component } from 'react';

class Poll extends Component {
  handleDeletePoll(id, title) {
    if (window.confirm(`Delete poll ${title}?`)) {
      fetch(`${process.env.REACT_APP_API_URL}/my_polls/${id}`, {
        method: "DELETE",
        headers: { "Authorization": localStorage.getItem("auth_token") }
      }).then(res => res.json()).then(
        this.props.updatePolls,
        this.props.handleError
      )
    }
  }

  render() {
    const { index, id, title, question, createdBy, votes, username } = this.props
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <a className="text-dark" href={`polls/${id}`}>
            <strong>{title}</strong>
          </a>
          <ul className="list-inline mb-0">
            <li className="list-inline-item"><small>{question}</small></li>
            <li className="list-inline-item"><small>Created by: {createdBy}</small></li>
            <li className="list-inline-item"><small>Votes: {votes}</small></li>
          </ul>
        </td>
        {
          createdBy === username &&
          <td>
            <button className="btn btn-link text-dark"
            onClick={this.handleDeletePoll.bind(this, id, title)}>
              Delete
            </button>
          </td>
        }

      </tr>
    )
  }
}

export default Poll;
