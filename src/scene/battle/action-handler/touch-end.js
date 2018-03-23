// @flow

import {BattleSceneView} from "../view";
import type {TouchEnd} from "../../action";
import type {BattleSceneState} from "../state";
import type {TouchRaycastContainer} from "../../../operation/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../operation/touch/touch-raycaster";

/** ゲーム画面内をタッチエンドした際のイベント */
export function touchEnd(view: BattleSceneView, state: BattleSceneState, action: TouchEnd) {
  const hudRaycaster: TouchRaycastContainer = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);
}
