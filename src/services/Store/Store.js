/* @flow */

/**
 * A simple mutatable store used accross the app.
 */
class Store {
  previousStates: StatesHistoryHashMap = {};
  visualizationStatesInOrder: Array<State> = [];
  visualize: boolean = true;

  reset(key?: string) {
    switch (key) {
      case 'previousStates':
        this.previousStates = {};
        break;
      case 'visualizationStatesInOrder':
        this.visualizationStatesInOrder = [];
        break;
      case 'visualize':
        this.visualize = true;
        break;
      default:
        this.previousStates = {};
        this.visualizationStatesInOrder = [];
        this.visualize = true;
    }
  }

  get(key: string): any {
    switch (key) {
      case 'previousStates':
        return this.previousStates;
      case 'visualizationStatesInOrder':
        return this.visualizationStatesInOrder;
      case 'visualize':
        return this.visualize;
      default:
        return undefined;
    }
  }
}

export default new Store();
