// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseDown} from "../../action";
import type {BattleSceneState} from "../index";
import {getRaycaster} from "../../../touch/pointer-raycaster";
import {HudLayer} from "../view/hud-layer";
import {getPointerPosition} from "../../../touch/pointer-position";
import {getMousePosition} from "../../../touch/mouse-position";

/** ゲーム画面内をマウスダウンした際のイベント */
export function mouseDown(view: BattleSceneView, state: BattleSceneState, action: MouseDown) {
  console.log('mouseDown');
  console.log(action.event);

  const mousePos: THREE.Vectoe2 = getMousePosition(action.event, view.renderer);
  hudLayer(view.hudLayer, mousePos);
}

/** HUFレイヤーの処理 */
function hudLayer(hudLayer: HudLayer, mousePos: THREE.Vectoe2): void {
  const raycaster: THREE.Raycaster = getRaycaster(mousePos, hudLayer.camera);
  hudLayer.attackButton.onMouseDown(raycaster);
}
