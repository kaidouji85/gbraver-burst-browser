// @flow

import {BattleState} from "./battle";

/** 状態オブジェクトをまとめたもの */
export class HpGaugeStateContainer {
  /** 戦闘状態 */
  battle: BattleState;

  constructor() {
    this.battle = new BattleState();
  }
}