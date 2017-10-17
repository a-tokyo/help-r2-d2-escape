/* @flow */
import _ from 'lodash';

import {
  /** generalSearch helpers */
  makeQueue,
  makeNode,
  /** Problem helpers */
  initialState,
  goalTest,
  /** Node helpers */
  state,
  expand,
} from './helpers';

/**
 * General search function
 */
export const generalSearch = (
  problem: Problem,
  qingFunc: QueuingFunction
): { node: Node | null, expandedNodesCount: number } => {
  let expandedNodesCount: number = 0;
  let nodes = makeQueue(makeNode(initialState(problem)));
  while (!_.isEmpty(nodes)) {
    const [node] = _.pullAt(nodes, [0]);
    if (goalTest(problem)(state(node))) {
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
 */
export const backTrackOperators = (node: Node): Array<Operator> =>
  node.parent ? backTrackOperators(node.parent).concat(node.operator) : [];
