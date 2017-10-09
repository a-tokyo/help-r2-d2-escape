import React, { Component } from 'react';

import { GridUI } from '../../components';
import { generateGrid } from '../../services';

export default class Game extends Component {
  componentDidMount() {
    const gameGrid = generateGrid();
    console.log('gameGrid =>', gameGrid);
  }

  render() {
    return (
      <div>
        Game !!
        <GridUI />
      </div>
    );
  }
}
