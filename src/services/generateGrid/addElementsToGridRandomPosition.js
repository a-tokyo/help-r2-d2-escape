/* @flow */
import _ from 'lodash';

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

export default addElementsToGridRandomPosition;
