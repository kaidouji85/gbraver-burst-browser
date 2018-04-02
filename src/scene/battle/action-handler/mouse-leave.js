// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseLeave} from "../../action";
import type {BattleSceneState} from "../state";
import {getMouseRaycaster} from "../../../operation/mouse/mouse-raycaster";

/** ゲーム画面内をマウスリーブした際のイベント */
export function mouseLeave(view: BattleSceneView, state: BattleSceneState, action: MouseLeave) {
  //console.log('mouseDown');
  //console.log(action.event);

  const hudRaycaster: THREE.Raycaster = getMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
  view.hudLayer.batterySlider.onMouseLeave(hudRaycaster);
}
