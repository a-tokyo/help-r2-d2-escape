/* @flow */
import _ from 'lodash';

import {
  PlayerGameElement,
  TeleportalGameElement,
  ObstacleGameElement,
  RockGameElement,
  PressurePadGameElement,
} from '../';

import {
  addElementsToGridRandomPosition,
  generateMatrix,
  getGridConfig,
} from './generateGridHelpers';

const MIN_GRID_ROWS: number = 1;
const MIN_GRID_COLS: number = 2;
const MAX_GRID_ROWS: number = 100;
const MAX_GRID_COLS: number = 100;

const genGrid = (): { grid: Array<Array<any>>, config: Object } => {
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

  /** concat a new rock, pressurepad instance to the rocks, pressurePads arrays */
  for (let i = 0; i < rocksPressurePadsCount; i += 1) {
    pressurePads = pressurePads.concat(
      new PressurePadGameElement(`pressurepad_${i}`)
    );
    rocks = rocks.concat(new RockGameElement(`rock_${i}`));
  }

  /** concat a new obstacle instance to the obstacles array */
  for (let i = 0; i < obstaclesCount; i += 1) {
    obstacles = obstacles.concat(new ObstacleGameElement(`obstacle_${i}`));
  }

  /** Inject All the Game Elements into the grid */
  const grid = addElementsToGridRandomPosition(basicDefaultGrid, [
    player,
    teleportal,
    ...obstacles,
    ...pressurePads,
    ...rocks,
  ]);

  /** get the config information of the grid */
  const config = getGridConfig(grid);

  return {
    grid,
    config,
  };
};

export default genGrid;
