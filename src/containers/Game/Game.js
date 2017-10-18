/* @flow weak */
import React, { Component } from 'react';
import { Container, Button, Input, Row, Col } from 'reactstrap';

import { GridUI } from '../../components';
import { generateGrid, HelpR2D2Search } from '../../services';
import {
  gridMapToString,
  generateGridFromConfigAndState,
} from '../../services/generateGrid/generateGridHelpers';

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
    solution: null,
    onGoingIntervalId: null,
  };

  componentDidMount() {
    /** start a dummy new game */
    this._newGame();

    /** track the onGoingViews by interval */
    const onGoingIntervalId = setInterval(this._renderNewOngoingView, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ onGoingIntervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.onGoingIntervalId);
    this.setState({ onGoingIntervalId: null });
  }

  _renderNewOngoingView = () => {
    console.log('NEW VIEW FRAME');
  };

  _updateOnGoingState = (state: State) => {
    const { gameGrid } = this.state;
    const onGoingGameGridGrid = generateGridFromConfigAndState(
      gameGrid.config,
      state
    );
    this.setState({ onGoingGameGridGrid });
  };

  _newGame = () => {
    console.info('############NEW GAME############');
    // const gameGrid = generateGrid();
    const gameGrid = solvableLongGrid;

    /** log initial info */
    console.info('gameGrid =>', gameGrid);
    console.info('gameGridMap ==>\n', gridMapToString(gameGrid.grid));

    const solution = HelpR2D2Search(gameGrid, this.state.searchTypeInputValue);
    /** log search solution */
    console.info('HelpR2D2Search solution ==>', solution);

    this.setState({ gameGrid, solution });
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
      solution,
    } = this.state;
    return (
      <Container fluid className="game">
        <header>
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
          {solution ? (
            <div>
              <h4>Solution: </h4>
              <label>Sequence: </label>
              <div>
                {solution.sequence.map(
                  (item, i) =>
                    `${item}${i === solution.sequence.length - 1 ? '' : ', '}`
                )}
              </div>
              <div className="game_solution_mini-items">
                <div>
                  <label>Cost:</label>
                  <span> {solution.cost}</span>
                </div>
                <div>
                  <label>Expanded Nodes Count:</label>
                  <span> {solution.expandedNodesCount}</span>
                </div>
              </div>
            </div>
          ) : null}
        </header>
        <Row>
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
        </Row>
      </Container>
    );
  }
}
