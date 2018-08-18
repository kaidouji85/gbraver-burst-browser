// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {PlayerGauge} from "../../../../game-object/gauge";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/** プレイヤーゲージを生成する */
export function createPlayerGauge(resources: Resources, players: Player[], playerId: PlayerId): Gauge {
  const player: ?Player = players.find(v => v.playerId === playerId);
  const hp = player ? player.armdozer.maxHp : 0;
  const battery = player ? player.armdozer.maxBattery : 0;

  return PlayerGauge({
    resources: resources,
    hp: hp,
    battery: battery
  });
}