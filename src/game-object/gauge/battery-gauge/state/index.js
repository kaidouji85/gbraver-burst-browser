// @flow

import {ChangeImmediately} from "./change-immediately";

/** 状態オブジェクトをまとめたもの */
export class BatteryGaugeStateContainer {
  _changeImmediately: ChangeImmediately;

  constructor() {
    this._changeImmediately = new ChangeImmediately();
  }

  /** 即座にバッテリー値を変更する状態 */
  changeImmediately(boBattery: number): ChangeImmediately {
    this._changeImmediately.start(boBattery);
    return this._changeImmediately;
  }
}