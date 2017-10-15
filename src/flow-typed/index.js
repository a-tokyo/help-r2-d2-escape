/* @flow */
/* eslint no-undef: 1 */

export type Operator = any;

export type State = {
  cell: number,
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

export type Problem = {
  operators: Array<Operator>,
  initialState: State,
  stateSpace: (State, Array<Operator>) => Array<State>,
  goalTest: GoalTestFunc,
  pathCost: (Array<Operator>) => number,
};

export type MakeNodeFucntion = State => Array<Node>;

export type QueuingFunction = (Array<Node>, Array<Node>) => Array<Node>;

export type GridItemPosition = {
  row: number,
  col: number,
};
