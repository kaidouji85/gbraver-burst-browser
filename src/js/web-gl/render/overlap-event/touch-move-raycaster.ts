import * as THREE from "three";

import type { TouchRaycastContainer } from "../../raycaster/touch-raycaster";
import { createTouchEventRaycaster } from "../../raycaster/touch-raycaster";
import type { TouchMove } from "../dom-event/touch";

/** タッチムーブレイキャスター */
export type TouchMoveRaycaster = {
  type: "touchMoveRaycaster";
  touch: TouchRaycastContainer;
};

/**
 * TouchMoveからTouchMoveRaycasterに変換する
 *
 * @param origin 変換元
 * @returns 変換結果
 */
export function toTouchMoveRaycaster(
  origin: TouchMove,
  renderer: HTMLElement,
  camera: THREE.Camera,
): TouchMoveRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: "touchMoveRaycaster",
    touch: touch,
  };
}
