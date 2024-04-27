import * as THREE from "three";

import type { MouseRaycaster } from "../../raycaster/mouse-raycaster";
import { createMouseRaycaster } from "../../raycaster/mouse-raycaster";
import type { MouseDown } from "../dom-event/mouse";

/** マウスダウンレイキャスター*/
export type MouseDownRaycaster = {
  type: "mouseDownRaycaster";

  /** マウスレイキャスター */
  mouse: MouseRaycaster;

  /** マウスイベント */
  event: MouseEvent;
};

/**
 * MouseDownからMouseDownRaycasterに変換
 *
 * @param origin 変換元
 * @returns 変換結果
 */
export function toMouseDownRaycaster(
  origin: MouseDown,
  renderer: HTMLElement,
  camera: THREE.Camera,
): MouseDownRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(
    origin.event,
    renderer,
    camera,
  );
  return {
    type: "mouseDownRaycaster",
    mouse: mouseRaycaster,
    event: origin.event,
  };
}
