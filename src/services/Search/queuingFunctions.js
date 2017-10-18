/* @flow */
/**
 * Queuing Functions
 */
/**
 * Breadth First search Queuing function enques at the end.
 */
export const breadthFirstQueuingFunc: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> => nodes.concat(newNodes);

/**
 * Depth First search Queuing function enques at the front.
 */
export const depthFirstQueuingFunc: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> => newNodes.concat(nodes);

/**
 * Uniform Cost search Queuing function enques according to the pathCost ascendingly
 *
 * concat the nodes and sort by pathCost ascendingly
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
 * @TODO Iterative deepening search Queuing function enques ...
 */
export const iterativeDeepeningQueuingFunc: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> => [];

/** @TODO Greedy, 2 heuristics */
/** @TODO A*, 2 heuristics */
