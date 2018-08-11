// @flow

import {BattleSceneView} from "../../view/index";
import type {TouchEnd} from "../../../../observer/dom-event/action/touch-end";
import type {BattleSceneState} from "../../state";
import type {TouchRaycastContainer} from "../../../../overlap/check/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../../overlap/check/touch/touch-raycaster";

/** ゲーム画面内をタッチエンドした際のイベント */
export function touchEnd(view: BattleSceneView, state: BattleSceneState, action: TouchEnd) {
  const hudRaycaster: TouchRaycastContainer = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);
}
