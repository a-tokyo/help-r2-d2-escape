/* @flow */
import _ from 'lodash';

import { Store } from '../';

import {
  /** generalSearch helpers */
  makeQueue,
  makeNode,
  /** Problem helpers */
  getInitialState,
  getGoalTest,
  /** Node helpers */
  getState,
  expand,
} from './helpers';

/**
 * General search algorithm
 *
 * Runs the general search algroithm on a given problem using a given queuing function.
 *
 * Author: Tokyo
 */
export const generalSearch = (
  problem: Problem,
  qingFunc: QueuingFunction
): { node: Node | null, expandedNodesCount: number } => {
  let expandedNodesCount: number = 0;
  let nodes = makeQueue(makeNode(getInitialState(problem)));
  while (!_.isEmpty(nodes)) {
    const [node] = _.pullAt(nodes, [0]);
    /** ASIDE: if visualization is turned on -> store all the states in order in the store */
    if (Store.visualize) {
      Store.visualizationStatesInOrder.push(node.state);
    }
    /** Test for the goal */
    if (getGoalTest(problem)(getState(node))) {
      return { node, expandedNodesCount };
    }
    nodes = qingFunc(nodes, expand(node, problem));
    expandedNodesCount += 1;
  }
  return { node: null, expandedNodesCount };
};

/** BacktrackOperators from a node and get a list of operators from the root to reach that node.
 *
 * if the node has no parent -> it is the root => return a [];
 * if the node has a parent -> backtrackOperators and and get the list of operators to the previous node
 * => return the list of operators to the prev node concatinated with the current node's operator
 * $FlowFixMe
 *
 * Author: Tokyo
 */
export const backTrackOperators = (node: Node): Array<Operator> =>
  node.parent ? backTrackOperators(node.parent).concat(node.operator) : [];
