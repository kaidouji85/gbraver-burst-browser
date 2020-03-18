// @flow

import type {CutIn} from "../../../../../../game-object/cut-in/cut-in";
import * as THREE from 'three';
import type {PlayerId} from "gbraver-burst-core/lib/player/player";

/**
 * HUDプレイヤーオブジェクト
 *
 * @type T カットインアニメーション
 */
export type HUDPlayer<T: CutIn> = {
  playerId: PlayerId,
  cutIn: T
}

/**
 * HUDプレイヤーオブジェクトをシーンに追加する
 *
 * @param scene シーン
 * @param target HUDプレイヤーオブジェクト
 */
export function appendHUDPlayer<T: CutIn>(scene: THREE.Scene, target: HUDPlayer<T>): void {
  scene.add(target.cutIn.getObject3D());
}

/**
 * HUDプレイヤーオブジェクトのリソースを解放する
 *
 * @param target リソース解放対象のHUDプレイヤーオブジェクト
 */
export function disposeHUDPlayer<T: CutIn>(target: HUDPlayer<T>): void {
  target.cutIn.destructor();
}