// @flow

import * as THREE from "three";
import type {MouseDown} from "../dom-event/mouse-down";
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import type {TouchStart} from "../dom-event/touch-start";
import type {TouchStartRaycaster} from "./touch-start-raycaster";
import {createTouchEventRaycaster} from "../../overlap/check/touch/touch-raycaster";
import type {MouseDownRaycaster} from "./mouse-down-raycaster";
import type {MouseMove} from "../dom-event/mouse-move";
import type {MouseMoveRaycaster} from "./mouse-move-raycaster";
import {isMouseLeftButtonPushed} from "../../mouse/mouse-left-button";
import type {TouchMoveRaycaster} from "./touch-move-raycaster";
import type {TouchMove} from "../dom-event/touch-move";

/** MouseDownからMouseDownRaycasterに変換 */
export function toMouseDownRaycaster(origin: MouseDown, renderer: THREE.WebGLRenderer, camera: THREE.Camera): MouseDownRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(origin.event, renderer, camera);
  return {
    type: 'mouseDownRaycaster',
    mouse: mouseRaycaster
  };
}

/** MouseMoveからMouseMoveRaycasterに変換 */
export function toMouseMoveRaycaster(origin: MouseMove, renderer: THREE.WebGLRenderer, camera: THREE.Camera): MouseMoveRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(origin.event, renderer, camera);
  const isLeftButtonClicked = isMouseLeftButtonPushed(origin.event);

  return {
    type: 'mouseMoveRaycaster',
    mouse: mouseRaycaster,
    isLeftButtonClicked: isLeftButtonClicked
  };
}

/** TouchStartからTouchStartRaycasterに変換する */
export function toTouchStartRaycaster(origin: TouchStart, renderer: THREE.WebGLRenderer, camera: THREE.Camera): TouchStartRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: 'touchStartRaycaster',
    touch: touch
  };
}

/** TouchMoveからTouchMoveRaycasterに変換する */
export function toTouchMoveRaycaster(origin: TouchMove, renderer: THREE.WebGLRenderer, camera: THREE.Camera): TouchMoveRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: 'touchMoveRaycaster',
    touch: touch
  };
}