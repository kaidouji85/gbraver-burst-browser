// @flow

import * as THREE from "three";
import {createRaycaster} from "./raycaster";
import {getScreenPosition} from "./screen-position";

/** マウスのレイキャスト */
export type MouseRaycaster = {
  raycaster: typeof THREE.Raycaster
};

/**
 * マウスイベントからレイキャストを生成する
 *
 * @param event マウスイベント
 * @param rendererDOM レンダラがバインドされているHTML要素
 * @param camera カメラ
 * @return マウスのレイキャスト
 */
export function createMouseRaycaster(event: MouseEvent, rendererDOM: HTMLElement, camera: typeof THREE.Camera): MouseRaycaster {
  const mousePos = getMousePosition(event, rendererDOM);
  return {
    raycaster: createRaycaster(mousePos, camera)
  };
}

/**
 * ゲーム画面上でのマウス座標を取得する
 *
 * @param event マウスイベント
 * @param rendererDOM レンダラがバインドされているHTML要素
 */
export function getMousePosition(event: MouseEvent, rendererDOM: HTMLElement): typeof THREE.Vector2 {
  return getScreenPosition(event.clientX, event.clientY, rendererDOM.clientWidth, rendererDOM.clientHeight);
}
