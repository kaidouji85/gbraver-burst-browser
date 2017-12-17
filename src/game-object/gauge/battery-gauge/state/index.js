// @flow

import {BattleState} from "./battle";

/** 状態オブジェクトをまとめたもの */
export class BatteryGaugeStateContainer {
  /** 戦闘状態 */
  battle: BattleState;

  constructor() {
    this.battle = new BattleState();
  }
}