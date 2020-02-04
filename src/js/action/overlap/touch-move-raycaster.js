// @flow
import type {TouchRaycastContainer} from "../../raycaster/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../raycaster/touch/touch-raycaster";
import type {TouchMove} from "../td-dom/touch";
import * as THREE from "three";

/** タッチムーブレイキャスター */
export type TouchMoveRaycaster = {
  type: 'touchMoveRaycaster',
  touch: TouchRaycastContainer
};

/**
 * TouchMoveからTouchMoveRaycasterに変換する
 *
 * @param origin 変換元
 * @return 変換結果
 */
export function toTouchMoveRaycaster(origin: TouchMove, renderer: THREE.WebGLRenderer, camera: THREE.Camera): TouchMoveRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: 'touchMoveRaycaster',
    touch: touch
  };
}