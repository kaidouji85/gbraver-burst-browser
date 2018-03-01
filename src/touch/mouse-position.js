// @flow

import * as THREE from "three";
import {getPointerPosition} from "./pointer-position";

/**
 * ゲーム画面上でのマウス座標を取得する
 *
 * @param event マウスイベント
 * @param renderer three.jsのレンダラー
 */
export function getMousePosition(event: MouseEvent, renderer: THREE.WebGLRenderer): THREE.Vector2 {
  return getPointerPosition(event.clientX, event.clientY, renderer.domElement.clientWidth, renderer.domElement.clientHeight);
}