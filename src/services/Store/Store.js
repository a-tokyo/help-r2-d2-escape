/* @flow */

/**
 * A simple mutatable store used accross the app.
 */
class Store {
  previousStates: StatesHistoryHashMap = {};
  visualizationStatesInOrder: Array<State> = [];
  visualize: boolean = true;

  gridBasicEnv: { [string]: number } = {
    MIN_GRID_ROWS: 5,
    MIN_GRID_COLS: 5,
    MAX_GRID_ROWS: 5,
    MAX_GRID_COLS: 5,
    MAX_ROCKS_PADS_TOGETHER: 2,
    MAX_OBSTACLES: 1,
  };

  searchTypes: Array<string> = [
    'BF',
    'DF',
    'UC',
    'ID',
    'GR1',
    'GR2',
    'AS1',
    'AS2',
  ];

  problemTypes: Array<string> = ['Solvable Long Grid', 'Random Grid'];

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
