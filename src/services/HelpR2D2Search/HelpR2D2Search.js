/* @flow */
import _ from 'lodash';

import {
  generalSearch,
  backTrackOperators,
  backTrackCost,
} from '../Search/Search';
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
  strategy: SearchStrategy = 'BF',
  visualize: boolean = false
): {
  sequence: Array<Operator>,
  cost: number | null,
  expandedNodesCount: number,
} => {
  /** keep track of the previous state */
  /** The previousStates hashmap is mutated by applyOperator() */
  const previousStates: StatesHashMap = {};
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
    ): Array<StateConfig> => {
      let newStateConfigs: Array<StateConfig> = [];
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
      console.log('previousStates', previousStates);
      return newStateConfigs;
    },
    goalTest: (state: State) =>
      state.unPushedPads === 0 &&
      _.isEqual(state.cell, grid.config.teleportalPosition),
    pathCost: (state: State, operators: Array<Operator>): number => {
      /**
       * @TODO implement proper path cost for last 2 search algorithms
       *
      // switch (strategy) {
      //   case 'ID':
      //     return operators.length;
      //   case 'UC':
      //     return operators.length;
      //   case 'GR1':
      //     return operators.length;
      //   case 'GR2':
      //     return operators.length;
      //   case 'AS1':
      //     return operators.length;
      //   case 'AS2':
      //     return operators.length;
      //   default:
      //     console.error('unknown search strategy: ', strategy);
      // }
       *
       */
      return operators.length;
    },
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

  const cost: number | null = searchResNode
    ? backTrackCost(searchResNode)
    : null;
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
