/* @flow */
import _ from 'lodash';

export const getGridPosItemHash = (pos: GridItemPos) =>
  `[${pos.row},${pos.col}]`;

export const getStateHash = (state: State): string => {
  let stringToRet = `${getGridPosItemHash(state.cell)}|${state.unPushedPads}|[`;
  state.rocksPositions.forEach(rockPos => {
    stringToRet += getGridPosItemHash(rockPos);
  });
  stringToRet += ']';
  return stringToRet;
};

/** R2D2 state space logic */

/**
 * Checks if the grid has an obstacle at a position.
 */
const gridHasObstacleAtPos = (
  position: GridItemPos,
  gridToCheck: any
): boolean => Boolean(_.find(gridToCheck.config.obstaclesPositions, position));

/**
 * Checks if the state has a rock at a position.
 */
const stateHasRockAtPos = (
  stateToCheck: State,
  position: GridItemPos
): boolean => Boolean(_.find(stateToCheck.rocksPositions, position));

/**
 * Gets the rock position if it exists.
 */
const getStateRockPosAtPos = (
  stateToCheck: State,
  position: GridItemPos
): GridItemPos | null => _.find(stateToCheck.rocksPositions, position) || null;

/**
 * Checks if a position is both a state rock position and a grid pressurepad position.
 * ie, at the moment a rock is on a pressurepad.
 */
const stateHasRockAndPadAtPos = (
  stateToCheck: State,
  position: GridItemPos,
  gridToCheck: any
): boolean =>
  Boolean(_.find(stateToCheck.rocksPositions, position)) &&
  Boolean(_.find(gridToCheck.config.pressurePadsPositions, position));

const gridHasPressurepadAtPos = (gridToCheck: any, position: GridItemPos) =>
  Boolean(_.find(gridToCheck.config.pressurePadsPositions, position));

/**
 * Generates a new NON-REPEATED state from the current information of the environment.
 */
const getNewState = (
  previousStates: StatesHashMap,
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
      newUnPushedPads -= 1;
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
  const newStateHash = getStateHash(newState);
  if (previousStates[newStateHash]) {
    return null;
  }
  /** mutate the previous state hashmap */
  previousStates[newStateHash] = true;
  /** return the new state */
  return newState;
};

/**
 * Checks the current state for the possibility of moving east
 * takes into consideration the strength of moving rocks.
 */
const canMoveEast = (currState: State, grid: any): boolean => {
  const { cell: currPos } = currState;
  return (
    currPos.col < grid.config.cols - 1 &&
    !gridHasObstacleAtPos({ row: currPos.row, col: currPos.col + 1 }, grid) &&
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

/**
 * Checks the current state for the possibility of moving west
 * takes into consideration the strength of moving rocks.
 */
const canMoveWest = (currState: State, grid: any): boolean => {
  const { cell: currPos } = currState;
  return (
    currPos.col > 0 &&
    !gridHasObstacleAtPos({ row: currPos.row, col: currPos.col - 1 }, grid) &&
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

/**
 * Checks the current state for the possibility of moving north
 * takes into consideration the strength of moving rocks.
 */
const canMoveNorth = (currState: State, grid: any): boolean => {
  const { cell: currPos } = currState;
  return (
    currPos.row > 0 &&
    !gridHasObstacleAtPos({ row: currPos.row - 1, col: currPos.col }, grid) &&
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

/**
 * Checks the current state for the possibility of moving south
 * takes into consideration the strength of moving rocks.
 */
const canMoveSouth = (currState: State, grid: any): boolean => {
  const { cell: currPos } = currState;
  return (
    currPos.row < grid.config.rows - 1 &&
    !gridHasObstacleAtPos({ row: currPos.row + 1, col: currPos.col }, grid) &&
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

/**
 * Applies an operator to a state and returns the new state if possible or null.
 */
export const applyOperator = (
  operator: Operator,
  currState: State,
  grid: any,
  previousStates: StatesHashMap
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
