/* @flow */
import _ from 'lodash';

import {
  addElementsToGridRandomPosition,
  generateMatrix,
  getGridConfig,
  createGameElement,
} from './generateGridHelpers';

import { Store } from '../';

/**
 * Generates a a 2D grid of a random game scenario and scans it for the configurations.
 */
const genGrid = (): { grid: Array<Array<any>>, config: Object } => {
  /** Get the env variables */
  const {
    MIN_GRID_ROWS,
    MIN_GRID_COLS,
    MAX_GRID_ROWS,
    MAX_GRID_COLS,
    MAX_ROCKS_PADS_TOGETHER,
    MAX_OBSTACLES,
  } = Store.gridBasicEnv;

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
  const player = createGameElement('player', 'player');
  const teleportal = createGameElement('teleportal', 'teleportal');
  availableCellsCount -= 2;

  /** get random counts for other game elements */
  let rocksPressurePadsCount: number = 0;
  let obstaclesCount: number = 0;

  /** get the random count for the rocks and pressure pads */
  if (availableCellsCount >= 2) {
    const rocksAndPressurePadsTogetherCount = Math.min(
      _.random(0, availableCellsCount),
      MAX_ROCKS_PADS_TOGETHER
    );
    rocksPressurePadsCount = rocksAndPressurePadsTogetherCount / 2;
    /** the multipliation here is not redundant, it is to defend against if an odd number was excluded */
    availableCellsCount -= rocksPressurePadsCount * 2;
  }

  /** add an /2 factor not to have lots of obstacles */
  /** get the random count for the obstacles */
  if (availableCellsCount > 0) {
    /** add an /2 factor not to have lots of obstacles */
    obstaclesCount = Math.min(
      _.random(0, availableCellsCount / 2),
      MAX_OBSTACLES
    );
    availableCellsCount -= obstaclesCount;
  }

  /** Initialize other game elements */
  let pressurePads = [];
  let rocks = [];
  let obstacles = [];

  /** concat a new rock, pressurepad object to the rocks, pressurePads arrays */
  for (let i = 0; i < rocksPressurePadsCount; i += 1) {
    pressurePads = pressurePads.concat(
      createGameElement('pressurepad', `pressurepad_${i}`)
    );
    rocks = rocks.concat(createGameElement('rock', `rock_${i}`));
  }

  /** concat a new obstacle object to the obstacles array */
  for (let i = 0; i < obstaclesCount; i += 1) {
    obstacles = obstacles.concat(
      createGameElement('obstacle', `obstacle_${i}`)
    );
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
