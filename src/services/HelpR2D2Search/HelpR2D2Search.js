/* @flow */
import _ from 'lodash';

import { generalSearch } from '../Search/Search';
import {
  breadthFirstQueuingFunc,
  depthFirstQueuingFunc,
  uniformCostQueuingFunc,
  iterativeDeepeningQueuingFunc,
} from '../Search/queuingFunctions';

const Search = (
  grid: { grid: Array<Array<any>>, config: Object },
  strategy: string,
  visualize: boolean
) => {
  /** keep track of the previous state */
  let previousStates: Array<State> = [];
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
    ): Array<StateConfg> => {
      const newState: State | null = applyOperator(
        operators[0],
        state,
        grid,
        previousStates
      );
      return {
        state: newState,
        // operator,
      };
    },
    goalTest: (state: State) =>
      state.unPushedPads === 0 &&
      _.isEqual(state.cell, grid.config.playerPosition),
    pathCost: (operators: Array<Operator>): number => operators.length,
  };

  /** set the propper queuing function */
  let qingFunc: QueuingFunction = breadthFirstQueuingFunc;

  switch (strategy) {
    case 'bfs':
      qingFunc = breadthFirstQueuingFunc;
      break;
    case 'dfs':
      qingFunc = depthFirstQueuingFunc;
      break;
    case 'uniform_cost':
      qingFunc = uniformCostQueuingFunc;
      break;
    case 'iterative_deepening':
      qingFunc = iterativeDeepeningQueuingFunc;
      break;
    default:
      console.error('unknown search strategy: ', strategy);
  }

  return generalSearch(problem, qingFunc);
};

/** R2D2 state space logic */

const arrayHasObstacle = items => _.find(items, { type: 'obstacle' });

const stateHasRockAtPos = (
  stateToCheck: State,
  position: GridItemPos
): boolean => Boolean(_.find(stateToCheck.rocksPositions, position));

const getStateRockPosAtPos = (
  stateToCheck: State,
  position: GridItemPos
): GridItemPos | null => _.find(stateToCheck.rocksPositions, position) || null;

const stateHasRockAndPadAtPos = (
  stateToCheck: State,
  position: GridItemPos,
  gridToCheck: any
): boolean =>
  Boolean(_.find(stateToCheck.rocksPositions, position)) &&
  Boolean(_.find(gridToCheck.config.pressurePadsPositions, position));

const gridHasPressurepadAtPos = (gridToCheck: any, position: GridItemPos) =>
  Boolean(_.find(gridToCheck.config.pressurePadsPositions, position));

const getNewState = (
  previousStates: Array<State>,
  grid: any,
  newPos: GridItemPos,
  rocksPositions: Array<GridItemPos>,
  unPushedPads: number,
  currwRockPositionItem: GridItemPos | null,
  newRockPositionItem: GridItemPos | null
): State | null => {
  let newRockPositions = _.cloneDeep(rocksPositions);
  let newUnPushedPads = unPushedPads;
  if (newRockPositionItem) {
    newRockPositions = rocksPositions
      .filter(item => !_.isEqual(item, currwRockPositionItem))
      .concat(newRockPositionItem);
    if (gridHasPressurepadAtPos(grid, newRockPositionItem)) {
      newUnPushedPads += 1;
    }
  }
  const newState: State = {
    cell: newPos,
    rocksPositions: newRockPositions,
    unPushedPads: newUnPushedPads,
  };
  /**
   * if the state was generated before, return null and don't generate it again.
   */
  if (
    previousStates.find(previousState => _.isEqual(previousState, newState))
  ) {
    return null;
  }
  /* eslint-disable */
  /** mutate the previous state array */
  previousStates = previousStates.concat(newState);
  /* eslint-enable */
  return newState;
};

const canMoveEast = (currState: State, grid: any): boolean => {
  const { cell: currPos } = currState;
  return (
    currPos.col < grid.config.cols - 1 &&
    !arrayHasObstacle(grid.grid[currPos.row][currPos.col + 1].items) &&
    !stateHasRockAndPadAtPos(
      currState,
      { row: currPos.row, col: currPos.col + 1 },
      grid
    ) &&
    !(
      currPos.col === grid.config.cols - 2 &&
      stateHasRockAtPos(currState, {
        row: currPos.row,
        col: currPos.col + 1,
      })
    ) &&
    !(
      stateHasRockAtPos(currState, {
        row: currPos.row,
        col: currPos.col + 1,
      }) &&
      stateHasRockAtPos(currState, {
        row: currPos.row,
        col: currPos.col + 2,
      })
    )
  );
};

const canMoveWest = (currState: State, grid: any): boolean => {
  const { cell: currPos } = currState;
  return (
    currPos.col > 0 &&
    !arrayHasObstacle(grid.grid[currPos.row][currPos.col - 1].items) &&
    !stateHasRockAndPadAtPos(
      currState,
      { row: currPos.row, col: currPos.col - 1 },
      grid
    ) &&
    !(
      currPos.col === 1 &&
      stateHasRockAtPos(currState, {
        row: currPos.row,
        col: currPos.col - 1,
      })
    ) &&
    !(
      stateHasRockAtPos(currState, {
        row: currPos.row,
        col: currPos.col - 1,
      }) &&
      stateHasRockAtPos(currState, {
        row: currPos.row,
        col: currPos.col - 2,
      })
    )
  );
};

const canMoveNorth = (currState: State, grid: any): boolean => {
  const { cell: currPos } = currState;
  return (
    currPos.row > 0 &&
    !arrayHasObstacle(grid.grid[currPos.row - 1][currPos.col].items) &&
    !stateHasRockAndPadAtPos(
      currState,
      { row: currPos.row - 1, col: currPos.col },
      grid
    ) &&
    !(
      currPos.row === 1 &&
      stateHasRockAtPos(currState, {
        row: currPos.row - 1,
        col: currPos.col,
      })
    ) &&
    !(
      stateHasRockAtPos(currState, {
        row: currPos.row - 1,
        col: currPos.col,
      }) &&
      stateHasRockAtPos(currState, {
        row: currPos.row - 2,
        col: currPos.col,
      })
    )
  );
};

const canMoveSouth = (currState: State, grid: any): boolean => {
  const { cell: currPos } = currState;
  return (
    currPos.row < grid.config.rows - 1 &&
    !arrayHasObstacle(grid.grid[currPos.row + 1][currPos.col].items) &&
    !stateHasRockAndPadAtPos(
      currState,
      { row: currPos.row + 1, col: currPos.col },
      grid
    ) &&
    !(
      currPos.row === grid.config.rows - 2 &&
      stateHasRockAtPos(currState, {
        row: currPos.row + 1,
        col: currPos.col,
      })
    ) &&
    !(
      stateHasRockAtPos(currState, {
        row: currPos.row + 1,
        col: currPos.col,
      }) &&
      stateHasRockAtPos(currState, {
        row: currPos.row + 2,
        col: currPos.col,
      })
    )
  );
};

const applyOperator = (
  operator: Operator,
  currState: State,
  grid: any,
  previousStates: Array<State>
): State | null => {
  const currPos = currState.cell;
  const currRocksPositions = currState.rocksPositions;
  const currUnPushedPads = currState.unPushedPads;

  switch (operator) {
    case 'move_north':
      if (canMoveNorth(currState, grid)) {
        /**
         * valid position to the north, move (row - 1)
         * if the new position has rock, move rock -> check if rock moved to a pressure pad
         */
        const rockPosStateItem: GridItemPos | null = getStateRockPosAtPos(
          currState,
          {
            row: currPos.row - 1,
            col: currPos.col,
          }
        );
        let newRockPosItem = null;
        if (rockPosStateItem) {
          newRockPosItem = {
            row: currPos.row - 2,
            col: currPos.col,
          };
        }
        const newCell: GridItemPos = {
          row: currPos.row - 1,
          col: currPos.col,
        };
        return getNewState(
          previousStates,
          grid,
          newCell,
          currRocksPositions,
          currUnPushedPads,
          rockPosStateItem,
          newRockPosItem
        );
      }
      break;
    case 'move_south':
      if (canMoveSouth(currState, grid)) {
        /**
         * valid position to the south, move (row + 1)
         * if the new position has rock, move rock -> check if rock moved to a pressure pad
         */
        const rockPosStateItem: GridItemPos | null = getStateRockPosAtPos(
          currState,
          {
            row: currPos.row + 1,
            col: currPos.col,
          }
        );
        let newRockPosItem = null;
        if (rockPosStateItem) {
          newRockPosItem = {
            row: currPos.row + 2,
            col: currPos.col,
          };
        }
        const newCell: GridItemPos = {
          row: currPos.row + 1,
          col: currPos.col,
        };
        return getNewState(
          previousStates,
          grid,
          newCell,
          currRocksPositions,
          currUnPushedPads,
          rockPosStateItem,
          newRockPosItem
        );
      }
      break;
    case 'move_west':
      if (canMoveWest(currState, grid)) {
        /**
         * valid position to the west, move (col - 1)
         * if the new position has rock, move rock -> check if rock moved to a pressure pad
         */
        const rockPosStateItem: GridItemPos | null = getStateRockPosAtPos(
          currState,
          {
            row: currPos.row,
            col: currPos.col - 1,
          }
        );
        let newRockPosItem = null;
        if (rockPosStateItem) {
          newRockPosItem = {
            row: currPos.row,
            col: currPos.col - 2,
          };
        }
        const newCell: GridItemPos = {
          row: currPos.row,
          col: currPos.col - 1,
        };
        return getNewState(
          previousStates,
          grid,
          newCell,
          currRocksPositions,
          currUnPushedPads,
          rockPosStateItem,
          newRockPosItem
        );
      }
      break;
    case 'move_east':
      if (canMoveEast(currState, grid)) {
        /**
         * valid position to the east, move (col + 1)
         * if the new position has rock, move rock -> check if rock moved to a pressure pad
         */
        const rockPosStateItem: GridItemPos | null = getStateRockPosAtPos(
          currState,
          {
            row: currPos.row,
            col: currPos.col + 1,
          }
        );
        let newRockPosItem = null;
        if (rockPosStateItem) {
          newRockPosItem = {
            row: currPos.row,
            col: currPos.col + 2,
          };
        }
        const newCell: GridItemPos = {
          row: currPos.row,
          col: currPos.col + 1,
        };
        return getNewState(
          previousStates,
          grid,
          newCell,
          currRocksPositions,
          currUnPushedPads,
          rockPosStateItem,
          newRockPosItem
        );
      }
      break;
    default:
      console.error('unknown operator: ', operator);
  }
  return null;
};

// const validGridPos = (grid: Array<Array<any>>, i: number, j: number) =>
//   !(grid[i] === undefined || grid[i][j] === undefined);

export default Search;
