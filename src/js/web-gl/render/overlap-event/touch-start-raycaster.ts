import * as THREE from "three";

import type { TouchRaycastContainer } from "../../raycaster/touch-raycaster";
import { createTouchEventRaycaster } from "../../raycaster/touch-raycaster";
import type { TouchStart } from "../dom-event/touch";

/** タッチスタートレイキャスター */
export type TouchStartRaycaster = {
  type: "touchStartRaycaster";

  /** タッチレイキャスターコンテナ */
  touch: TouchRaycastContainer;

  /** タッチイベント */
  event: TouchEvent;
};

/**
 * TouchStartからTouchStartRaycasterに変換する
 *
 * @param origin 変換元
 * @returns 変換結果
 */
export function toTouchStartRaycaster(
  origin: TouchStart,
  renderer: HTMLElement,
  camera: THREE.Camera,
): TouchStartRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: "touchStartRaycaster",
    touch,
    event: origin.event,
  };
}
