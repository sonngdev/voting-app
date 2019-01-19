import React, { Component } from 'react';
import Chart from 'chart.js';

class PollGraph extends Component {
  constructor(props) {
    super(props);
    this.drawGraph = this.drawGraph.bind(this);
  }

  drawGraph() {
    const votes = this.props.votes;
    const colors = [
      '#037AFB',
      '#6C757D',
      '#55A747',
      '#DC3C45',
      '#F8C133',
      '#48A3B8',
      '#343A40'
    ]

    if (this.graph) this.graph.destroy();

    const backgroundColor = [];
    for (let i in votes) {
      backgroundColor.push(colors[i % colors.length])
    }
    this.graph = new Chart(document.getElementById("pollGraph"), {
      type: 'pie',
      data: {
        labels: votes.map(vote => vote.name),
        datasets: [{
          label: '# of Votes',
          data: votes.map(vote => vote.times),
          backgroundColor: backgroundColor,
          borderWidth: 0
        }]
      }
    });
  }

  componentDidMount() {
    this.drawGraph();
  }

  componentDidUpdate() {
    this.drawGraph();
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
