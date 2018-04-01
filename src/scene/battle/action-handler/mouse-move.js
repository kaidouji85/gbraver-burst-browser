// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseMove} from "../../action";
import type {BattleSceneState} from "../state";
import {getMouseRaycaster} from "../../../operation/mouse/mouse-raycaster";

/** ゲーム画面をマウスムーブした際のイベント */
export function mouseMove(view: BattleSceneView, state: BattleSceneState, action: MouseMove) {
  const hudRaycaster: THREE.Raycaster = getMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);

  view.hudLayer.batterySlider.onMouseMove(hudRaycaster);
}