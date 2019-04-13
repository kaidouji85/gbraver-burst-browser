// @flow

import * as THREE from "three";
import type {TDObjects} from "./td-objects";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

/**
 * 3Dプレイヤーゲームオブジェクトをシーンに追加するヘルパー関数
 *
 * @param scene シーン
 * @param armdozer シーンに追加するオブジェクト群
 */
export function appendTDObjects(scene: THREE.Scene, armdozer: TDObjects<ArmDozerSprite>): void {
  scene.add(armdozer.sprite.getObject3D());
  scene.add(armdozer.hitMark.spark.getObject3D());
  scene.add(armdozer.batteryNumber.getObject3D());
  scene.add(armdozer.recoverBattery.getObject3D());
  scene.add(armdozer.damageIndicator.getObject3D());
}