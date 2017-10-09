import React, { Component } from 'react';

import { generateGrid } from '../../services';

export default class Game extends Component {
  componentDidMount() {
    generateGrid();
  }

  render() {
    return <div>Game !!</div>;
  }
}
