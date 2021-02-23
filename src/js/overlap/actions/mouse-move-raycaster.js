// @flow
import type {MouseRaycaster} from "../../raycaster/mouse-raycaster";
import {createMouseRaycaster} from "../../raycaster/mouse-raycaster";
import type {MouseMove} from "../../render/dom-events/mouse";
import * as THREE from "three";
import {isMouseLeftButtonPushed} from "../../mouse/mouse-left-button";

/** マウスムーブレイキャスター */
export type MouseMoveRaycaster = {
  type: 'mouseMoveRaycaster',
  mouse: MouseRaycaster,
  isLeftButtonClicked: boolean
};

/**
 * MouseMoveからMouseMoveRaycasterに変換
 *
 * @param origin 変換元
 * @return 変換結果
 */
export function toMouseMoveRaycaster(origin: MouseMove, renderer: typeof THREE.WebGLRenderer, camera: typeof  THREE.Camera): MouseMoveRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(origin.event, renderer, camera);
  const isLeftButtonClicked = isMouseLeftButtonPushed(origin.event);

  return {
    type: 'mouseMoveRaycaster',
    mouse: mouseRaycaster,
    isLeftButtonClicked: isLeftButtonClicked
  };
}