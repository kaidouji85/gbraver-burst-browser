// @flow

import type {MouseRaycaster} from "../../../overlap/check/mouse/mouse-raycaster";
import type {TouchRaycastContainer} from "../../../overlap/check/touch/touch-raycaster";

export type RaycasterAction = MouseDownRaycaster | MouseMoveRaycaster | TouchStartRaycaster | TouchMoveRaycaster;

export type MouseDownRaycaster = {
  type: 'mouseDownRaycaster',
  mouse: MouseRaycaster
};

export type MouseMoveRaycaster = {
  type: 'mouseMoveRaycaster',
  mouse: MouseRaycaster,
  isLeftButtonClidked: boolean
};

export type TouchStartRaycaster = {
  type: 'touchStartRaycaster',
  touch: TouchRaycastContainer
};

export type TouchMoveRaycaster = {
  type: 'touchMoveRaycaster',
  touch: TouchRaycastContainer
};