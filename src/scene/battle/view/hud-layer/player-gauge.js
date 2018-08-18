// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {PlayerGauge} from "../../../../game-object/gauge";

/** プレイヤーゲージを生成する */
export function createPlayerGauge(resources: Resources): Gauge {
  return PlayerGauge(resources);
}