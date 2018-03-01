// @flow

import {BattleSceneView} from "../view";
import type {TouchStart} from "../../action";
import type {BattleSceneState} from "../index";
import type {TouchEventRaycaster} from "../../../touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../touch/touch-raycaster";

/** ゲーム画面内をタッチスタートした際のイベント */
export function touchStart(view: BattleSceneView, state: BattleSceneState, action: TouchStart) {
  console.log('touchStart');
  console.log(action.event);

  const hudRaycaster: TouchEventRaycaster = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);
  console.log(hudRaycaster);
}