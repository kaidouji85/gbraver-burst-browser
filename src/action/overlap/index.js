// @flow

import type {MouseDownRaycaster} from "./mouse-down-raycaster";
import type {MouseMoveRaycaster} from "./mouse-move-raycaster";
import type {TouchStartRaycaster} from "./touch-start-raycaster";
import type {TouchMoveRaycaster} from "./touch-move-raycaster";

export type OverlapAction = MouseDownRaycaster | MouseMoveRaycaster | TouchStartRaycaster | TouchMoveRaycaster;

