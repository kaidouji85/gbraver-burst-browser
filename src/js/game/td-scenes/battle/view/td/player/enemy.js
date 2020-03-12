// @flow

import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../../../resource";
import {EnemyShinBraver} from '../../../../../../game-object/armdozer/shin-braver';
import type {Player} from "gbraver-burst-core";
import {EnemyNeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer";
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
import {EnemyLightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer";
import {ArmdozerAppearances} from "gbraver-burst-core";

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

/** 与えられたパラメータから敵スプライを生成する */
export function createEnemySprite(resources: Resources, listener: Observable<GameObjectAction>, enemyInfo: Player): ArmDozerSprite {
  switch (enemyInfo.armdozer.appearance) {
    case ArmdozerAppearances.NEO_LANDOZER:
      return EnemyNeoLandozer(resources, listener);
    case ArmdozerAppearances.LIGHTNING_DOZER:
      return EnemyLightningDozer(resources, listener);
    case ArmdozerAppearances.SHIN_BRAVER:
    default:
      return EnemyShinBraver(resources, listener);
  }
}