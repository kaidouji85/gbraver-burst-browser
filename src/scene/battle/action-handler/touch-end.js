// @flow

import {BattleSceneView} from "../view";
import type {TouchEnd} from "../../action";
import type {BattleSceneState} from "../index";
import type {TouchEventRaycaster} from "../../../touch/touch-raycaster";
import {createTouchEventRaycaster} from "../../../touch/touch-raycaster";

/** ゲーム画面内をタッチエンドした際のイベント */
export function touchEnd(view: BattleSceneView, state: BattleSceneState, action: TouchEnd) {
  console.log('touchEnd');
  console.log(action.event);

  const hudRaycaster: TouchEventRaycaster = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);
  console.log(hudRaycaster);
}
