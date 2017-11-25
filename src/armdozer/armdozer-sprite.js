// @flow
import * as THREE from 'three';

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** アニメーション処理 */
  animate(camera: THREE.Camera): void,
  /** シーンに追加するオブジェクトを取得する */
  getThreeJsObjects(): THREE.Object3D[],
}