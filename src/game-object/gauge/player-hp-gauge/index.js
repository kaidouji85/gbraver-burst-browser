// @flow

import {PlayerHpGauge} from "./target";
import {Battle} from "./state/battle";
import type {Resources} from "../../../resource/resource-manager";

type Props = {
  resources: Resources,
  hp: number,
  maxHp: number,
}

/** プレイヤーHPゲージのゲームオブジェクト */
export class PlayerHpGaugeContext {
  /** 捜査対象オブジェクト */
  _target: PlayerHpGauge;
  /** 状態オブジェクト */
  _state: PlayerHpGaugeState;
  /**  状態リスト */
  _stateList: {
    battle: Battle;
  };

  constructor(props: Props) {
    this._target = new PlayerHpGauge(props.resources);
    this._stateList = {
      battle: new Battle()
    };

    this._stateList.battle.start(0, props.hp, props.maxHp);
    this._state = this._stateList.battle;
  }

  /** ゲームループ */
  gameLoop() {
    this._state.gameLoop(this._target);
  }
}

export interface PlayerHpGaugeState {
  gameLoop(target: PlayerHpGauge): void;
}