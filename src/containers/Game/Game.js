/* @flow weak */
import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';

import { GridUI } from '../../components';
import { generateGrid, HelpR2D2Search } from '../../services';
import { gridMapToString } from '../../services/generateGrid/generateGridHelpers';

import { solvableLongGrid } from '../../services/generateGrid/testGrids';

import './Game.css';

const searchTypes: Array<string> = [
  'BF',
  'DF',
  'UC',
  'ID',
  'GR1',
  'GR2',
  'AS1',
  'AS2',
];

export default class Game extends Component {
  state = {
    gameGrid: solvableLongGrid,
    onGoingGameGridGrid: null,
    currOnGoingSearchState: null,
    searchTypeInputValue: 'BF',
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

    console.info(
      'HelpR2D2Search result ==>',
      HelpR2D2Search(gameGrid, this.state.searchTypeInputValue)
    );
  };

  _handleChangeSearchTypeInputValue = event => {
    this.setState({ searchTypeInputValue: event.target.value });
  };

  render() {
    const { gameGrid, searchTypeInputValue } = this.state;
    return (
      <div>
        <div className="game__controlers">
          <Button color="primary" onClick={this._newGame}>
            New Game
          </Button>
          <div className="game__controlers_select">
            <Input
              type="select"
              value={searchTypeInputValue}
              onChange={this._handleChangeSearchTypeInputValue}
            >
              {searchTypes.map(type => <option key={type}>{type}</option>)}
            </Input>
          </div>
        </div>
        <h3>Initial Grid</h3>
        <GridUI gridInfo={gameGrid} />
        <hr />
      </div>
    );
  }
}
