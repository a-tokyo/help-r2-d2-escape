import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { R2D2Player, StormtrooperObstacle, Teleporter, Rock } from '../';

import './GridUI.css';

export default class componentName extends Component {
  static propTypes = {
    grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  };
  static defaultProps = {
    grid: [[]],
  };

  render() {
    const { grid } = this.props;
    return (
      <section className="grid-wrapper">
        <div className="grid">
          <div className="grid-row">
            <div className="grid-cell">
              <R2D2Player />
            </div>
            <div className="grid-cell">b</div>
            <div className="grid-cell">c</div>
            <div className="grid-cell">d</div>
          </div>
          <div className="grid-row">
            <div className="grid-cell grid-cell--pressure-pad">a</div>
            <div className="grid-cell grid-cell--pressure-pad--active">
              <Rock />
            </div>
            <div className="grid-cell">
              <Teleporter />
            </div>
            <div className="grid-cell">
              <StormtrooperObstacle />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
