// @flow
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {BatteryNumber} from "../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../game-object/damage-indicator/damage-indicator";
import * as THREE from "three";

/** プレイヤー固有のゲームオブジェクトをあつめたもの */
export type PlayerGameObjects = {
  sprite: ArmDozerSprite;
  gauge: Gauge;
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
};

/**
 * プレイヤー関連ゲームオブジェクトをシーンに追加するヘルパー関数
 *
 * @param scene シーン
 * @param objects プレイヤー関連ゲームオブジェクト
 */
export function appendPlayerGameObject(scene: THREE.Scene, objects: PlayerGameObjects): void {
  scene.add(objects.sprite.getObject3D());
  scene.add(objects.gauge.getObject3D());
  scene.add(objects.batteryNumber.getObject3D());
  scene.add(objects.recoverBattery.getObject3D());
  scene.add(objects.damageIndicator.getObject3D());
}