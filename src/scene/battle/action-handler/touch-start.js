// @flow

import {BattleSceneView} from "../view";
import type {TouchStart} from "../../action";
import type {BattleSceneState} from "../state";
import type {TouchRaycastContainer} from "../../../operation/touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../operation/touch/touch-raycaster";

/** ゲーム画面内をタッチスタートした際のイベント */
export function touchStart(view: BattleSceneView, state: BattleSceneState, action: TouchStart) {
  //console.log('touchStart');
  //console.log(action.event);

  const hudRaycaster: TouchRaycastContainer = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);
  //console.log(hudRaycaster);

  view.hudLayer.attackButton.onTouchStart(hudRaycaster);
}