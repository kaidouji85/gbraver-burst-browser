import * as THREE from "three";

/**
 * 画面上の座標、カメラからレイキャストを作成する
 *
 * @param pointerPos マウス、指の座標
 * @param camera レイキャストを取得するシーンのカメラ
 * @return three.js画面上でのマウス、指のレイキャスト
 */
export function createRaycaster(pointerPos: typeof THREE.Vector2, camera: typeof THREE.Camera): typeof THREE.Raycaster {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointerPos, camera);
  return raycaster;
}