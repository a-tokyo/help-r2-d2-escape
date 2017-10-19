/* @flow weak */
import React, { Component } from 'react';
import { Container, Button, Input, Row, Col } from 'reactstrap';

import { GridUI } from '../../components';
import { generateGrid, HelpR2D2Search, Store } from '../../services';
import {
  gridMapToString,
  generateGridFromConfigAndState,
} from '../../services/generateGrid/generateGridHelpers';

import './Game.css';

const updateIntervalTimes: Array<number> = [20, 50, 200];

export default class Game extends Component {
  state = {
    gameGrid: null,
    onGoingGameGridGrid: null,
    currOnGoingSearchState: null,
    currOnGoingSearchStateIndex: -1,
    solution: null,
    onGoingIntervalId: null,
    searchTypeInputValue: Store.searchTypes[0],
    problemTypeInputValue: Store.problemTypes[0],
    updateIntervalTime: 20,
  };

  componentWillUnmount() {
    /** Clear the bound interval from the dom */
    this._clearOngoingInterval();
  }

  /** Set an ongoing interval to render the animated search visualization */
  _setOngoingInterval = () => {
    /** track the onGoingViews by interval */
    const onGoingIntervalId = setInterval(
      this._renderNewOngoingView,
      this.state.updateIntervalTime
    );
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
      currOnGoingSearchState =
        Store.visualizationStatesInOrder[newCurrOnGoingSearchStateIndex];
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
    }
  };

  _newGame = () => {
    const { problemTypeInputValue } = this.state;
    console.info('############NEW GAME############');
    let gameGrid = Store.gameGrids.solvableLongGrid;
    /** Check the desired problem type and set the grid accordingly */
    switch (problemTypeInputValue) {
      case 'Solvable Long Grid':
        gameGrid = Store.gameGrids.solvableLongGrid;
        break;
      case 'Random Grid':
        gameGrid = generateGrid();
        break;
      default:
    }

    /** log initial info */
    console.info('gameGrid =>', gameGrid);
    console.info('gameGridMap ==>\n', gridMapToString(gameGrid.grid));

    const solution = HelpR2D2Search(gameGrid, this.state.searchTypeInputValue);
    /** log search solution */
    console.info('HelpR2D2Search solution ==>', solution);

    this.setState({
      gameGrid,
      solution,
      onGoingGameGridGrid: gameGrid.grid,
      currOnGoingSearchState: null,
      currOnGoingSearchStateIndex: -1,
    });

    this._clearOngoingInterval();
    this._setOngoingInterval();
  };

  _handleChangeSearchTypeInputValue = event => {
    this.setState({ searchTypeInputValue: event.target.value });
  };

  _handleChangeProblemTypeInputValue = event => {
    this.setState({ problemTypeInputValue: event.target.value });
  };

  _handleChangeInputValue = (inputKey: string) => event => {
    this.setState({ [inputKey]: event.target.value });
  };

  render() {
    const {
      gameGrid,
      searchTypeInputValue,
      problemTypeInputValue,
      onGoingGameGridGrid,
      currOnGoingSearchState,
      solution,
      updateIntervalTime,
    } = this.state;
    return (
      <Container fluid className="game">
        <header className="game__header">
          <Button color="primary" onClick={this._newGame}>
            New Game
          </Button>
          <div className="game__controlers">
            <div className="game__controlers__item">
              <label>Problem Type: </label>
              <div className="game__controlers_select">
                <Input
                  type="select"
                  value={problemTypeInputValue}
                  onChange={this._handleChangeProblemTypeInputValue}
                >
                  {Store.problemTypes.map(type => (
                    <option key={type}>{type}</option>
                  ))}
                </Input>
              </div>
            </div>
            <div className="game__controlers__item">
              <label>Search Type: </label>
              <div className="game__controlers_select">
                <Input
                  type="select"
                  value={searchTypeInputValue}
                  onChange={this._handleChangeSearchTypeInputValue}
                >
                  {Store.searchTypes.map(type => (
                    <option key={type}>{type}</option>
                  ))}
                </Input>
              </div>
            </div>
            <div className="game__controlers__item">
              <label>Render Interval ms: </label>
              <div className="game__controlers_select">
                <Input
                  type="select"
                  value={updateIntervalTime}
                  onChange={this._handleChangeInputValue('updateIntervalTime')}
                >
                  {updateIntervalTimes.map(type => (
                    <option key={type}>{type}</option>
                  ))}
                </Input>
              </div>
            </div>
          </div>
          {solution ? (
            <div>
              <h4>Solution: </h4>
              <label>
                <b>Sequence: </b>
              </label>
              <div>
                {solution.sequence.length > 0
                  ? solution.sequence.map(
                      (item, i) =>
                        `${item}${i === solution.sequence.length - 1
                          ? ''
                          : ', '}`
                    )
                  : 'NA'}
              </div>
              <div className="game_solution_mini-items">
                <div>
                  <label>
                    <b>Cost:</b>
                  </label>
                  <span> {solution.cost || 'NA'}</span>
                </div>
                <div>
                  <label>
                    <b>Expanded Nodes Count:</b>
                  </label>
                  <span> {solution.expandedNodesCount}</span>
                </div>
              </div>
            </div>
          ) : null}
        </header>
        {gameGrid ? (
          <Row>
            <Col xs={12} lg={6} className="game__section">
              <h3>Initial Grid</h3>
              <GridUI gridInfo={gameGrid} />
              <hr />
            </Col>
            <Col xs={12} lg={6} className="game__section">
              <h3>Animation of explored states</h3>
              <GridUI
                gridInfo={{
                  grid: onGoingGameGridGrid,
                  config: gameGrid.config,
                }}
                state={currOnGoingSearchState}
              />
              <hr />
            </Col>
          </Row>
        ) : (
          <div className="game__splash-screen" />
        )}
        <aside>
          <p>
            The Goal is for R2-D2 to place the lightsabers on the pressure pads
            while avoiding the storm troopers then head to the teleportal.
          </p>
          <h4>CHECK THE CONSOLE FOR DETAILED STACK TRACES.</h4>
          <span>Caution: Iterative deepening exhausts the memory.</span>
        </aside>
      </Container>
    );
  }
}
