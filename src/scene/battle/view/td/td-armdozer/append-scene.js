// @flow

import * as THREE from "three";
import type {TDArmdozer} from "./t-d-armdozer";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

/**
 * アームドーザ関連ゲームオブジェクトをシーンに追加するヘルパー関数
 *
 * @param scene シーン
 * @param armdozer シーンに追加するオブジェクト群
 */
export function appendScene(scene: THREE.Scene, armdozer: TDArmdozer<ArmDozerSprite>): void {
  scene.add(armdozer.sprite.getObject3D());
  scene.add(armdozer.gauge.getObject3D());
  scene.add(armdozer.batteryNumber.getObject3D());
  scene.add(armdozer.recoverBattery.getObject3D());
  scene.add(armdozer.damageIndicator.getObject3D());
}