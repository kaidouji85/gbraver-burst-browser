// @flow
import type {MouseRaycaster} from "../../../overlap/check/mouse/mouse-raycaster";

export type MouseMoveRaycaster = {
  type: 'mouseMoveRaycaster',
  mouse: MouseRaycaster,
  isLeftButtonClicked: boolean
};