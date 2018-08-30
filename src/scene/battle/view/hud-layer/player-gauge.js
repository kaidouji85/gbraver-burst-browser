// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {PlayerGauge} from "../../../../game-object/gauge";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action";

/** プレイヤーゲージを生成する */
export function createPlayerGauge(resources: Resources, listener: Observable<GameObjectAction>, player: Player): Gauge {
  return PlayerGauge({
    resources: resources,
    listener: listener,
    hp: player.armdozer.maxHp,
    battery: player.armdozer.maxBattery
  });
}