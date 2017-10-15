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
        newGrid[randomRowIndex][randomColIndex] = element;
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
        switch (element.type) {
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
