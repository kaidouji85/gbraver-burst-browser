// @flow

import type {Resources} from "../../../resource/resource-manager";
import {HpGauge} from "./base";
import {PlayerHpGauge} from "./view/player-hp-gauge";

/** プレイヤーHPゲージを生成する */
export function createPlayerHpGauge(resources: Resources, hp: number, maxHp: number): HpGauge {
  const view = new PlayerHpGauge(resources);
  const hpGauge = new HpGauge({view, hp, maxHp});
  return hpGauge;
}