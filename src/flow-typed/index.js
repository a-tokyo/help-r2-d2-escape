/* @flow */
/* eslint no-undef: 1 */

export type Operator =
  | any
  | 'move_up'
  | 'move_down'
  | 'move_right'
  | 'move_left';

export type GridItemPos = { row: number, col: number };

export type State = {
  cell: GridItemPos,
  direction: string,
  pushedPads: number,
};

export type Node = {
  state: State,
  parent: Node | null,
  operator: Operator | null,
  depth: number,
  pathCost: number,
};

export type GoalTestFunc = State => boolean;

export type StateConfg = {
  state: State,
  operators: Array<operator>,
};

export type Problem = {
  operators: Array<Operator>,
  initialState: State,
  stateSpace: (State, Array<Operator>) => Array<StateConfg>,
  goalTest: GoalTestFunc,
  pathCost: (Array<Operator>) => number,
};

export type MakeNodeFucntion = State => Array<Node>;

export type QueuingFunction = (Array<Node>, Array<Node>) => Array<Node>;

export type GridConfigObject = {
  rows: number,
  cols: number,
  availableCellsCount: number,
  playerPosition: GridItemPos | null,
  teleportalPosition: GridItemPos | null,
  obstaclesPositions: Array<GridItemPos>,
  pressurePadsPositions: Array<GridItemPos>,
  rocksPositions: Array<GridItemPos>,
  obstaclesCount: number,
  pressurePadsCount: number,
  rocksCount: number,
};
