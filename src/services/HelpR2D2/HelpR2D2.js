/* @flow */

const propblem: Problem = {
  operators: ['move_north', 'move_south', 'move_east', 'move_west'],
  initialState: {
    cell: { row: 0, col: 0 },
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
