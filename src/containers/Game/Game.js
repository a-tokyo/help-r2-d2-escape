/* @flow weak */
import React, { Component } from 'react';
import { Button, Input, Row, Col } from 'reactstrap';

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
    onGoingGameGridGrid: solvableLongGrid.grid,
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

    /** log initial info */
    console.info('gameGrid =>', gameGrid);
    console.info('gameGridMap ==>\n', gridMapToString(gameGrid.grid));

    /** log search solution */
    console.info(
      'HelpR2D2Search result ==>',
      HelpR2D2Search(gameGrid, this.state.searchTypeInputValue)
    );

    this.setState({ gameGrid });
  };

  _handleChangeSearchTypeInputValue = event => {
    this.setState({ searchTypeInputValue: event.target.value });
  };

  render() {
    const {
      gameGrid,
      searchTypeInputValue,
      onGoingGameGridGrid,
      currOnGoingSearchState,
    } = this.state;
    return (
      <article className="game">
        <header className="game__controlers">
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
        </header>
        <Col xs={12} lg={6} className="game__section">
          <h3>Initial Grid</h3>
          <GridUI gridInfo={gameGrid} />
          <hr />
        </Col>
        <Col xs={12} lg={6} className="game__section">
          <h3>Animation of explored states</h3>
          <GridUI
            gridInfo={{ grid: onGoingGameGridGrid, config: gameGrid.config }}
          />
          <hr />
        </Col>
      </article>
    );
  }
}
