// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseUp} from "../../action";
import type {BattleSceneState} from "../index";
import {getMouseVector, getRaycaster} from "../../../touch/raycast";

/** ゲーム画面をマウスオーバーした際のイベント */
export function mouseUp(view: BattleSceneView, state: BattleSceneState, action: MouseUp) {
  console.log('mouseUp');
  console.log(action.event);

  const mouse: THREE.Vectoe2 = getMouseVector(action.event.clientX, action.event.clientY, view.renderer.domElement.clientWidth, view.renderer.domElement.clientHeight);
  const hudLayerRaycaster: THREE.Raycaster = getRaycaster(mouse, view.hudLayer.camera);
  view.hudLayer.attackButton.onMouseUp(hudLayerRaycaster);
}
