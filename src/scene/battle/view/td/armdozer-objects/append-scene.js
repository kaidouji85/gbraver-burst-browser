// @flow

import * as THREE from "three";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import type {ArmdozerObjects} from "./armdozer-objects";

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