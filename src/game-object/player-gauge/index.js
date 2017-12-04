// @flow
import {PlayerGaugeTarget} from "./target";
import type {Resources} from "../../resource/resource-manager";
import {Battle} from "./state/battle";

/** プレイヤーゲージのゲームオブジェクト */
export class PlayerGauge {
  /** 操作対象 */
  _target: PlayerGaugeTarget;
  /** 状態オブジェクト */
  _state: PlayerGaugeState;
  /** 状態リスト */
  _stateList: {
    battle: Battle,
  };

  constructor(resources: Resources) {
    this._target = new PlayerGaugeTarget(resources);
    this._stateList = {
      battle: new Battle()
    };
    this._state = this._stateList.battle;
  }

  gameLoop() {
    this._state.gameLoop(this._target);
  }
}

/** 状態オブジェクト */
export interface PlayerGaugeState {
  gameLoop(target: PlayerGaugeTarget): void;
}