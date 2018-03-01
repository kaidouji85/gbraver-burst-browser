// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseDown} from "../../action";
import type {BattleSceneState} from "../index";
import {HudLayer} from "../view/hud-layer";
import {getMouseRaycaster} from "../../../operation/mouse/mouse-raycaster";

/** ゲーム画面内をマウスダウンした際のイベント */
export function mouseDown(view: BattleSceneView, state: BattleSceneState, action: MouseDown) {
  console.log('mouseDown');
  console.log(action.event);

  const hudRaycaster: THREE.Raycaster = getMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
  view.hudLayer.attackButton.onMouseDown(hudRaycaster);
}
