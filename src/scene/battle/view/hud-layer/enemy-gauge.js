// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {EnemyGauge} from "../../../../game-object/gauge";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/** 敵ゲージを生成する */
export function createEnemyGauge(resources: Resources, enemy: Player): Gauge {
  return EnemyGauge({
    resources: resources,
    hp: enemy.armdozer.maxHp,
    battery: enemy.armdozer.maxBattery
  });
}