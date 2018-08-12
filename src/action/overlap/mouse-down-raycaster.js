// @flow
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";

export type MouseDownRaycaster = {
  type: 'mouseDownRaycaster',
  mouse: MouseRaycaster
};