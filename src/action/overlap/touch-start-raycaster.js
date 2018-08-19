// @flow
import type {TouchRaycastContainer} from "../../overlap/check/touch/touch-raycaster";

export type TouchStartRaycaster = {
  type: 'touchStartRaycaster',
  touch: TouchRaycastContainer
};