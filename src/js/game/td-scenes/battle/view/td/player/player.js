// @flow
import type {Resources} from "../../../../../../resource";
import type {Player} from "gbraver-burst-core";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import {playerBatteryNumber} from "../../../../../../game-object/battery-number";
import {playerRecoverBattery} from "../../../../../../game-object/recover-battery";
import {playerDamageIndicator} from "../../../../../../game-object/damage-indicator";
import type {TDPlayer} from "./index";
import {playerSpark} from "../../../../../../game-object/hitmark/spark";
import {playerTurnStart} from "../../../../../../game-object/turn-start";
import {playerGauge} from "../../../../../../game-object/gauge";
import {playerBurstIndicator} from "../../../../../../game-object/burst-indicator";

/**
 * プレイヤー側の3Dプレイヤーオブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤーステータス
 * @param listener リスナー
 * @return 3Dプレイヤーオブジェクト
 */
export function playerTDObjects(resources: Resources, state: Player, listener: Observable<GameObjectAction>): TDPlayer {
  return {
    playerId: state.playerId,
    gauge: playerGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery,
    }),
    hitMark: {
      spark: playerSpark(resources, listener),
    },
    batteryNumber: playerBatteryNumber({
      resources: resources,
      listener: listener
    }),
    recoverBattery: playerRecoverBattery(resources, listener),
    damageIndicator: playerDamageIndicator({
      resources: resources,
      listener: listener
    }),
    turnStart: playerTurnStart(resources, listener),
    burstIndicator: playerBurstIndicator(resources, listener)
  }
}

