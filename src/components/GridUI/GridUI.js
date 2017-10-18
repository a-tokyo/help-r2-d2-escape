/* @flow */
import React from 'react';

import { R2D2Player, StormtrooperObstacle, Teleporter, Rock } from '../';

import './GridUI.css';

const GridUI = ({
  gridInfo,
  state,
}: {
  gridInfo: { grid: Array<Array<any>>, config: GridConfigObject },
  state?: State,
}) => (
  <section className="grid-wrapper">
    <div className="grid">
      {gridInfo.grid.map((row, rowIndex) => (
        <div className="grid-row" key={`row_${rowIndex}`}>
          {gridInfo.grid[rowIndex].map((col, colIndex) => {
            if (gridInfo.grid[rowIndex][colIndex]) {
              switch (gridInfo.grid[rowIndex][colIndex].items[0].type) {
                case 'player':
                  return (
                    <div
                      className="grid-cell"
                      key={`cell_${rowIndex}-${colIndex}`}
                    >
                      <R2D2Player />
                    </div>
                  );
                case 'teleportal':
                  if (
                    gridInfo.grid[rowIndex][colIndex].items[1] &&
                    gridInfo.grid[rowIndex][colIndex].items[1].type === 'player'
                  ) {
                    return (
                      <div
                        className={`grid-cell opacity-05 ${state &&
                        state.unPushedPads === 0
                          ? 'opacity-1'
                          : ''}`}
                        key={`cell_${rowIndex}-${colIndex}`}
                      >
                        <Teleporter />
                        <R2D2Player />
                      </div>
                    );
                  }
                  return (
                    <div
                      className={`grid-cell opacity-05 ${state &&
                      state.unPushedPads === 0
                        ? 'opacity-1'
                        : ''}`}
                      key={`cell_${rowIndex}-${colIndex}`}
                    >
                      <Teleporter />
                    </div>
                  );
                case 'obstacle':
                  return (
                    <div
                      className="grid-cell"
                      key={`cell_${rowIndex}-${colIndex}`}
                    >
                      <StormtrooperObstacle />
                    </div>
                  );
                case 'pressurepad':
                  if (
                    gridInfo.grid[rowIndex][colIndex].items[1] &&
                    gridInfo.grid[rowIndex][colIndex].items[1].type === 'rock'
                  ) {
                    return (
                      <div
                        className="grid-cell grid-cell--pressure-pad--active"
                        key={`cell_${rowIndex}-${colIndex}`}
                      >
                        <Rock />
                      </div>
                    );
                  }
                  if (
                    gridInfo.grid[rowIndex][colIndex].items[1] &&
                    gridInfo.grid[rowIndex][colIndex].items[1].type === 'player'
                  ) {
                    return (
                      <div
                        className="grid-cell grid-cell--pressure-pad"
                        key={`cell_${rowIndex}-${colIndex}`}
                      >
                        <R2D2Player />
                      </div>
                    );
                  }
                  return (
                    <div
                      className="grid-cell grid-cell--pressure-pad"
                      key={`cell_${rowIndex}-${colIndex}`}
                    />
                  );
                case 'rock':
                  return (
                    <div
                      className="grid-cell"
                      key={`cell_${rowIndex}-${colIndex}`}
                    >
                      <Rock />
                    </div>
                  );
                default:
                  return (
                    <div
                      className="grid-cell"
                      key={`cell_${rowIndex}-${colIndex}`}
                    />
                  );
              }
            } else {
              return (
                <div
                  className="grid-cell"
                  key={`cell_${rowIndex}-${colIndex}`}
                />
              );
            }
          })}
        </div>
      ))}
    </div>
  </section>
);

export default GridUI;
