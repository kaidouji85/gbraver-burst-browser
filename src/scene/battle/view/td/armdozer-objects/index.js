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
import {createPlayerGauge} from "./player-gauge";
import {playerBatteryNumber} from "../../../../../game-object/battery-number";
import {playerRecoverBattery} from "../../../../../game-object/recover-battery";
import {playerDamageIndicator} from "../../../../../game-object/damage-indicator";
import {Observable} from "rxjs";


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
    gauge: createPlayerGauge(resources, listener, state),
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

