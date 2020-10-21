// @flow

export class Exclusive {
  _canExecute: boolean;

  constructor() {
    this._canExecute = true;
  }

  async execute(fn: () => Promise<void>): Promise<void> {
    if (!this._canExecute) {
      return;
    }

    this._canExecute = false;
    await fn();
    this._canExecute = true;
  }
}