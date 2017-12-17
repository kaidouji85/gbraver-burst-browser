// @flow

import {ChangeImmediately} from "./change-immediately";

/** 状態オブジェクトをまとめたもの */
export class BatteryGaugeStateContainer {
  /** 戦闘状態 */
  changeImmediately: ChangeImmediately;

  constructor() {
    this.changeImmediately = new ChangeImmediately();
  }
}