// @flow
import {PlayerGaugeTarget} from "./target";
import type {Resources} from "../../resource/resource-manager";
import type {GameObject, GameObjectState} from "../game-object";
import {Battle} from "./state/battle";

/** プレイヤーゲージのゲームオブジェクト */
export class PlayerGauge implements GameObject<PlayerGaugeTarget> {
  /** 操作対象 */
  target: PlayerGaugeTarget;
  /** 状態オブジェクト */
  state: GameObjectState<PlayerGaugeTarget>;
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