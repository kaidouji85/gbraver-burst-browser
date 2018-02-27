// @flow

import {ThreeDimensionLayer} from "../view/three-dimension-layer";
import {HudLayer} from "../view/hud-layer/index";
import type {BattleSceneState} from "../index";
import {BattleSceneView} from "../view";
import type {ResizeAction} from "../../action";

/** リサイズ時の処理 */
export function resize(view: BattleSceneView, state: BattleSceneState, action: ResizeAction): void {
  const renderHtml: HTMLElement = view.renderer.domElement;
  const renderWidth: number = renderHtml.clientWidth;
  const renderHeight: number = renderHtml.clientHeight;

  view.renderer.setSize(renderWidth, renderHeight);
  resizeThreeDimensionLayer(view.threeDimensionLayer, renderWidth, renderHeight);
  resizeHudLayer(view.hudLayer, renderWidth, renderHeight);
}

/** 3Dレイヤーのリサイズ */
function resizeThreeDimensionLayer(layer: ThreeDimensionLayer, width: number, height: number) {
  layer.camera.aspect = width / height;
  layer.camera.updateProjectionMatrix();
}

/** HUDレイヤーのリサイズ */
function resizeHudLayer(layer: HudLayer, width: number, height: number) {
  layer.camera.left = -width/2;
  layer.camera.right = width/2;
  layer.camera.top = height/2;
  layer.camera.bottom = -height/2;
  layer.camera.updateProjectionMatrix();
}