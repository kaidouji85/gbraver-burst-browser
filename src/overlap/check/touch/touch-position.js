// @flow

import * as THREE from "three";
import {getScreenPosition} from "../raycaster/screen-position";

/**
 * ゲーム画面上でのタッチ座標を取得する
 *
 * @param touch タッチ情報
 * @param rendererDO レンダラがバインドされているHTML要素
 */
export function getTouchPosition(touch: Touch, rendererDOM: HTMLElement): THREE.Vector2 {
  return getScreenPosition(touch.clientX, touch.clientY, rendererDOM.clientWidth, rendererDOM.clientHeight);
}