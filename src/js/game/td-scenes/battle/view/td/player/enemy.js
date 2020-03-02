// @flow

import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../../../resource";
import {EnemyShinBraver} from '../../../../../../game-object/armdozer/shin-braver';
import type {Player} from "gbraver-burst-core";
import {EnemyNeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import type {PlayerState} from "gbraver-burst-core";
import {enemyBatteryNumber} from "../../../../../../game-object/battery-number";
import {enemyRecoverBattery} from "../../../../../../game-object/recover-battery";
import {enemyDamageIndicator} from "../../../../../../game-object/damage-indicator";
import type {TDPlayer} from "./index";
import {enemySpark} from "../../../../../../game-object/hitmark/spark";
import {enemyTurnStart} from "../../../../../../game-object/turn-start";
import {enemyGauge} from "../../../../../../game-object/gauge";
import {enemyBurstIndicator} from "../../../../../../game-object/burst-indicator";

/**
 * 敵側の3Dプレイヤーオブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤーステータス
 * @param listener リスナー
 * @return 3Dプレイヤーオブジェクト
 */
export function enemyTDObject(resources: Resources, state: PlayerState, listener: Observable<GameObjectAction>): TDPlayer<ArmDozerSprite> {
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

/** 与えられたパラメータから敵スプライを生成する */
export function createEnemySprite(resources: Resources, listener: Observable<GameObjectAction>, enemyInfo: Player): ArmDozerSprite {
  switch (enemyInfo.armdozer.appearance) {
    case 'neo-landozer':
      return EnemyNeoLandozer(resources, listener);
    case 'shin-braver':
    default:
      return EnemyShinBraver(resources, listener);
  }
}