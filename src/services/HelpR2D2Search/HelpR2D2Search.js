/* @flow */
import _ from 'lodash';

import { generalSearch } from '../Search/Search';

const Search = (
  grid: { grid: Array<Array<any>>, config: Object },
  strategy: string,
  visualize: boolean
) => {
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
    ): Array<StateConfg> => {},
    goalTest: (state: State) =>
      state.unPushedPads === 0 &&
      _.isEqual(state.cell, grid.config.playerPosition),
    pathCost: (operators: Array<Operator>): number => operators.length,
  };

  /** set the propper queuing function */
  let qingFunc: QueuingFunction | null = null;

  switch (strategy) {
    case 'bfs':
      break;
    case 'dfs':
      break;
    case 'uniform_cost':
      break;
    default:
      console.error('unknown search strategy: ', strategy);
  }

  return generalSearch(problem, qingFunc);
};

export default Search;
