// @flow

import type {Resources} from "../../../../resource";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {EnemyGauge} from "../../../../game-object/gauge";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action";

/** 敵ゲージを生成する */
export function createEnemyGauge(resources: Resources, listener: Observable<GameObjectAction>, enemy: Player): Gauge {
  return EnemyGauge({
    listener: listener,
    resources: resources,
    hp: enemy.armdozer.maxHp,
    battery: enemy.armdozer.maxBattery
  });
}