/* @flow */
/**
 * Queuing Functions
 */
/**
 * Breadth First search Queuing function enques at the end.
 *
 * Author: Tokyo
 */
export const breadthFirstQueuingFunc: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> => nodes.concat(newNodes);

/**
 * Depth First search Queuing function enques at the front.
 *
 * Author: Tokyo
 */
export const depthFirstQueuingFunc: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> => newNodes.concat(nodes);

/**
 * Uniform Cost search Queuing function enques according to the pathCost ascendingly
 *
 * concat the nodes and sort by pathCost ascendingly
 *
 * Author: Tokyo
 */
export const uniformCostQueuingFunc: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> =>
  nodes
    .concat(newNodes)
    .sort(
      ({ pathCost: pathCostA }, { pathCost: pathCostB }) =>
        pathCostA - pathCostB
    );

/**
 * Iterative deepening search Queuing function enques at front if the new node's depth smaller than or equal to the maxDepth
 *
 * filter the new nodes by depth and pass the params through the depthFirstQueuingFunc
 *
 * Author: Tokyo
 */
export const iterativeDeepeningQueuingFunc: Function = (
  maxDepth: number
): QueuingFunction => (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> =>
  depthFirstQueuingFunc(
    nodes,
    newNodes.filter(newNode => newNode.depth <= maxDepth)
  );

/** @TODO Greedy, 2 heuristics */
/** @TODO A*, 2 heuristics */
