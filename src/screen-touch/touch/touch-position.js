// @flow

import * as THREE from "three";
import {getScreenPosition} from "../raycaster/screen-position";

/**
 * ゲーム画面上でのタッチ座標を取得する
 *
 * @param touch タッチ情報
 * @param renderer three.jsのレンダラー
 */
export function getTouchPosition(touch: Touch, renderer: THREE.WebGLRenderer): THREE.Vector2 {
  return getScreenPosition(touch.clientX, touch.clientY, renderer.domElement.clientWidth, renderer.domElement.clientHeight);
}