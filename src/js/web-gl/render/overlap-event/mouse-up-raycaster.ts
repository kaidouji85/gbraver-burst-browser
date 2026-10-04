import * as THREE from "three";

import type { MouseRaycaster } from "../../raycaster/mouse-raycaster";
import { createMouseRaycaster } from "../../raycaster/mouse-raycaster";
import type { MouseUp } from "../dom-event/mouse";

/** マウスアップレイキャスター*/
export type MouseUpRaycaster = {
  type: "mouseUpRaycaster";

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
export function toMouseUpRaycaster(
  origin: MouseUp,
  renderer: HTMLElement,
  camera: THREE.Camera,
): MouseUpRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(
    origin.event,
    renderer,
    camera,
  );
  return {
    type: "mouseUpRaycaster",
    mouse: mouseRaycaster,
    event: origin.event,
  };
}
