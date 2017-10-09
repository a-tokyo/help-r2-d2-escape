/* @flow */
/* eslint no-undef: 0 */
export default class GameElement {
  type: string = '';
  name: string = '';
  isMovable: boolean = false;

  constructor(
    type: string = 'obstacle',
    name: string = 'NoName',
    isMovable: boolean = false
  ) {
    this.type = type;
    this.name = name;
    this.isMovable = isMovable;
  }

  getType = (): string => this.type;
  setType = (type: string): void => {
    this.type = type;
  };

  getName = (): string => this.name;
  setName = (name: string): void => {
    this.name = name;
  };

  getIsMovable = (): boolean => this.isMovable;
  setIsMovable = (isMovable: boolean): void => {
    this.isMovable = isMovable;
  };
}
