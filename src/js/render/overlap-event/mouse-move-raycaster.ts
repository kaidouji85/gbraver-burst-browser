import * as THREE from "three";

import { isMouseLeftButtonPushed } from "../../mouse/mouse-left-button";
import type { MouseRaycaster } from "../../raycaster/mouse-raycaster";
import { createMouseRaycaster } from "../../raycaster/mouse-raycaster";
import type { MouseMove } from "../dom-event/mouse";

/** マウスムーブレイキャスター */
export type MouseMoveRaycaster = {
  type: "mouseMoveRaycaster";
  mouse: MouseRaycaster;
  isLeftButtonClicked: boolean;
};

/**
 * MouseMoveからMouseMoveRaycasterに変換
 *
 * @param origin 変換元
 * @returns 変換結果
 */
export function toMouseMoveRaycaster(
  origin: MouseMove,
  renderer: HTMLElement,
  camera: THREE.Camera,
): MouseMoveRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(
    origin.event,
    renderer,
    camera,
  );
  const isLeftButtonClicked = isMouseLeftButtonPushed(origin.event);
  return {
    type: "mouseMoveRaycaster",
    mouse: mouseRaycaster,
    isLeftButtonClicked: isLeftButtonClicked,
  };
}
