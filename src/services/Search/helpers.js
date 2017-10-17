/* @flow */
import _ from 'lodash';

/** generalSearch helpers */
/** creates a queue of nodes */
export const makeQueue = (nodes: Node | Array<Node>) =>
  Array.isArray(nodes) ? nodes : [nodes];
/** creates an initial node out of a state */
export const makeNode = (state: State): Node => ({
  state,
  parent: null,
  operator: null,
  depth: 0,
  pathCost: 0,
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

// GridConfigObject = {
//   rows: number,
//   cols: number,
//   availableCellsCount: number,
//   playerPosition: GridItemPos | null,
//   teleportalPosition: GridItemPos | null,
//   obstaclesPositions: Array<GridItemPos>,
//   pressurePadsPositions: Array<GridItemPos>,
//   rocksPositions: Array<GridItemPos>,
//   obstaclesCount: number,
//   pressurePadsCount: number,
//   rocksCount: number,
// };

const gridConfigObject: GridConfigObject = {};

export const expand = (node: Node, problem: Problem): Array<Node> => {
  problem.operators.forEach(operator => {});
};

const grid = [[]];
const gridConfig = {};
const applyOperator = (operator: Operator, node: Node) => {
  const { state } = node;
  const currPos = state.cell;
  switch (operator) {
    case 'move_up':
      if (
        currPos.row > 0 &&
        !arrayHasObstacle(grid[currPos.row - 1][currPos.col].items) &&
        !(
          currPos.row === 1 &&
          arrayHasRock(grid[currPos.row - 1][currPos.col].items)
        )
      ) {
        // @TODO valid pos up move
        // check if has rock, if so, move rock
      }
      break;
    case 'move_down':
      if (
        currPos.row < gridConfig.rows - 1 &&
        !arrayHasObstacle(grid[currPos.row + 1][currPos.col].items) &&
        !(
          currPos.row === gridConfig.rows - 2 &&
          arrayHasRock(grid[currPos.row + 1][currPos.col].items)
        )
      ) {
        // @TODO valid pos down move
        // check if has rock, if so, move rock
      }
      break;
    case 'move_left':
      if (
        currPos.col > 0 &&
        !arrayHasObstacle(grid[currPos.row][currPos.col].items) &&
        !(
          currPos.col === 1 &&
          arrayHasRock(grid[currPos.row][currPos.col - 1].items)
        )
      ) {
        // @TODO valid pos left move
        // check if has rock, if so, move rock
      }
      break;
    case 'move_right':
      if (
        currPos.col < gridConfig.cols - 1 &&
        !arrayHasObstacle(grid[currPos.row][currPos.col].items) &&
        !(
          currPos.col === gridConfig.cols - 2 &&
          arrayHasRock(grid[currPos.row][currPos.col + 1].items)
        )
      ) {
        // @TODO valid pos right move
        // check if has rock, if so, move rock
      }
      break;
  }
};

const arrayHasRock = items => _.find(items, { type: 'rock' });
const arrayHasObstacle = items => _.find(items, { type: 'obstacle' });

const validGridPos = (grid: Array<Array<any>>, i: number, j: number) =>
  !(grid[i] === undefined || grid[i][j] === undefined);
