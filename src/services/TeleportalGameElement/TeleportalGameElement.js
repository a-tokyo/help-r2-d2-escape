/* @flow */

import { GameElement } from '../';

// TeleportalGameElement

export default class TeleportalGameElement extends GameElement {
  isActive: boolean = false;
  constructor(name: string = 'teleportal0', isActive: boolean = false) {
    super('teleportal', name, false);
    this.isActive = isActive;
  }

  getIsActive = (): boolean => this.isActive;
  setIsActive = (isActive: boolean): void => {
    this.isActive = isActive;
  };
}
