// @flow
import type {TouchRaycastContainer} from "../../overlap/check/touch/touch-raycaster";

export type TouchMoveRaycaster = {
  type: 'touchMoveRaycaster',
  touch: TouchRaycastContainer
};