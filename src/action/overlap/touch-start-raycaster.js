// @flow
import type {TouchRaycastContainer} from "../../raycaster/touch/touch-raycaster";

export type TouchStartRaycaster = {
  type: 'touchStartRaycaster',
  touch: TouchRaycastContainer
};