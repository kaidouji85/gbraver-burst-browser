// @flow

import type {BattleAppState} from "../state";
import {BattleView} from "../view/index";
import {ThreeDimensionLayer} from "../view/three-dimension-layer";
import {HudLayer} from "../view/hud-layer";

/** リサイズ時の処理 */
export function resize(state: BattleAppState, view: BattleView) {
  view.renderer.setSize(window.innerWidth, window.innerHeight);
  resizeThreeDimensionLayer(view.threeDimensionLayer);
  resizeHudLayer(view.hudLayer);
}

/** 3Dレイヤーのリサイズ */
function resizeThreeDimensionLayer(layer: ThreeDimensionLayer) {
  layer.camera.aspect = window.innerWidth / window.innerHeight;
  layer.camera.updateProjectionMatrix();
}

/** HUDレイヤーのリサイズ */
function resizeHudLayer(layer: HudLayer) {
  layer.camera.left = -window.innerWidth/2;
  layer.camera.right = window.innerWidth/2;
  layer.camera.top = window.innerHeight/2;
  layer.camera.bottom = -window.innerHeight/2;
  layer.camera.updateProjectionMatrix();
}