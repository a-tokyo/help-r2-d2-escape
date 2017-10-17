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

// const arrayHasRock = items => _.find(items, { type: 'rock' });
const arrayHasObstacle = items => _.find(items, { type: 'obstacle' });
// const arrayHasRockAndPressurepad = items =>
//   _.find(items, { type: 'rock' }) && _.find(items, { type: 'pressurepad' });

const stateHasRockAtPos = (
  stateToCheck: State,
  position: GridItemPos
): boolean => Boolean(_.find(stateToCheck.rocksPositions, position));

const stateHasRockAndPadAtPos = (
  stateToCheck: State,
  position: GridItemPos,
  gridToCheck: any
): boolean =>
  Boolean(_.find(stateToCheck.rocksPositions, position)) &&
  Boolean(_.find(gridToCheck.config.pressurePadsPositions, position));

const applyOperator = (operator: Operator, node: Node) => {
  const grid = {
    grid: [[]],
    config: {},
  };

  const { state: currState } = node;
  const currPos = currState.cell;
  switch (operator) {
    case 'move_north':
      if (
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
        )
      ) {
        // @TODO valid pos up move row -1
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
      }
      break;
    case 'move_south':
      if (
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
        )
      ) {
        // @TODO valid pos down move row +1
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
      }
      break;
    case 'move_west':
      if (
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
        )
      ) {
        // @TODO valid pos left move col -1
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
      }
      break;
    case 'move_east':
      if (
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
        )
      ) {
        // @TODO valid pos right move col +1
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
      }
      break;
    default:
      console.error('unknown operator: ', operator);
  }
};

// const validGridPos = (grid: Array<Array<any>>, i: number, j: number) =>
//   !(grid[i] === undefined || grid[i][j] === undefined);
