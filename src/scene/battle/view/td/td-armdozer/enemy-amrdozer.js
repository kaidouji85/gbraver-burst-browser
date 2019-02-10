// @flow

import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../../resource";
import {EnemyShinBraver} from '../../../../../game-object/armdozer/shin-breaver';
import type {Player} from "gbraver-burst-core/lib/player/player";
import {EnemyNeoLandozer} from "../../../../../game-object/armdozer/neo-landozer";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import {enemyGauge} from "../../../../../game-object/gauge";
import {enemyBatteryNumber} from "../../../../../game-object/battery-number";
import {enemyRecoverBattery} from "../../../../../game-object/recover-battery";
import {enemyDamageIndicator} from "../../../../../game-object/damage-indicator";
import type {TDArmdozer} from "./td-armdozer";
import {playerSpark} from "../../../../../game-object/hitmark/spark";

/** 敵のアームドーザオブジェクトを生成する */
export function enemyArmdozerObjects(resources: Resources, state: PlayerState, listener: Observable<GameObjectAction>): TDArmdozer<ArmDozerSprite> {
  return {
    playerId: state.playerId,
    sprite: createEnemySprite(resources, listener, state),
    hitMark: {
      spark: playerSpark(resources),  // 敵のヒットマークに差し替える
    },
    gauge: enemyGauge({
      listener: listener,
      resources: resources,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery
    }),
    batteryNumber: enemyBatteryNumber({
      resources: resources,
      listener: listener
    }),
    recoverBattery: enemyRecoverBattery(resources, listener),
    damageIndicator: enemyDamageIndicator({
      resources: resources,
      listener: listener
    })
  }
}

/** 与えられたパラメータから敵スプライを生成する */
export function createEnemySprite(resources: Resources, listener: Observable<GameObjectAction>, enemyInfo: Player): ArmDozerSprite {
  switch (enemyInfo.armdozer.appearance) {
    case 'neo-landozer':
      return EnemyNeoLandozer(resources, listener);
    case 'shin-breaver':
    default:
      return EnemyShinBraver(resources, listener);
  }
}