// @flow

import * as THREE from "three";
import {getScreenPosition} from "../screen-position";

/**
 * ゲーム画面上でのマウス座標を取得する
 *
 * @param event マウスイベント
 * @param rendererDOM レンダラがバインドされているHTML要素
 */
export function getMousePosition(event: MouseEvent, rendererDOM: HTMLElement): THREE.Vector2 {
  return getScreenPosition(event.clientX, event.clientY, rendererDOM.clientWidth, rendererDOM.clientHeight);
}