/* @flow */
import _ from 'lodash';

import { generalSearch } from '../Search/Search';
import {
  breadthFirstQueuingFunc,
  depthFirstQueuingFunc,
  uniformCostQueuingFunc,
  iterativeDeepeningQueuingFunc,
} from '../Search/queuingFunctions';

import { applyOperator } from './HelpR2D2SearchHelpers';

const Search = (
  grid: { grid: Array<Array<any>>, config: Object },
  strategy: string,
  visualize: boolean
) => {
  /** keep track of the previous state */
  let previousStates: Array<State> = [];
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
    ): Array<StateConfg> => {
      const newState: State | null = applyOperator(
        operators[0],
        state,
        grid,
        previousStates
      );
      return {
        state: newState,
        // operator,
      };
    },
    goalTest: (state: State) =>
      state.unPushedPads === 0 &&
      _.isEqual(state.cell, grid.config.playerPosition),
    pathCost: (operators: Array<Operator>): number => operators.length,
  };

  /** set the propper queuing function */
  let qingFunc: QueuingFunction = breadthFirstQueuingFunc;

  switch (strategy) {
    case 'bfs':
      qingFunc = breadthFirstQueuingFunc;
      break;
    case 'dfs':
      qingFunc = depthFirstQueuingFunc;
      break;
    case 'uniform_cost':
      qingFunc = uniformCostQueuingFunc;
      break;
    case 'iterative_deepening':
      qingFunc = iterativeDeepeningQueuingFunc;
      break;
    default:
      console.error('unknown search strategy: ', strategy);
  }

  return generalSearch(problem, qingFunc);
};

export default Search;
