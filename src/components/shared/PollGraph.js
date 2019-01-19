import React, { Component } from 'react';
import Chart from 'chart.js';

class PollGraph extends Component {
  componentDidMount() {
    const votes = this.props.votes;
    new Chart(document.getElementById("pollGraph"), {
      type: 'pie',
      data: {
        labels: votes.map(vote => vote.name),
        datasets: [{
          label: '# of Votes',
          data: votes.map(vote => vote.times),
          backgroundColor: [
            '#037AFB',
            '#6C757D',
            '#55A747',
            '#DC3C45',
            '#F8C133',
            '#48A3B8',
            '#343A40'
          ],
          borderWidth: 0
        }]
      }
    });
  }

  render() {
    return (
      <div>
        <canvas id="pollGraph"></canvas>
      </div>
    )
  }
}

export default PollGraph;
