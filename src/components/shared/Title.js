import React, { Component } from 'react';

class Title extends Component {
  render() {
    return (
      <h1 className="mb-4">{this.props.text}</h1>
    )
  }
}

export default Title;
