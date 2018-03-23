// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseUp} from "../../action";
import type {BattleSceneState} from "../state";
import {HudLayer} from "../view/hud-layer";
import {getMouseRaycaster} from "../../../operation/mouse/mouse-raycaster";

/** ゲーム画面をマウスアップした際のイベント */
export function mouseUp(view: BattleSceneView, state: BattleSceneState, action: MouseUp) {
  const hudRaycaster: THREE.Raycaster = getMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
}