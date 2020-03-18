// @flow

import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../../../resource";
import type {Player} from "gbraver-burst-core";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import {enemyBatteryNumber} from "../../../../../../game-object/battery-number";
import {enemyRecoverBattery} from "../../../../../../game-object/recover-battery";
import {enemyDamageIndicator} from "../../../../../../game-object/damage-indicator";
import type {TDPlayer} from "./index";
import {enemySpark} from "../../../../../../game-object/hitmark/spark";
import {enemyTurnStart} from "../../../../../../game-object/turn-start";
import {enemyGauge} from "../../../../../../game-object/gauge";
import {enemyBurstIndicator} from "../../../../../../game-object/burst-indicator";
import {createEnemySprite} from "../sprite";

/**
 * 敵側の3Dプレイヤーオブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤーステータス
 * @param listener リスナー
 * @return 3Dプレイヤーオブジェクト
 */
export function enemyTDObject(resources: Resources, state: Player, listener: Observable<GameObjectAction>): TDPlayer<ArmDozerSprite> {
  return {
    playerId: state.playerId,
    gauge: enemyGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery,
    }),
    sprite: createEnemySprite(resources, listener, state),
    hitMark: {
      spark: enemySpark(resources, listener),
    },
    batteryNumber: enemyBatteryNumber({
      resources: resources,
      listener: listener
    }),
    recoverBattery: enemyRecoverBattery(resources, listener),
    damageIndicator: enemyDamageIndicator({
      resources: resources,
      listener: listener
    }),
    turnStart: enemyTurnStart(resources, listener),
    burstIndicator: enemyBurstIndicator(resources, listener)
  }
}

