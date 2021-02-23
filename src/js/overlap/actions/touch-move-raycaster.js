// @flow
import type {TouchRaycastContainer} from "../../raycaster/touch-raycaster";
import {createTouchEventRaycaster} from "../../raycaster/touch-raycaster";
import type {TouchMove} from "../../render/dom-events/touch";
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
export function toTouchMoveRaycaster(origin: TouchMove, renderer: typeof THREE.WebGLRenderer, camera: typeof THREE.Camera): TouchMoveRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: 'touchMoveRaycaster',
    touch: touch
  };
}