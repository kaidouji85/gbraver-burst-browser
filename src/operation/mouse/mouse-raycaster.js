// @flow

import * as THREE from "three";
import {getMousePosition} from "./mouse-position";
import {createRaycaster} from "../raycaster-creator";

/**
 * マウスイベントからレイキャストを取得
 *
 * @param event マウスイベント
 * @param renderer three.jsレンダ
 * @param camera カメラ
 * @return レイキャスト
 */
export function getMouseRaycaster(event: MouseEvent, renderer: THREE.WebGLRenderer, camera: THREE.Camera): THREE.Raycaster {
  const mousePos: THREE.Vectoe2 = getMousePosition(event, renderer);
  return createRaycaster(mousePos, camera);
}
