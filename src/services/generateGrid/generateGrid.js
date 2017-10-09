/* @flow */
import _ from 'lodash';

const MIN_GRID_ROWS: number = 1;
const MIN_GRID_COLS: number = 2;
const MAX_GRID_ROWS: number = 1000;
const MAX_GRID_COLS: number = 1000;

/** generates a 2D Array with nulls as defaults */
const generateMatrix = (
  rows: number = MIN_GRID_ROWS,
  columns: number = MIN_GRID_COLS,
  defaultValue: any = null
): Array<Array<any>> => Array(rows).fill(Array(columns).fill(defaultValue));

const addElementsToGridRandomPosition = (
  grid: Array<Array<any>>,
  elements: Array<any>
): Array<Array<any>> => {
  const newGrid = _.cloneDeep(grid);
  /** TODO add element */
  elements.forEach(element => {
    /** TODO add element to newGrid*/
    /** TODO check for coexisting elements*/
  });
};

const genGrid = () => {
  const matrixM: number = _.random(MIN_GRID_ROWS, MAX_GRID_ROWS);
  const matrixN: number = _.random(MIN_GRID_COLS, MAX_GRID_COLS);

  /** Basic null grid */
  const basicDefaultGrid: Array<Array<any>> = generateMatrix(matrixM, matrixN);

  console.log('basicDefaultGrid =>', basicDefaultGrid);
};

export default genGrid;
