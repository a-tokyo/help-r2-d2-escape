/* @flow weak */
import React, { Component } from 'react';
import { Container, Button, Input, Row, Col } from 'reactstrap';

import { GridUI } from '../../components';
import { generateGrid, HelpR2D2Search, Store } from '../../services';
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
    currOnGoingSearchStateIndex: -1,
    searchTypeInputValue: 'BF',
    solution: null,
    onGoingIntervalId: null,
  };

  componentDidMount() {
    /** start a dummy new game */
    this._newGame();
  }

  componentWillUnmount() {
    /** Clear the bound interval from the dom */
    this._clearOngoingInterval();
  }

  /** Set an ongoing interval to render the animated search visualization */
  _setOngoingInterval = () => {
    /** track the onGoingViews by interval */
    const onGoingIntervalId = setInterval(this._renderNewOngoingView, 20);
    /* store intervalId in the state so it can be accessed later: */
    this.setState({ onGoingIntervalId });
  };

  _clearOngoingInterval = () => {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.onGoingIntervalId);
    this.setState({ onGoingIntervalId: null });
  };

  _renderNewOngoingView = () => {
    this._updateOnGoingState();
  };

  _updateOnGoingState = () => {
    const { gameGrid, currOnGoingSearchStateIndex } = this.state;
    let { currOnGoingSearchState } = this.state;
    const newCurrOnGoingSearchStateIndex = currOnGoingSearchStateIndex + 1;

    if (!currOnGoingSearchState) {
      currOnGoingSearchState = Store.visualizationStatesInOrder[0];
    }

    if (
      newCurrOnGoingSearchStateIndex < Store.visualizationStatesInOrder.length
    ) {
      const onGoingGameGridGrid = generateGridFromConfigAndState(
        gameGrid.config,
        currOnGoingSearchState
      );
      this.setState({
        onGoingGameGridGrid,
        currOnGoingSearchStateIndex: newCurrOnGoingSearchStateIndex,
        currOnGoingSearchState:
          Store.visualizationStatesInOrder[newCurrOnGoingSearchStateIndex],
      });
    } else {
      this._clearOngoingInterval();
    }
  };

  _newGame = () => {
    console.info('############NEW GAME############');
    const gameGrid = generateGrid();
    // const gameGrid = solvableLongGrid;

    /** log initial info */
    console.info('gameGrid =>', gameGrid);
    console.info('gameGridMap ==>\n', gridMapToString(gameGrid.grid));

    const solution = HelpR2D2Search(gameGrid, this.state.searchTypeInputValue);
    /** log search solution */
    console.info('HelpR2D2Search solution ==>', solution);

    this.setState({
      gameGrid,
      solution,
      currOnGoingSearchState: null,
      currOnGoingSearchStateIndex: -1,
    });

    this._clearOngoingInterval();
    this._setOngoingInterval();
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
        <aside>
          <h4>CHECK THE CONSOLE FOR DETAILED STACK TRACES.</h4>
        </aside>
      </Container>
    );
  }
}
