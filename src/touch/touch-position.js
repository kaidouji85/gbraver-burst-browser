// @flow

import * as THREE from "three";
import {getPointerPosition} from "./pointer-position";

/**
 * ゲーム画面上でのタッチ座標を取得する
 *
 * @param touch タッチ情報
 * @param renderer three.jsのレンダラー
 */
export function getTouchPosition(touch: Touch, renderer: THREE.WebGLRenderer): THREE.Vector2 {
  return getPointerPosition(touch.clientX, touch.clientY, renderer.domElement.clientWidth, renderer.domElement.clientHeight);
}