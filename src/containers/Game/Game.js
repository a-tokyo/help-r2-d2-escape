import React, { Component } from 'react';

import { generateGrid, PlayerGameElement } from '../../services';

export default class Game extends Component {
  componentDidMount() {
    generateGrid();
    const myPlayer = new PlayerGameElement('tokyo');
    console.log(myPlayer.getName());
  }

  render() {
    return <div>Game !!</div>;
  }
}
