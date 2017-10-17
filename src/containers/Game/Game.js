import React, { Component } from 'react';

import { GridUI } from '../../components';
import { generateGrid } from '../../services';
import { gridMapToString } from '../../services/generateGrid/generateGridHelpers';

export default class Game extends Component {
  componentDidMount() {
    const gameGrid = generateGrid();
    console.log('gameGrid =>');
    console.log(gridMapToString(gameGrid.grid));
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
