// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {EnemyGauge} from "../../../../game-object/gauge";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/** 敵ゲージを生成する */
export function createEnemyGauge(resources: Resources, players: Player[], playerId: PlayerId): Gauge {
  const enemy: ?Player = players.find(v => v.playerId !== playerId);
  const hp = enemy ? enemy.armdozer.maxHp : 0;
  const battery = enemy ? enemy.armdozer.maxBattery : 0;

  return EnemyGauge({
    resources: resources,
    hp: hp,
    battery: battery
  });
}