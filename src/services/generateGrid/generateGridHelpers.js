/* @flow */
import _ from 'lodash';

/** generates a 2D Array with nulls as defaults */
export const generateMatrix = (
  rows: number,
  columns: number,
  defaultValue: any = null
): Array<Array<any>> =>
  new Array(rows).fill().map(() => new Array(columns).fill(defaultValue));

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
 * gets the config information of a grid
 */
export const getGridConfig = (
  grid: Array<Array<any>>
): {
  playerPosition: GridItemPosition | null,
  teleportalPosition: GridItemPosition | null,
  rocksPositions: Array<GridItemPosition>,
  pressurePadsPositions: Array<GridItemPosition>,
  rocksCount: number,
  pressurePadsCount: number,
  obstaclesCount: number,
  availableCellsCount: number,
} => {
  const config = {
    playerPosition: null,
    teleportalPosition: null,
    rocksPositions: [],
    pressurePadsPositions: [],
    rocksCount: 0,
    pressurePadsCount: 0,
    obstaclesCount: 0,
    availableCellsCount: grid.length * grid.length,
  };

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      const element = grid[i][j];
      if (element) {
        config.availableCellsCount -= 1;
      } else {
        /** @TODO Switch over the type of the element and mutate config*/
      }
    }
  }
  return config;
};
