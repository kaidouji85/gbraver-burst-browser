// @flow
import * as THREE from "three";

/**
 * three.js画面上でのマウス、指の座標を取得する
 *
 * @param clientX マウス、指のX座標
 * @param clientY マウス、指のY座標
 * @param canvasWidth 画面幅
 * @param canvasHeight 画面高
 * @return three.js画面上でのマウス、指の座標
 */
export function getPointerPosition(clientX: number, clientY: number, canvasWidth: number, canvasHeight: number): THREE.Vector2 {
  const mouse = new THREE.Vector2();
  mouse.x = (clientX / canvasWidth) * 2 - 1;
  mouse.y = -(clientY / canvasHeight) * 2 + 1;
  return mouse;
}

/**
 * ゲーム画面上でのマウス座標を取得する
 *
 * @param event マウスイベント
 * @param renderer three.jsのレンダラー
 */
export function getMousePosition(event: MouseEvent, renderer: THREE.WebGLRenderer): THREE.Vector2 {
  return getPointerPosition(event.clientX, event.clientY, renderer.domElement.clientWidth, renderer.domElement.clientHeight);
}

/**
 * ゲーム画面上でのタッチ座標を取得する
 *
 * @param touch タッチ情報
 * @param renderer three.jsのレンダラー
 */
export function getTouchPosition(touch: Touch, renderer: THREE.WebGLRenderer): THREE.Vector2 {
  return getPointerPosition(touch.clientX, touch.clientY, renderer.domElement.clientWidth, renderer.domElement.clientHeight);
}