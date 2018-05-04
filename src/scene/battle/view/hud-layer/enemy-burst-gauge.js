// @flow

import {BurstGauge} from "../../../../game-object/gauge/burst-gauge/burst-gauge";
import type {Resources} from "../../../../resource";
import {EnemyBurstGauge} from "../../../../game-object/gauge/burst-gauge";

export function createEnemyBurstGauge(resources: Resources): BurstGauge {
  return EnemyBurstGauge(resources, true);
}