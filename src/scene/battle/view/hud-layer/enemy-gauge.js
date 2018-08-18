// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {EnemyGauge} from "../../../../game-object/gauge";

/** 敵ゲージを生成する */
export function createEnemyGauge(resources: Resources): Gauge {
  return EnemyGauge(resources);
}