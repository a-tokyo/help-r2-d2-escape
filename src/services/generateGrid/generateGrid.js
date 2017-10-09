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
const MAX_GRID_ROWS: number = 100;
const MAX_GRID_COLS: number = 100;

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
  const matrixRowsCount: number = _.random(MIN_GRID_ROWS, MAX_GRID_ROWS);
  const matrixColsCount: number = _.random(MIN_GRID_COLS, MAX_GRID_COLS);

  /** Basic null grid */
  const basicDefaultGrid: Array<Array<any>> = generateMatrix(
    matrixRowsCount,
    matrixColsCount
  );

  /** keep track of how many empty cells are left */
  let availableCellsCount = matrixRowsCount * matrixColsCount - 2;

  /** Initialize Game Elements */
  const player = new PlayerGameElement();
  const teleportal = new TeleportalGameElement();
  availableCellsCount -= 2;

  /** get random counts for other game elements */
  let rocksAndPressurePadsTogetherCount: number = 0;
  let rocksPressurePadsCount: number = 0;
  let obstaclesCount: number = 0;

  /** get the random count for the rocks and pressure pads */
  if (availableCellsCount >= 2) {
    rocksAndPressurePadsTogetherCount = _.random(0, availableCellsCount);
    availableCellsCount -= rocksAndPressurePadsTogetherCount;
    rocksPressurePadsCount = rocksAndPressurePadsTogetherCount / 2;
  }

  /** get the random count for the obstacles */
  if (availableCellsCount > 0) {
    obstaclesCount = _.random(0, availableCellsCount);
    availableCellsCount -= obstaclesCount;
  }

  /** Initialize other game elements */
  let pressurePads = [];
  let rocks = [];
  let obstacles = [];

  for (let i = 0; i < rocksPressurePadsCount; i += 1) {
    pressurePads = pressurePads.concat(
      new PressurePadGameElement(`pressurepad_${i}`)
    );
    rocks = rocks.concat(new RockGameElement(`rock_${i}`));
  }

  for (let i = 0; i < obstaclesCount; i += 1) {
    obstacles = obstacles.concat(new ObstacleGameElement(`obstacle_${i}`));
  }

  /** Inject All the Game Elements into the grid */
  const gridWithElms = addElementsToGridRandomPosition(basicDefaultGrid, [
    player,
    teleportal,
    ...obstacles,
    ...pressurePads,
    ...rocks,
  ]);

  return gridWithElms;
};

export default genGrid;
