// @flow

import {ChangeGradually} from "./change-gradually";

/** 状態オブジェクトをまとめたもの */
export class HpGaugeStateContainer {
  /** 戦闘状態 */
  changeGradually: ChangeGradually;

  constructor() {
    this.changeGradually = new ChangeGradually();
  }
}