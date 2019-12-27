// @flow
import type {TouchRaycastContainer} from "../../raycaster/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../raycaster/touch/touch-raycaster";
import type {TouchStart} from "../dom-event/touch";
import * as THREE from "three";

/** タッチスタートレイキャスター */
export type TouchStartRaycaster = {
  type: 'touchStartRaycaster',
  touch: TouchRaycastContainer
};

/**
 * TouchStartからTouchStartRaycasterに変換する
 *
 * @param origin 変換元
 * @return 変換結果
 */
export function toTouchStartRaycaster(origin: TouchStart, renderer: THREE.WebGLRenderer, camera: THREE.Camera): TouchStartRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: 'touchStartRaycaster',
    touch: touch
  };
}