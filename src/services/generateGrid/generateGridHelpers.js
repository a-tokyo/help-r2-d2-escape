/* @flow */
import _ from 'lodash';

/**
 * generates a 2D Array with nulls as defaults
 */
export const generateMatrix = (
  rows: number,
  columns: number,
  defaultValue: any = null
): Array<Array<any>> =>
  new Array(rows).fill().map(() => new Array(columns).fill(defaultValue));

/**
 * adds elements to a grid in random positions
 */
export const addElementsToGridRandomPosition = (
  grid: Array<Array<any>>,
  elements: Array<any>
): Array<Array<any>> => {
  const newGrid = _.cloneDeep(grid);
  /** add elements */
  elements.forEach(element => {
    /** This for loop is to overcome the race condition where the elements exceed the array count */
    for (let i: number = 0; i < newGrid.length * newGrid[0].length; i += 1) {
      const randomRowIndex = _.random(0, newGrid.length - 1);
      const randomColIndex = _.random(0, newGrid[randomRowIndex].length - 1);

      /** check for coexisting elements */
      if (!newGrid[randomRowIndex][randomColIndex]) {
        newGrid[randomRowIndex][randomColIndex] = {
          items: [element],
          position: { row: randomRowIndex, col: randomColIndex },
        };
        break;
      }
    }
  });
  return newGrid;
};

/**
 * generates a grid item position object of i, j coords
 */
export const getGridItemPos = (i: number, j: number): GridItemPos => ({
  row: i,
  col: j,
});

/**
 * gets the config information of a grid
 */
export const getGridConfig = (grid: Array<Array<any>>): GridConfigObject => {
  // $FlowFixMe
  const config: GridConfigObject = {
    rows: grid.length,
    cols: grid.length ? grid[0].length : 0,
    availableCellsCount: grid.length ? grid.length * grid[0].length : 0,
    playerPosition: null,
    teleportalPosition: null,
    obstaclesPositions: [],
    rocksPositions: [],
    pressurePadsPositions: [],
    rocksCount: 0,
    pressurePadsCount: 0,
    obstaclesCount: 0,
  };

  /** Loop over the whole grid to get the config info */
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      const element = grid[i][j];
      /** If the element is not null, swith on its type */
      if (element) {
        config.availableCellsCount -= 1;
        switch (element.items[0].type) {
          case 'player':
            config.playerPosition = getGridItemPos(i, j);
            break;
          case 'teleportal':
            config.teleportalPosition = getGridItemPos(i, j);
            break;
          case 'obstacle':
            config.obstaclesPositions = config.obstaclesPositions.concat(
              getGridItemPos(i, j)
            );
            config.obstaclesCount += 1;
            break;
          case 'rock':
            config.rocksPositions = config.rocksPositions.concat(
              getGridItemPos(i, j)
            );
            config.rocksCount += 1;
            break;
          case 'pressurepad':
            config.pressurePadsPositions = config.pressurePadsPositions.concat(
              getGridItemPos(i, j)
            );
            config.pressurePadsCount += 1;
            break;
          default:
            console.error('Unknown game element type in element', element);
        }
      }
    }
  }
  return config;
};

/**
 * Converts a grid map to a user readable string.
 */
export const gridMapToString = (grid: Array<Array<any>>): string => {
  let stringToReturn = ``;
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      const element = grid[i][j];
      if (element) {
        const itemsString = `[${element.items
          .map(item => item.type)
          .toString()}]`;
        stringToReturn = `${stringToReturn}${j === 0
          ? ''
          : ', '}${itemsString}`;
      } else {
        stringToReturn = `${stringToReturn}${j === 0 ? '[ ]' : ', [ ]'}`;
      }
    }
    stringToReturn = `${stringToReturn}\n=========================================\n`;
  }
  return stringToReturn;
};

/**
 * Creates a game element.
 */
export const createGameElement = (
  type: GameElementType,
  name?: string = 'GameElement'
): GameElement => ({ type, name });

/**
 * Generates a 2D grid from the grid config object merged with the current state.
 */
export const generateGridFromConfigAndState = (
  config: GridConfigObject,
  state: State
): Array<Array<any>> => {
  const newGrid = generateMatrix(config.rows, config.cols);

  newGrid[config.teleportalPosition.row][config.teleportalPosition.col] = {
    items: [createGameElement('teleportal')],
  };
  config.obstaclesPositions.forEach(position => {
    newGrid[position.row][position.col] = {
      items: [createGameElement('obstacle')],
    };
  });
  config.pressurePadsPositions.forEach(position => {
    newGrid[position.row][position.col] = {
      items: [createGameElement('pressurepad')],
    };
  });

  if (newGrid[state.cell.row][state.cell.col]) {
    newGrid[state.cell.row][state.cell.col].items.push(
      createGameElement('player')
    );
  } else {
    newGrid[state.cell.row][state.cell.col] = {
      items: [createGameElement('player')],
    };
  }
  state.rocksPositions.forEach(position => {
    if (newGrid[position.row][position.col]) {
      newGrid[position.row][position.col].items.push(createGameElement('rock'));
    } else {
      newGrid[position.row][position.col] = {
        items: [createGameElement('rock')],
      };
    }
  });
  return newGrid;
};
