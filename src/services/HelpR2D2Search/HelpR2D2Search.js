/* @flow */
import _ from 'lodash';

import { Store } from '../';
import { generalSearch, backTrackOperators } from '../Search/Search';
import {
  breadthFirstQueuingFunc,
  depthFirstQueuingFunc,
  uniformCostQueuingFunc,
  iterativeDeepeningQueuingFunc,
  greedyQueuingFuncA,
  greedyQueuingFuncB,
  aStarQueuingFuncA,
  aStarQueuingFuncB,
} from '../Search/queuingFunctions';

import { applyOperator } from './HelpR2D2SearchHelpers';

/** The max depth ID search ever reaches, pseudo wise would be infinity
 * but the application are bounded by memory.
 */
const ID_MAX_DEPTH = 10000;

/**
 * Creates an R2D2 search problem according to a grid
 * then runs the general search algorithm according to the strategy and returns the result.
 *
 * Author: Tokyo
 */
const Search = (
  grid: { grid: Array<Array<any>>, config: Object },
  strategy: SearchStrategy = 'BF',
  visualize: boolean = false
): {
  sequence: Array<Operator> | null,
  cost: number | null,
  expandedNodesCount: number | null,
} => {
  /** keep track of the previous state */
  /** Reset the global store */
  Store.reset();
  /** create the search problem */
  const problem: Problem = {
    operators: ['move_north', 'move_south', 'move_east', 'move_west'],
    initialState: {
      cell: _.cloneDeep(grid.config.playerPosition),
      unPushedPads: grid.config.pressurePadsCount,
      rocksPositions: _.cloneDeep(grid.config.rocksPositions),
    },
    stateSpace: (
      state: State,
      operators: Array<Operator>
    ): Array<StateConfig> => {
      let newStateConfigs: Array<StateConfig> = [];
      operators.forEach(operator => {
        const newState: State | null = applyOperator(
          operator,
          state,
          grid,
          Store.previousStates
        );
        if (newState) {
          newStateConfigs = newStateConfigs.concat({
            operator,
            state: newState,
          });
        }
      });
      return newStateConfigs;
    },
    goalTest: (state: State) =>
      state.unPushedPads === 0 &&
      _.isEqual(state.cell, grid.config.teleportalPosition),
    pathCost: (state: State, operators: Array<Operator>): number =>
      operators.length,
    heuristicCostA: (
      currState: State,
      operators: Array<Operator>,
      newState: State
      // gridConfig: GridConfigObject
    ): number => {
      /**
       * Here is where to calculate the heuristicCostA. Where the heuristicCost is either 1 to motivate the
       * player to go to it (it will make it nearer to the rock) or 10 which is the same for any random cell
       * which isn't beneficial in reaching the goal.
       *
       * Delta distance is calculated by = adding the difference of rows with the difference of coloumns
       */
      const { config: gridConfig } = grid;
      const { row: currRow, col: currCol } = currState.cell;
      const { row: nextRow, col: nextCol } = newState.cell;
      const {
        row: teleportalRow,
        col: teleportalCol,
      } = gridConfig.teleportalPosition;
      // If neew state is the teleportal then return 0
      if (_.isEqual(newState.cell, gridConfig.teleportalPosition)) {
        return 0;
      }
      // Check if in the nextState the teleportal will be activated and this move will make the player get
      // near it then it returns 1
      if (newState.unPushedPads === 0) {
        const distanceFromCurrent =
          currRow - teleportalRow + (currCol - teleportalCol);
        const distanceFromNew =
          nextRow - teleportalRow + (nextCol - teleportalCol);
        return distanceFromNew < distanceFromCurrent ? 1 : 10;
      }
      // Get nearstRock to current position and nearst distance
      let nearstRock = gridConfig.rocksPositions[0];
      let deltaDistance =
        currRow -
        gridConfig.rocksPositions[0].row +
        (currCol - gridConfig.rocksPositions[0].col);
      gridConfig.rocksPositions.forEach(rock => {
        const newDeltaDistance = currRow - rock.row + (currCol - rock.col);
        if (newDeltaDistance < deltaDistance) {
          deltaDistance = newDeltaDistance;
          nearstRock = rock;
        }
      });

      // Compare the distance between the nearest rock and the current and next state
      // If it's the same then the heuristic cost is the same as every cell which is 10, else it is 1
      const distanceFromNext =
        nextRow - nearstRock.row + (nextCol - nearstRock.col);
      return distanceFromNext < deltaDistance ? 1 : 10;
    },
    heuristicCostB: (
      currState: State,
      operators: Array<Operator>,
      newState: State
      // gridConfig: GridConfigObject
    ): number => {
      /**
       * Here is where to calculate the heuristicCostA. Where the heuristicCost is either 1 to motivate the
       * player to go to it (it will make it nearer to the rock) or 10 which is the same for any random cell
       * which isn't beneficial in reaching the goal.
       *
       * Delta distance is the  Euclidean distance.
       * dist((x, y), (a, b)) = √(x - a)² + (y - b)²
       */
      const { config: gridConfig } = grid;
      const { row: currRow, col: currCol } = currState.cell;
      const { row: nextRow, col: nextCol } = newState.cell;
      const {
        row: teleportalRow,
        col: teleportalCol,
      } = gridConfig.teleportalPosition;
      // If neew state is the teleportal then return 0
      if (_.isEqual(newState.cell, gridConfig.teleportalPosition)) {
        return 0;
      }
      // Check if in the nextState the teleportal will be activated and this move will make the player get
      // near it then it returns 1
      if (newState.unPushedPads === 0) {
        const distanceFromCurrent = Math.sqrt(
          (currRow - teleportalRow) ** 2 + (currCol - teleportalCol) ** 2
        );
        const distanceFromNew = Math.sqrt(
          (nextRow - teleportalRow) ** 2 + (nextCol - teleportalCol) ** 2
        );
        return distanceFromNew < distanceFromCurrent ? 1 : 10;
      }
      // Get nearstRock to current position and nearst distance
      let nearstRock = gridConfig.rocksPositions[0];
      let deltaDistance = Math.sqrt(
        (currRow - gridConfig.rocksPositions[0].row) ** 2 +
          (currCol - gridConfig.rocksPositions[0].col) ** 2
      );
      gridConfig.rocksPositions.forEach(rock => {
        const newDeltaDistance = Math.sqrt(
          (currRow - rock.row) ** 2 + (currCol - rock.col) ** 2
        );
        if (newDeltaDistance < deltaDistance) {
          deltaDistance = newDeltaDistance;
          nearstRock = rock;
        }
      });
      // Compare the distance between the nearest rock and the current and next state
      // If it's the same then the heuristic cost is the same as every cell which is 10, else it is 1
      const distanceFromNext = Math.sqrt(
        (nextRow - nearstRock.row) ** 2 + (nextCol - nearstRock.col) ** 2
      );
      return distanceFromNext < deltaDistance ? 1 : 10;
    },
  };

  /** set the propper queuing function */
  let qingFunc: QueuingFunction = breadthFirstQueuingFunc;

  switch (strategy) {
    case 'BF':
      qingFunc = breadthFirstQueuingFunc;
      break;
    case 'DF':
      qingFunc = depthFirstQueuingFunc;
      break;
    case 'UC':
      qingFunc = uniformCostQueuingFunc;
      break;
    case 'ID':
      qingFunc = iterativeDeepeningQueuingFunc(ID_MAX_DEPTH);
      break;
    case 'GR1':
      qingFunc = greedyQueuingFuncA;
      break;
    case 'GR2':
      qingFunc = greedyQueuingFuncB;
      break;
    case 'AS1':
      qingFunc = aStarQueuingFuncA;
      break;
    case 'AS2':
      qingFunc = aStarQueuingFuncB;
      break;
    default:
      console.error('unknown search strategy: ', strategy);
  }

  /** Initialize the returned variables */
  let searchResNode = null;
  let expandedNodesCount = null;

  /** Seperating special case from usual case search algorithms and updating the returned variables accordingly. */
  if (strategy === 'ID') {
    /** Special case strategies go here */
    for (let maxDepth = 1; maxDepth < ID_MAX_DEPTH; maxDepth += 1) {
      const genSearchRes = generalSearch(
        problem,
        iterativeDeepeningQueuingFunc(maxDepth)
      );
      if (genSearchRes.node) {
        searchResNode = genSearchRes.node;
        expandedNodesCount = genSearchRes.expandedNodesCount;
        break;
      }
      /** VERY IMPORTANT RESET PREVIOUS STATES */
      Store.reset('previousStates');
    }
  } else {
    /** Usual case strategies go here */
    const {
      node: currSearchResNode,
      expandedNodesCount: currExpandedNodesCount,
    } = generalSearch(problem, qingFunc);
    searchResNode = currSearchResNode;
    expandedNodesCount = currExpandedNodesCount;
  }

  const cost: number | null = searchResNode ? searchResNode.pathCost : null;
  const sequence: Array<Operator> = searchResNode
    ? backTrackOperators(searchResNode)
    : [];

  console.info(
    'visualizationStatesInOrder',
    Store.get('visualizationStatesInOrder')
  );

  /** VERY IMPORTANT RESET PREVIOUS STATES */
  Store.reset('previousStates');

  return {
    sequence,
    cost,
    expandedNodesCount,
  };
};

export default Search;
