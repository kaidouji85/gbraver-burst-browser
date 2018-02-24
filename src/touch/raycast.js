// @flow
import * as THREE from 'three';

/**
 * three.js画面上でのマウス、指の座標を取得する
 *
 * @param clientX マウス、指のX座標
 * @param clientY マウス、指のY座標
 * @param clientWidth 画面幅
 * @param clientHeight 画面高
 * @return three.js画面上でのマウス、指の座標
 */
export function getMouseVector(clientX: number, clientY: number, clientWidth: number, clientHeight: number): THREE.Vector2 {
  const mouse = new THREE.Vector2();
  mouse.x = (clientX / clientWidth) * 2 - 1;
  mouse.y = -(clientY / clientHeight) * 2 + 1;
  return mouse;
}

/**
 * three.js画面上でのマウス、指のレイキャストを取得する
 *
 * @param mouse マウス座標
 * @param camera レイキャストを取得するシーンのカメラ
 * @return three.js画面上でのマウス、指のレイキャスト
 */
export function getRaycaster(mouse: THREE.Vector2, camera: THREE.Camera): THREE.Raycaster {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera( mouse, camera );
  return raycaster;
}
