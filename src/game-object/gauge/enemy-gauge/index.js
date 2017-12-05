// @flow

import {EnemyGauge} from "./target";
import type {Resources} from "../../../resource/resource-manager";
import {Battle} from "../enemy-gauge/state/battle";

/** 敵ゲージ */
export class EnemyGaugeContext {
  /** 敵ゲージ */
  target: EnemyGauge;
  /** 状態 */
  state: EnemyGaugeState;
  /** 状態オブジェクトキャッシュ */
  stateList: {
    battle: Battle,
  };

  constructor(resources: Resources) {
    this.target = new EnemyGauge(resources);
    this.stateList = {
      battle: new Battle()
    };
    this.state = this.stateList.battle;
  }
}

/** 状態オブジェクト */
export interface EnemyGaugeState {
  gameLoop(target: EnemyGauge): void;
}
