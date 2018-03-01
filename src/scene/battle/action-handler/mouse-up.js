// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseUp} from "../../action";
import type {BattleSceneState} from "../index";
import {HudLayer} from "../view/hud-layer";
import {getMouseRaycaster} from "../../../operation/mouse/mouse-raycaster";

/** ゲーム画面をマウスアップした際のイベント */
export function mouseUp(view: BattleSceneView, state: BattleSceneState, action: MouseUp) {
  console.log('mouseUp');
  console.log(action.event);

  hudLayer(view.hudLayer, view.renderer, action.event);
}

/** HUDレイヤーの処理 */
function hudLayer(hudLayer: HudLayer, renderer: THREE.Render,event: MouseEvent): void {
  const raycaster: THREE.Raycaster = getMouseRaycaster(event, renderer, hudLayer.camera);
  hudLayer.attackButton.onMouseUp(raycaster);
}