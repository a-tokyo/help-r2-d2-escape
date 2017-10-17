/* @flow */
import _ from 'lodash';

/** generalSearch helpers */
/** creates a queue of nodes */
export const makeQueue = (nodes: Node | Array<Node>) =>
  Array.isArray(nodes) ? nodes : [nodes];
/** creates an initial node out of a state */
export const makeNode = (
  state: State,
  parent?: Node | null = null,
  operator?: Operator | null = null,
  depth?: number = 0,
  pathCost?: number = 0
): Node => ({
  state,
  parent,
  operator,
  depth,
  pathCost,
});

/** Problem helpers */
/** gets the initial state of a problem */
export const initialState = (problem: Problem): State => problem.initialState;
/** gets the goalTest function of a problem */
export const goalTest = (problem: Problem): GoalTestFunc => problem.goalTest;

/** Node helpers */
/** gets the state of a node */
export const state = (node: Node): State => node.state;
/** expands a node according to a problem
 * @TODO implement properly
*/

export const expand = (node: Node, problem: Problem): Array<Node> => {
  // problem.operators.forEach(operator => {});
  // const newStateConfigs = problem.stateSpace(node.state ,problem.operators);
};

/** R2D2 state space logic */

// const arrayHasRock = items => _.find(items, { type: 'rock' });
const arrayHasObstacle = items => _.find(items, { type: 'obstacle' });
// const arrayHasRockAndPressurepad = items =>
//   _.find(items, { type: 'rock' }) && _.find(items, { type: 'pressurepad' });

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
  grid: any,
  newPos: GridItemPos,
  rocksPositions: Array<GridItemPos>,
  unPushedPads: number,
  currwRockPositionItem: GridItemPos | null,
  newRockPositionItem: GridItemPos | null
): State => {
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

const applyOperator = (operator: Operator, currState: State): State | null => {
  const grid = {
    grid: [[]],
    config: {},
  };

  const currPos = currState.cell;
  const currRocksPositions = currState.rocksPositions;
  const currUnPushedPads = currState.unPushedPads;

  switch (operator) {
    case 'move_north':
      if (canMoveNorth(currState, grid)) {
        // @TODO valid pos up move row -1
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
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
        // @TODO valid pos down move row +1
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
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
        // @TODO valid pos left move col -1
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
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
