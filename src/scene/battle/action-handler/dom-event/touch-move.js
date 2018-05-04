// @flow

import {BattleSceneView} from "../../view/index";
import type {TouchMove} from "../../../../action/dom-event/touch-move";
import type {BattleSceneState} from "../../state";
import type {TouchRaycastContainer} from "../../../../screen-touch/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../../screen-touch/touch/touch-raycaster";

/** ゲーム画面内をタッチムーブした際のイベント */
export function touchMove(view: BattleSceneView, state: BattleSceneState, action: TouchMove) {
  const hudRaycaster: TouchRaycastContainer = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);

  view.hudLayer.batterySlider.onTouchMove(hudRaycaster);
}
