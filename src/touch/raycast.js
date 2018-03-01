// @flow
import * as THREE from 'three';

/**
 * three.js画面上でのマウス、指のレイキャストを取得する
 *
 * @param pointer マウス、指の座標
 * @param camera レイキャストを取得するシーンのカメラ
 * @return three.js画面上でのマウス、指のレイキャスト
 */
export function getRaycaster(pointer: THREE.Vector2, camera: THREE.Camera): THREE.Raycaster {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera( pointer, camera );
  return raycaster;
}
