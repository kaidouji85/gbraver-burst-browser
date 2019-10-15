// @flow

import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Gauge} from "../../../../../../game-object/gauge/gauge";
import * as THREE from "three";

/** HUDレイヤーのプレイヤー関連オブジェクト */
export type HUDPlayer = {
  playerId: PlayerId,
  gauge: Gauge,
};

/**
 * HUDプレイヤーオブジェクトをシーンに追加する
 *
 * @param scene シーン
 * @param hud HUDプレイヤーオブジェクト
 */
export function appendHUDPlayer(scene: THREE.Scene, hud: HUDPlayer) {
  scene.add(hud.gauge.getObject3D());
}

/**
 * HUDプレイヤーのリソースを破棄する
 *
 * @param target リソース破棄対象
 */
export function disposeHUDPlayer(target: HUDPlayer): void {
  target.gauge.destructor();
}
