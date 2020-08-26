// @flow

import * as THREE from "three";
import {getScreenPosition} from "../screen-position";

/**
 * ゲーム画面上でのタッチ座標を取得する
 *
 * @param touch タッチ情報
 * @param rendererDOM レンダラがバインドされているHTML要素
 */
export function getTouchPosition(touch: Touch, rendererDOM: HTMLElement): typeof THREE.Vector2 {
  return getScreenPosition(touch.clientX, touch.clientY, rendererDOM.clientWidth, rendererDOM.clientHeight);
}