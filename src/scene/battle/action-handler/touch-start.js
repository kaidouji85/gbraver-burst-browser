// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {TouchStart} from "../../action";
import type {BattleSceneState} from "../index";
import {createTouchEventRaycaster} from "../../../touch/touch-event-raycaster";
import type {TouchEventRaycaster} from "../../../touch/touch-event-raycaster";

/** ゲーム画面内をタッチスタートした際のイベント */
export function touchStart(view: BattleSceneView, state: BattleSceneState, action: TouchStart) {
  console.log('touchStart');
  console.log(action.event);

  const hudRaycaster: TouchEventRaycaster = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);
  console.log(hudRaycaster);
}