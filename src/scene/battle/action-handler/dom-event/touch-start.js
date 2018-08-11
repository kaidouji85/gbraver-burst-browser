// @flow

import {BattleSceneView} from "../../view/index";
import type {TouchStart} from "../../../../observer/dom-event/action/touch-start";
import type {BattleSceneState} from "../../state";
import type {TouchRaycastContainer} from "../../../../overlap/check/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../../overlap/check/touch/touch-raycaster";

/** ゲーム画面内をタッチスタートした際のイベント */
export function touchStart(view: BattleSceneView, state: BattleSceneState, action: TouchStart) {
  const hudRaycaster: TouchRaycastContainer = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);

  view.hudLayer.attackButton.onTouchStart(hudRaycaster);
  view.hudLayer.batterySelector.onTouchStart(hudRaycaster);
}