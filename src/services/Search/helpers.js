/* @flow */

/** generalSearch helpers */
/** creates a queue of nodes */
export const makeQueue = (nodes: Node | Array<Node>) =>
  Array.isArray(nodes) ? nodes : [nodes];
/** creates an initial node out of a state */
export const makeNode = (
  state: State,
  parent?: Node | null = null,
  operator?: Operator | null = null,
  depth?: number = 0,
  pathCost?: number = 0,
  heuristicCostA?: number = 0,
  heuristicCostB?: number = 0
): Node => ({
  state,
  parent,
  operator,
  depth,
  pathCost,
  heuristicCostA,
  heuristicCostB,
});

/** Problem helpers */
/** gets the initial state of a problem
 *
 * Author: Tokyo
 */
export const getInitialState = (problem: Problem): State =>
  problem.initialState;
/** gets the goalTest function of a problem */
export const getGoalTest = (problem: Problem): GoalTestFunc => problem.goalTest;

/** Node helpers */
/** gets the state of a node
 *
 * Author: Tokyo
*/
export const getState = (node: Node): State => node.state;

/**
 * expands a node according to a problem's state space into new nodes
 *
 * Author: Tokyo
 */
export const expand = (node: Node, problem: Problem): Array<Node> => {
  console.log('expanding', node);
  const newStateConfigs: Array<StateConfig> = problem.stateSpace(
    node.state,
    problem.operators
  );
  return newStateConfigs.map(stateConfig =>
    makeNode(
      stateConfig.state,
      node,
      stateConfig.operator,
      node.depth + 1,
      node.pathCost + problem.pathCost(node.state, [stateConfig.operator]),
      problem.heuristicCostA(
        node.state,
        [stateConfig.operator],
        stateConfig.state
      ),
      problem.heuristicCostB(
        node.state,
        [stateConfig.operator],
        stateConfig.state
      )
    )
  );
};
