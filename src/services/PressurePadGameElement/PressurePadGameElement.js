/* @flow */

import { GameElement } from '../';

// PressurePadGameElement

export default class PressurePadGameElement extends GameElement {
  isPressured: boolean = false;
  constructor(name: string = 'pressurepad0', isPressured: boolean = false) {
    super('pressurepad', name, false);
    this.isPressured = isPressured;
  }

  getIsPressured = (): boolean => this.isPressured;
  setIsPressured = (isPressured: boolean): void => {
    this.isPressured = isPressured;
  };
}
