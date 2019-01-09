// @flow
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {BatteryNumber} from "../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../game-object/damage-indicator/damage-indicator";
import * as THREE from "three";

export type AbstractArmdozerObjects<T> = {
  sprite: ArmDozerSprite;
  gauge: Gauge;
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
};


/** アームドーザに関連するオブジェクトをあつめたもの */
export type ArmdozerGameObjects<T> = {
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
export function appendArmDozerGameObject(scene: THREE.Scene, objects: ArmdozerGameObjects<ArmDozerSprite>): void {
  scene.add(objects.sprite.getObject3D());
  scene.add(objects.gauge.getObject3D());
  scene.add(objects.batteryNumber.getObject3D());
  scene.add(objects.recoverBattery.getObject3D());
  scene.add(objects.damageIndicator.getObject3D());
}