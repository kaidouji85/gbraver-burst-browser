// @flow

import {StandState} from "./stand";

/** 状態を集めたもの */
export class ShinBraverStateContainer {
  _stand: StandState;

  constructor() {
    this._stand = new StandState();
  }

  /** 立ち状態 */
  stand(): StandState {
    return this._stand;
  }
}