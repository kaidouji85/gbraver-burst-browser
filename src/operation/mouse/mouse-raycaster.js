// @flow

import * as THREE from "three";
import {getMousePosition} from "./mouse-position";
import {getRaycaster} from "../raycaster";

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
  return getRaycaster(mousePos, camera);
}
