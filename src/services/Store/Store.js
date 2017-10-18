/* @flow */

/**
 * A simple mutatable store used accross the app.
 */
class Store {
  previousStates: StatesHistoryHashMap = {};
  visualizationStatesInOrder: Array<State> = [];

  reset(key: string) {
    switch (key) {
      case 'previousStates':
        this.previousStates = {};
        break;
      case 'visualizationStatesInOrder':
        this.visualizationStatesInOrder = [];
        break;
      default:
    }
  }
}

export default new Store();
