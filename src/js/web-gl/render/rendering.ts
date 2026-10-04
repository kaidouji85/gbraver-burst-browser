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
  rendering(scene: THREE.Scene, camera: THREE.Camera): void;
}
