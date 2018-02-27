// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseDown} from "../../action";
import type {BattleSceneState} from "../index";
import {getMouseVector, getRaycaster} from "../../../touch/raycast";

/** ゲーム画面内をマウスダウンした際のイベント */
export function mouseDown(view: BattleSceneView, state: BattleSceneState, action: MouseDown) {
  console.log('mouseDown');
  console.log(action.event);

  const mouse: THREE.Vectoe2 = getMouseVector(action.event.clientX, action.event.clientY, view.renderer.domElement.clientWidth, view.renderer.domElement.clientHeight);
  const hudLayerRaycaster: THREE.Raycaster = getRaycaster(mouse, view.hudLayer.camera);
  view.hudLayer.attackButton.onMouseDown(hudLayerRaycaster);
}
