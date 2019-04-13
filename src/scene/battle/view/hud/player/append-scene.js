// @flow

import * as THREE from "three";
import type {HUDObjects} from "./hud-objects";

/**
 * HUDプレイヤーオブジェクトをシーンに追加する
 *
 * @param scene シーン
 * @param hud HUDプレイヤーオブジェクト
 */
export function appendHUDPlayerObjects(scene: THREE.Scene, hud: HUDObjects) {
  scene.add(hud.gauge.getObject3D());
}