// @flow
import type {TouchRaycastContainer} from "../../raycaster/touch/touch-raycaster";

export type TouchMoveRaycaster = {
  type: 'touchMoveRaycaster',
  touch: TouchRaycastContainer
};