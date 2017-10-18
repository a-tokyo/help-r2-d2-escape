import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { GridUI } from '../../components';
import { generateGrid, HelpR2D2Search } from '../../services';
import { gridMapToString } from '../../services/generateGrid/generateGridHelpers';

import './Game.css';

const dummyWorkingLongGrid = {
  grid: [
    [
      null,
      null,
      null,
      null,
      {
        items: [
          {
            type: 'teleportal',
            name: 'teleportal',
          },
        ],
        position: {
          row: 0,
          col: 4,
        },
      },
    ],
    [
      {
        items: [
          {
            type: 'pressurepad',
            name: 'pressurepad_0',
          },
        ],
        position: {
          row: 1,
          col: 0,
        },
      },
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null],
    [
      null,
      {
        items: [
          {
            type: 'rock',
            name: 'rock_0',
          },
        ],
        position: {
          row: 3,
          col: 1,
        },
      },
      null,
      null,
      {
        items: [
          {
            type: 'player',
            name: 'player',
          },
        ],
        position: {
          row: 3,
          col: 4,
        },
      },
    ],
    [
      null,
      null,
      null,
      null,
      {
        items: [
          {
            type: 'obstacle',
            name: 'obstacle_0',
          },
        ],
        position: {
          row: 4,
          col: 4,
        },
      },
    ],
  ],
  config: {
    rows: 5,
    cols: 5,
    availableCellsCount: 20,
    playerPosition: {
      row: 3,
      col: 4,
    },
    teleportalPosition: {
      row: 0,
      col: 4,
    },
    obstaclesPositions: [
      {
        row: 4,
        col: 4,
      },
    ],
    rocksPositions: [
      {
        row: 3,
        col: 1,
      },
    ],
    pressurePadsPositions: [
      {
        row: 1,
        col: 0,
      },
    ],
    rocksCount: 1,
    pressurePadsCount: 1,
    obstaclesCount: 1,
  },
};

export default class Game extends Component {
  componentDidMount() {
    // this._newGame();
  }

  _newGame = () => {
    console.info('############NEW GAME############');
    const gameGrid = generateGrid();
    console.info('gameGrid =>', gameGrid);
    console.info('gameGridMap ==>');
    console.info(gridMapToString(gameGrid.grid));

    // console.info('HelpR2D2Search ==>', HelpR2D2Search(gameGrid));
    console.info('HelpR2D2Search ==>', HelpR2D2Search(dummyWorkingLongGrid));
  };

  render() {
    return (
      <div>
        <div className="game__controlers">
          <Button color="primary" onClick={this._newGame}>
            New Game
          </Button>
        </div>
        <GridUI />
        <hr />
      </div>
    );
  }
}
