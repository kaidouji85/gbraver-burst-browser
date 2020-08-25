// @flow

import * as THREE from "three";
import {getMousePosition} from "./mouse-position";
import {createRaycaster} from "../raycaster-creator";

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
