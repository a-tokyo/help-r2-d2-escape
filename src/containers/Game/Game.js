import React, { Component } from 'react';

import { GridUI } from '../../components';
import { generateGrid, HelpR2D2Search } from '../../services';
import { gridMapToString } from '../../services/generateGrid/generateGridHelpers';

export default class Game extends Component {
  componentDidMount() {
    const gameGrid = generateGrid();
    console.log('gameGrid =>', gameGrid);
    console.log('gameGridMap ==>');
    console.log(gridMapToString(gameGrid.grid));

    console.log('HelpR2D2Search ==>', HelpR2D2Search(gameGrid));
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
