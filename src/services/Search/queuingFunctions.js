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
