/* @flow */
import _ from 'lodash';

import { generalSearch, backTrackOperators } from '../Search/Search';
import {
  breadthFirstQueuingFunc,
  depthFirstQueuingFunc,
  uniformCostQueuingFunc,
  iterativeDeepeningQueuingFunc,
} from '../Search/queuingFunctions';

import { applyOperator } from './HelpR2D2SearchHelpers';

/**
 * Creates an R2D2 search problem according to a grid
 * then runs the general search algorithm according to the strategy and returns the result.
 */
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
      let newStateConfigs: Array<StateConfg> = [];
      operators.forEach(operator => {
        const newState: State | null = applyOperator(
          operator,
          state,
          grid,
          previousStates
        );
        if (newState) {
          newStateConfigs = newStateConfigs.concat({
            operator,
            state: newState,
          });
        }
      });
      return newStateConfigs;
    },
    goalTest: (state: State) =>
      state.unPushedPads === 0 &&
      _.isEqual(state.cell, grid.config.playerPosition),
    pathCost: (currState: State, operators: Array<Operator>): number =>
      operators.length,
  };

  /** set the propper queuing function */
  let qingFunc: QueuingFunction = breadthFirstQueuingFunc;

  switch (strategy) {
    case 'BF':
      qingFunc = breadthFirstQueuingFunc;
      break;
    case 'DF':
      qingFunc = depthFirstQueuingFunc;
      break;
    case 'ID':
      qingFunc = iterativeDeepeningQueuingFunc;
      break;
    case 'UC':
      qingFunc = uniformCostQueuingFunc;
      break;
    // case 'GR1':
    //   qingFunc = ...;
    //   break;
    // case 'GR2':
    //   qingFunc = ...;
    //   break;
    // case 'AS1':
    //   qingFunc = ...;
    //   break;
    // case 'AS2':
    //   qingFunc = ...;
    //   break;
    default:
      console.error('unknown search strategy: ', strategy);
  }

  const { node: searchResNode, expandedNodesCount } = generalSearch(
    problem,
    qingFunc
  );
  const cost: number | null = searchResNode ? searchResNode.pathCost : null;
  const sequence: Array<Operator> = searchResNode
    ? backTrackOperators(searchResNode)
    : [];

  return {
    sequence,
    cost,
    expandedNodesCount,
  };
};

export default Search;
