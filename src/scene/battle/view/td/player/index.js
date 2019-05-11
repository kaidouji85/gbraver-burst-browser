// @flow

import {BatteryNumber} from "../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Spark} from "../../../../../game-object/hitmark/spark/spark";
import * as THREE from "three";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

/**
 * 3Dレイヤーのプレイヤー関係オブジェクト
 *
 * @type T アームドーザスプライト
 */
export type TdPlayer<T> = {
  playerId: PlayerId,
  sprite: T,
  hitMark: {
    spark: Spark
  },
  batteryNumber: BatteryNumber,
  recoverBattery: RecoverBattery,
  damageIndicator: DamageIndicator,
};

/**
 * 3Dプレイヤーゲームオブジェクトをシーンに追加するヘルパー関数
 *
 * @param scene シーン
 * @param armdozer シーンに追加するオブジェクト群
 */
export function appendTDObjects(scene: THREE.Scene, armdozer: TdPlayer<ArmDozerSprite>): void {
  scene.add(armdozer.sprite.getObject3D());
  scene.add(armdozer.hitMark.spark.getObject3D());
  scene.add(armdozer.batteryNumber.getObject3D());
  scene.add(armdozer.recoverBattery.getObject3D());
  scene.add(armdozer.damageIndicator.getObject3D());
}