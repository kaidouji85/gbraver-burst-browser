// @flow

import type {Resources} from "../../../resource/resource-manager";
import {HpGauge} from "./hp-gauge";
import {PlayerHpGaugeView} from "./view/player-hp-gauge";
import {EnemyHpGaugeView} from "./view/enemy-hp-gauge";

/** プレイヤーHPゲージを生成する */
export function PlayerHpGauge(resources: Resources, hp: number, maxHp: number): HpGauge {
  const view = new PlayerHpGaugeView(resources);
  const hpGauge = new HpGauge({view, hp, maxHp});
  return hpGauge;
}

/** 敵HPゲージを生成する */
export function EnemyHpGauge(resources: Resources, hp: number, maxHp: number): HpGauge {
  const view = new EnemyHpGaugeView(resources);
  const hpGauge = new HpGauge({view, hp, maxHp});
  return hpGauge;
}