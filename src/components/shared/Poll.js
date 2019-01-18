import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Poll extends Component {
  handleDeletePoll(id, title) {
    if (window.confirm(`Delete poll ${title}?`)) {
      this.props.fetchData(`/my_polls/${id}`, {
        method: "DELETE",
        headers: { "Authorization": localStorage.getItem("auth_token") }
      }, this.props.updatePolls)
    }
  }

  render() {
    const { index, id, title, question, createdBy, votes, username } = this.props
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <Link to={`polls/${id}`} className="text-dark"><strong>{title}</strong></Link>
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
