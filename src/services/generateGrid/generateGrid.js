/* @flow */
import _ from 'lodash';

import {
  PlayerGameElement,
  TeleportalGameElement,
  ObstacleGameElement,
  RockGameElement,
  PressurePadGameElement,
} from '../';

const MIN_GRID_ROWS: number = 1;
const MIN_GRID_COLS: number = 2;
const MAX_GRID_ROWS: number = 3;
const MAX_GRID_COLS: number = 3;

// const MIN_OBSTACLE_COUNT = 0;
// const MIN_ROCKS_PRESSURE_PADS_COUNT = 0;

/** generates a 2D Array with nulls as defaults */
const generateMatrix = (
  rows: number = MIN_GRID_ROWS,
  columns: number = MIN_GRID_COLS,
  defaultValue: any = null
): Array<Array<any>> =>
  new Array(rows).fill().map(() => new Array(columns).fill(defaultValue));

const addElementsToGridRandomPosition = (
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

const genGrid = () => {
  /** Grid dimenstions */
  const matrixM: number = _.random(MIN_GRID_ROWS, MAX_GRID_ROWS);
  const matrixN: number = _.random(MIN_GRID_COLS, MAX_GRID_COLS);

  /** Basic null grid */
  const basicDefaultGrid: Array<Array<any>> = generateMatrix(matrixM, matrixN);

  /** Initialize Game Elements */
  const player = new PlayerGameElement();
  const teleportal = new TeleportalGameElement();

  // const obstaclesCount = 0;
  const obstacles = ['obs1'];

  // const rocksAndPressurePadsCount = 0;
  const pressurePads = [];
  const rocks = [];

  /** Inject Game Elements into the grid */
  const gridWithElms = addElementsToGridRandomPosition(basicDefaultGrid, [
    player,
    teleportal,
    ...obstacles,
    ...pressurePads,
    ...rocks,
  ]);

  console.log('gridWithElms =>', gridWithElms);
  return gridWithElms;
};

export default genGrid;
