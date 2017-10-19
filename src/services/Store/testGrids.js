/* @flow */
export const solvableLongGrid = {
  grid: [
    [
      null,
      null,
      null,
      null,
      {
        items: [
          {
            type: 'teleportal',
            name: 'teleportal',
          },
        ],
        position: {
          row: 0,
          col: 4,
        },
      },
    ],
    [
      {
        items: [
          {
            type: 'pressurepad',
            name: 'pressurepad_0',
          },
        ],
        position: {
          row: 1,
          col: 0,
        },
      },
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null],
    [
      null,
      {
        items: [
          {
            type: 'rock',
            name: 'rock_0',
          },
        ],
        position: {
          row: 3,
          col: 1,
        },
      },
      null,
      null,
      {
        items: [
          {
            type: 'player',
            name: 'player',
          },
        ],
        position: {
          row: 3,
          col: 4,
        },
      },
    ],
    [
      null,
      null,
      null,
      null,
      {
        items: [
          {
            type: 'obstacle',
            name: 'obstacle_0',
          },
        ],
        position: {
          row: 4,
          col: 4,
        },
      },
    ],
  ],
  config: {
    rows: 5,
    cols: 5,
    availableCellsCount: 20,
    playerPosition: {
      row: 3,
      col: 4,
    },
    teleportalPosition: {
      row: 0,
      col: 4,
    },
    obstaclesPositions: [
      {
        row: 4,
        col: 4,
      },
    ],
    rocksPositions: [
      {
        row: 3,
        col: 1,
      },
    ],
    pressurePadsPositions: [
      {
        row: 1,
        col: 0,
      },
    ],
    rocksCount: 1,
    pressurePadsCount: 1,
    obstaclesCount: 1,
  },
};
