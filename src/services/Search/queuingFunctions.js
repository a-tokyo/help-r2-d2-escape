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

/**
 * Greedy search Queuing function enques according to the heuristicCost ascendingly
 *
 * concat the nodes and sort by heuristicCostA ascendingly
 *
 * Author: Basel
 */
export const greedyQueuingFuncA: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> =>
  nodes
    .concat(newNodes)
    .sort(
      (
        { heuristicCostA: heuristicCostAa },
        { heuristicCostA: heuristicCostAb }
      ) => heuristicCostAa - heuristicCostAb
    );
/**
 * Greedy search Queuing function enques according to the heuristicCost ascendingly
 *
 * concat the nodes and sort by heuristicCostB ascendingly
 *
 * Author: Basel
 */
export const greedyQueuingFuncB: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> =>
  nodes
    .concat(newNodes)
    .sort(
      (
        { heuristicCostB: heuristicCostAa },
        { heuristicCostB: heuristicCostAb }
      ) => heuristicCostAa - heuristicCostAb
    );

/**
 * A* search Queuing function enques according to the pathCost+heuristicCostA ascendingly
 *
 * concat the nodes and sort by pathCost+heuristicCostA ascendingly
 *
 * Author: Basel
 */
export const aStarQueuingFuncA: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> =>
  nodes
    .concat(newNodes)
    .sort(
      (
        { pathCost: pathCostA, heuristicCostA: heuristicCostAa },
        { pathCost: pathCostB, heuristicCostA: heuristicCostAb }
      ) => pathCostA + heuristicCostAa - (pathCostB + heuristicCostAb)
    );
/**
 * A* search Queuing function enques according to the pathCost+heuristicCostB ascendingly
 *
 * concat the nodes and sort by pathCost+heuristicCostA ascendingly
 *
 * Author: Basel
 */
export const aStarQueuingFuncB: QueuingFunction = (
  nodes: Array<Node>,
  newNodes: Array<Node>
): Array<Node> =>
  nodes
    .concat(newNodes)
    .sort(
      (
        { pathCost: pathCostA, heuristicCostB: heuristicCostAa },
        { pathCost: pathCostB, heuristicCostB: heuristicCostAb }
      ) => pathCostA + heuristicCostAa - (pathCostB + heuristicCostAb)
    );
