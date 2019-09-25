// @flow
import type {MouseRaycaster} from "../../raycaster/mouse/mouse-raycaster";

export type MouseDownRaycaster = {
  type: 'mouseDownRaycaster',
  mouse: MouseRaycaster
};