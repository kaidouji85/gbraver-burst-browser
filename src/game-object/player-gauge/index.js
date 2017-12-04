// @flow
import {PlayerGaugeTarget} from "./target";
import type {Resources} from "../../resource/resource-manager";
import {Battle} from "./state/battle";

/** プレイヤーゲージのゲームオブジェクト */
export class PlayerGauge {
  /** 操作対象 */
  target: PlayerGaugeTarget;
  /** 状態オブジェクト */
  state: PlayerGaugeState;
  /** 状態リスト */
  stateList: {
    battle: Battle,
  };

  constructor(resources: Resources) {
    this.target = new PlayerGaugeTarget(resources);
    this.stateList = {
      battle: new Battle()
    };
    this.state = this.stateList.battle;
  }
}

/** 状態オブジェクト */
export interface PlayerGaugeState {
  gameLoop(target: PlayerGaugeTarget): void;
}