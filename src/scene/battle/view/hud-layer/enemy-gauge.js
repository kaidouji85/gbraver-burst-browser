// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {EnemyGauge} from "../../../../game-object/gauge";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {Observable} from "rxjs";
import type {GameLoop} from "../../../../action/game-loop/game-loop";

/** 敵ゲージを生成する */
export function createEnemyGauge(resources: Resources, listener: Observable<GameLoop>, enemy: Player): Gauge {
  return EnemyGauge({
    listener: listener,
    resources: resources,
    hp: enemy.armdozer.maxHp,
    battery: enemy.armdozer.maxBattery
  });
}