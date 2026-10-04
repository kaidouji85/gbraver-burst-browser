import * as THREE from "three";

import type { TouchRaycastContainer } from "../../raycaster/touch-raycaster";
import { createTouchEventRaycaster } from "../../raycaster/touch-raycaster";
import type { TouchEnd } from "../dom-event/touch";

/** タッチエンドレイキャスター */
export type TouchEndRaycaster = {
  type: "touchEndRaycaster";

  /** タッチレイキャスターコンテナ */
  touch: TouchRaycastContainer;

  /** タッチイベント */
  event: TouchEvent;
};

/**
 * TouchEndからTouchStartRaycasterに変換する
 *
 * @param origin 変換元
 * @returns 変換結果
 */
export function toTouchEndRaycaster(
  origin: TouchEnd,
  renderer: HTMLElement,
  camera: THREE.Camera,
): TouchEndRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: "touchEndRaycaster",
    touch,
    event: origin.event,
  };
}
