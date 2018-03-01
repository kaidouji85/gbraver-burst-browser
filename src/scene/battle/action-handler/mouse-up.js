// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseUp} from "../../action";
import type {BattleSceneState} from "../index";
import {getRaycaster} from "../../../touch/raycaster";
import {HudLayer} from "../view/hud-layer";
import {getMousePosition} from "../../../touch/pointer-position";

/** ゲーム画面をマウスオーバーした際のイベント */
export function mouseUp(view: BattleSceneView, state: BattleSceneState, action: MouseUp) {
  console.log('mouseUp');
  console.log(action.event);

  const mousePos: THREE.Vectoe2 = getMousePosition(action.event, view.renderer);
  hudLayer(view.hudLayer, mousePos);
}

/** HUDレイヤーの処理 */
function hudLayer(hudLayer: HudLayer, mousePos: THREE.Vectoe2): void {
  const raycaster: THREE.Raycaster = getRaycaster(mousePos, hudLayer.camera);
  hudLayer.attackButton.onMouseUp(raycaster);
}