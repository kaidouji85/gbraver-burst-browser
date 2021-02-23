// @flow

import * as THREE from "three";

/**
 * レンダリング
 */
export interface Rendering {
  /**
   * レンダリングをする
   *
   * @param scene シーン
   * @param camera カメラ
   */
  rendering(scene: typeof THREE.Scene, camera: typeof THREE.Camera): void;
}