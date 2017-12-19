// @flow

import * as THREE from "three";

/** アームドーザスプライト */
export interface ArmDozer {
  /** ゲームループでの処理 */
  gameLoop(camera: THREE.Camera): void;

  /** シーンに追加するオブジェクトを取得する */
  getThreeJsObjects(): THREE.Object3D[];
}