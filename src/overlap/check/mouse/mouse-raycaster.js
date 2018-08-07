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
 * @param renderer three.jsレンダ
 * @param camera カメラ
 * @return マウスのレイキャスト
 */
export function createMouseRaycaster(event: MouseEvent, renderer: THREE.WebGLRenderer, camera: THREE.Camera): MouseRaycaster {
  const mousePos: THREE.Vectoe2 = getMousePosition(event, renderer);
  return {
    raycaster: createRaycaster(mousePos, camera)
  };
}
