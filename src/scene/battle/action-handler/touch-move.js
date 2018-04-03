// @flow

import {BattleSceneView} from "../view";
import type {TouchMove} from "../../action";
import type {BattleSceneState} from "../state";
import type {TouchRaycastContainer} from "../../../operation/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../operation/touch/touch-raycaster";

/** ゲーム画面内をタッチムーブした際のイベント */
export function touchMove(view: BattleSceneView, state: BattleSceneState, action: TouchMove) {
  const hudRaycaster: TouchRaycastContainer = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);

  view.hudLayer.batterySlider.onTouchMove(hudRaycaster);
}
