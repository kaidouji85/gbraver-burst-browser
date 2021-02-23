// @flow
import type {TouchRaycastContainer} from "../../raycaster/touch-raycaster";
import {createTouchEventRaycaster} from "../../raycaster/touch-raycaster";
import type {TouchStart} from "../../render/dom-event/touch";
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
export function toTouchStartRaycaster(origin: TouchStart, renderer: typeof THREE.WebGLRenderer, camera: typeof THREE.Camera): TouchStartRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: 'touchStartRaycaster',
    touch: touch
  };
}