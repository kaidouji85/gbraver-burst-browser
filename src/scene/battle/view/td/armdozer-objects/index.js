// @flow
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {Gauge} from "../../../../../game-object/gauge/gauge";
import {BatteryNumber} from "../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import * as THREE from "three";
import type {Resources} from "../../../../../resource";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import {createPlayerSprite} from "./player-sprite";
import {enemyBatteryNumber, playerBatteryNumber} from "../../../../../game-object/battery-number";
import {enemyRecoverBattery, playerRecoverBattery} from "../../../../../game-object/recover-battery";
import {enemyDamageIndicator, playerDamageIndicator} from "../../../../../game-object/damage-indicator";
import {Observable} from "rxjs";
import {createEnemySprite} from "./enemy-sprite";
import {enemyGauge, playerGauge} from "../../../../../game-object/gauge";


/**
 * アームドーザに関連するオブジェクトを集めたもの
 *
 * @type T アームドーザスプライト
 */
export type ArmdozerObjects<T> = {
  sprite: T;
  gauge: Gauge;
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
};

/**
 * アームドーザ関連ゲームオブジェクトをシーンに追加するヘルパー関数
 *
 * @param scene シーン
 * @param objects シーンに追加するオブジェクト群
 */
export function appendScene(scene: THREE.Scene, objects: ArmdozerObjects<ArmDozerSprite>): void {
  scene.add(objects.sprite.getObject3D());
  scene.add(objects.gauge.getObject3D());
  scene.add(objects.batteryNumber.getObject3D());
  scene.add(objects.recoverBattery.getObject3D());
  scene.add(objects.damageIndicator.getObject3D());
}

/** プレイヤーのアームドーザオブジェクトを生成する */
export function playerArmdozerObjects(resources: Resources, state: PlayerState, listener: Observable<GameObjectAction>): ArmdozerObjects<ArmDozerSprite> {
  return {
    sprite: createPlayerSprite(resources, listener, state),
    gauge: playerGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery
    }),
    batteryNumber: playerBatteryNumber({
      resources: resources,
      listener: listener
    }),
    recoverBattery: playerRecoverBattery(resources, listener),
    damageIndicator: playerDamageIndicator({
      resources: resources,
      listener: listener
    })
  }
}

/** 敵のアームドーザオブジェクトを生成する */
export function enemyArmdozerObjects(resources: Resources, state: PlayerState, listener: Observable<GameObjectAction>): ArmdozerObjects<ArmDozerSprite> {
  return {
    sprite: createEnemySprite(resources, listener, state),
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