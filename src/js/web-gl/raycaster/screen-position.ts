import * as THREE from "three";

/**
 * three.js画面上でのマウス、指の座標を取得する
 *
 * @param clientX マウス、指のX座標
 * @param clientY マウス、指のY座標
 * @param canvasWidth 画面幅
 * @param canvasHeight 画面高
 * @returns three.js画面上でのマウス、指の座標
 */
export function getScreenPosition(
  clientX: number,
  clientY: number,
  canvasWidth: number,
  canvasHeight: number,
): THREE.Vector2 {
  const mouse = new THREE.Vector2();
  mouse.x = (clientX / canvasWidth) * 2 - 1;
  mouse.y = -(clientY / canvasHeight) * 2 + 1;
  return mouse;
}
