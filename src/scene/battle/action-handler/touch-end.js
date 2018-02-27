// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {TouchEnd} from "../../action";
import type {BattleSceneState} from "../index";
import {getMouseVector, getRaycaster} from "../../../touch/raycast";

/** ゲーム画面内をタッチエンドした際のイベント */
export function touchEnd(view: BattleSceneView, state: BattleSceneState, action: TouchEnd) {
  console.log('touchEnd');
  console.log(action.event);

  /*
  const mouse: THREE.Vectoe2 = getMouseVector(action.event.clientX, action.event.clientY, view.renderer.domElement.clientWidth, view.renderer.domElement.clientHeight);
  const hudLayerRaycaster: THREE.Raycaster = getRaycaster(mouse, view.hudLayer.camera);
  view.hudLayer.attackButton.touchDownScreen(hudLayerRaycaster);
  */
}
