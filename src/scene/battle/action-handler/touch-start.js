// @flow

import {BattleSceneView} from "../view";
import type {TouchStart} from "../../action";
import type {BattleSceneState} from "../state";
import type {TouchRaycastContainer} from "../../../screen-touch/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../screen-touch/touch/touch-raycaster";

/** ゲーム画面内をタッチスタートした際のイベント */
export function touchStart(view: BattleSceneView, state: BattleSceneState, action: TouchStart) {
  const hudRaycaster: TouchRaycastContainer = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);

  view.hudLayer.attackButton.onTouchStart(hudRaycaster);
  view.hudLayer.batterySlider.onTouchStart(hudRaycaster);
}