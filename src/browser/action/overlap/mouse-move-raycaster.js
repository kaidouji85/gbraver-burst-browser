// @flow
import type {MouseRaycaster} from "../../raycaster/mouse/mouse-raycaster";

export type MouseMoveRaycaster = {
  type: 'mouseMoveRaycaster',
  mouse: MouseRaycaster,
  isLeftButtonClicked: boolean
};