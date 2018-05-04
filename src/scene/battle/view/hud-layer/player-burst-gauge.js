// @flow

import {BurstGauge} from "../../../../game-object/gauge/burst-gauge/burst-gauge";
import type {Resources} from "../../../../resource";
import {PlayerBurstGauge} from "../../../../game-object/gauge/burst-gauge";

export function createPlayerBurstGauge(resources: Resources): BurstGauge {
  return PlayerBurstGauge(resources, true);
}