/* @flow */

const propblem: Problem = {
  operators: ['move_up', 'move_down', 'move_right', 'move_left'],
  initialState: {
    cell: { row: 0, col: 0 },
    direction: 'east',
    pushedPads: 0,
  },
  stateSpace: (
    state: State,
    operators: Array<Operator>
  ): Array<StateConfg> => {},
  goalTest: (state: State) => {
    // state.pushedPads === allPads
    // state.cell === teleporter cell
  },
  pathCost: (operators: Array<Operator>): number => operators.length,
};
