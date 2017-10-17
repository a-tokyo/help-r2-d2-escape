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

const gridConfigObject: GridConfigObject = {};

export const expand = (node: Node, problem: Problem): Array<Node> => {
  // problem.operators.forEach(operator => {});
  // const newStateConfigs = problem.stateSpace(node.state ,problem.operators);
};

const arrayHasRock = items => _.find(items, { type: 'rock' });
const arrayHasObstacle = items => _.find(items, { type: 'obstacle' });
const arrayHasRockAndPressurepad = items =>
  _.find(items, { type: 'rock' }) && _.find(items, { type: 'pressurepad' });

const grid = [[]];
const gridConfig = {};
const applyOperator = (operator: Operator, node: Node) => {
  const { state } = node;
  const currPos = state.cell;
  switch (operator) {
    case 'move_north':
      if (
        currPos.row > 0 &&
        !arrayHasObstacle(grid[currPos.row - 1][currPos.col].items) &&
        !arrayHasRockAndPressurepad(grid[currPos.row - 1][currPos.col].items) &&
        !(
          currPos.row === 1 &&
          arrayHasRock(grid[currPos.row - 1][currPos.col].items)
        )
      ) {
        // @TODO valid pos up move
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
      }
      break;
    case 'move_south':
      if (
        currPos.row < gridConfig.rows - 1 &&
        !arrayHasObstacle(grid[currPos.row + 1][currPos.col].items) &&
        !arrayHasRockAndPressurepad(grid[currPos.row + 1][currPos.col].items) &&
        !(
          currPos.row === gridConfig.rows - 2 &&
          arrayHasRock(grid[currPos.row + 1][currPos.col].items)
        )
      ) {
        // @TODO valid pos down move
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
      }
      break;
    case 'move_west':
      if (
        currPos.col > 0 &&
        !arrayHasObstacle(grid[currPos.row][currPos.col - 1].items) &&
        !arrayHasRockAndPressurepad(grid[currPos.row][currPos.col - 1].items) &&
        !(
          currPos.col === 1 &&
          arrayHasRock(grid[currPos.row][currPos.col - 1].items)
        )
      ) {
        // @TODO valid pos left move
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
      }
      break;
    case 'move_east':
      if (
        currPos.col < gridConfig.cols - 1 &&
        !arrayHasObstacle(grid[currPos.row][currPos.col + 1].items) &&
        !arrayHasRockAndPressurepad(grid[currPos.row][currPos.col + 1].items) &&
        !(
          currPos.col === gridConfig.cols - 2 &&
          arrayHasRock(grid[currPos.row][currPos.col + 1].items)
        )
      ) {
        // @TODO valid pos right move
        // check if has rock, if so, move rock -> check if rock moved to or from pressure pad
      }
      break;
  }
};

// const validGridPos = (grid: Array<Array<any>>, i: number, j: number) =>
//   !(grid[i] === undefined || grid[i][j] === undefined);
