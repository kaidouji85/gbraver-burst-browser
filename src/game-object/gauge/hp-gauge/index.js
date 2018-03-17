// @flow

import type {Resources} from "../../../resource/index";
import {HpGauge} from "./hp-gauge";
import {PlayerHpGaugeView} from "./view/player-hp-gauge-view";
import {EnemyHpGaugeView} from "./view/enemy-hp-gauge-view";
import {getGaugeScale} from "../scale";

/** プレイヤーHPゲージを生成する */
export function PlayerHpGauge(resources: Resources, hp: number, maxHp: number): HpGauge {
  const view = new PlayerHpGaugeView(resources, getGaugeScale());
  const hpGauge = new HpGauge({view, hp, maxHp});
  return hpGauge;
}

/** 敵HPゲージを生成する */
export function EnemyHpGauge(resources: Resources, hp: number, maxHp: number): HpGauge {
  const view = new EnemyHpGaugeView(resources, getGaugeScale());
  const hpGauge = new HpGauge({view, hp, maxHp});
  return hpGauge;
}