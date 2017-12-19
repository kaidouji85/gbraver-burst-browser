// @flow

import {StandState} from "./stand";

/** 状態を集めたもの */
export class ShinBraverStateContainer {
  stand: StandState;

  constructor() {
    this.stand = new StandState();
  }
}