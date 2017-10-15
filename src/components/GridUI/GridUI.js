import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { R2D2Player } from '../';

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
            <div className="grid-cell">a</div>
            <div className="grid-cell">b</div>
            <div className="grid-cell">c</div>
            <div className="grid-cell">d</div>
          </div>
          <div className="grid-row">
            <div className="grid-cell">a</div>
            <div className="grid-cell">b</div>
            <div className="grid-cell">c</div>
            <div className="grid-cell">d</div>
          </div>
        </div>
        <R2D2Player />
      </section>
    );
  }
}
