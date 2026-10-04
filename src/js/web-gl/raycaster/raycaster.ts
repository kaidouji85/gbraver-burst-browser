import * as THREE from "three";

/**
 * 画面上の座標、カメラからレイキャストを作成する
 *
 * @param pointerPos マウス、指の座標
 * @param camera レイキャストを取得するシーンのカメラ
 * @returns three.js画面上でのマウス、指のレイキャスト
 */
export function createRaycaster(
  pointerPos: THREE.Vector2,
  camera: THREE.Camera,
): THREE.Raycaster {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointerPos, camera);
  return raycaster;
}
