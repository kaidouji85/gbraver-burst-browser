// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {PlayerGauge} from "../../../../game-object/gauge";
import type {Player} from "gbraver-burst-core/lib/player/player";

/** プレイヤーゲージを生成する */
export function createPlayerGauge(resources: Resources, player: Player): Gauge {
  return PlayerGauge({
    resources: resources,
    hp: player.armdozer.maxHp,
    battery: player.armdozer.maxBattery
  });
}