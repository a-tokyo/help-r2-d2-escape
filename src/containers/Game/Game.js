import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { GridUI } from '../../components';
import { generateGrid, HelpR2D2Search } from '../../services';
import { gridMapToString } from '../../services/generateGrid/generateGridHelpers';

import { solvableLongGrid } from '../../services/generateGrid/testGrids';

import './Game.css';

export default class Game extends Component {
  state = {
    gameGrid: solvableLongGrid,
  };

  componentDidMount() {
    // this._newGame();
  }

  _newGame = () => {
    console.info('############NEW GAME############');
    // const gameGrid = generateGrid();
    const gameGrid = solvableLongGrid;
    console.info('gameGrid =>', gameGrid);
    console.info('gameGridMap ==>');
    console.info(gridMapToString(gameGrid.grid));

    console.info('HelpR2D2Search result ==>', HelpR2D2Search(gameGrid));
  };

  render() {
    const { gameGrid } = this.state;
    return (
      <div>
        <div className="game__controlers">
          <Button color="primary" onClick={this._newGame}>
            New Game
          </Button>
        </div>
        <h3>Initial Grid</h3>
        <GridUI gridInfo={gameGrid} />
        <hr />
      </div>
    );
  }
}
