// @flow

import * as THREE from "three";
import {getMousePosition} from "./mouse-position";
import {createRaycaster} from "../raycaster/raycaster-creator";

/** マウスのレイキャスト */
export type MouseRaycaster = {
  raycaster: THREE.Raycaster
};

/**
 * マウスイベントからレイキャストを生成する
 *
 * @param event マウスイベント
 * @param rendererDOM レンダラがバインドされているHTML要素
 * @param camera カメラ
 * @return マウスのレイキャスト
 */
export function createMouseRaycaster(event: MouseEvent, rendererDOM: HTMLElement, camera: THREE.Camera): MouseRaycaster {
  const mousePos: THREE.Vectoe2 = getMousePosition(event, rendererDOM);
  return {
    raycaster: createRaycaster(mousePos, camera)
  };
}
