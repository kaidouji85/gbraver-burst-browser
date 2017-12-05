// @flow
import {PlayerGauge} from "./target";
import type {Resources} from "../../../resource/resource-manager";
import {Battle} from "./state/battle";

/** プレイヤーゲージのゲームオブジェクト */
export class PlayerGaugeContext {
  /** 操作対象 */
  target: PlayerGauge;
  /** 状態オブジェクト */
  state: PlayerGaugeState;
  /** 状態オブジェクトリスト */
  stateList: {
    battle: Battle,
  };

  constructor(resources: Resources) {
    this.target = new PlayerGauge(resources);
    this.stateList = {
      battle: new Battle()
    };
    this.state = this.stateList.battle;
  }

  gameLoop() {
    this.state.gameLoop(this.target);
  }
}

/** 状態オブジェクト */
export interface PlayerGaugeState {
  gameLoop(target: PlayerGauge): void;
}