// @flow

import {ThreeDimensionLayer} from "../view/three-dimension-layer";
import {HudLayer} from "../view/hud-layer/index";
import type {BattleSceneState} from "../state";
import {BattleSceneView} from "../view";
import type {ResizeAction} from "../../action";
import {onResizeOrthographicCamera, onResizePerspectiveCamera} from "../../../camera/resize";

/** リサイズ時の処理 */
export function resize(view: BattleSceneView, state: BattleSceneState, action: ResizeAction): void {
  view.renderer.setSize(window.innerWidth, window.innerHeight);
  resizeThreeDimensionLayer(view.threeDimensionLayer);
  resizeHudLayer(view.hudLayer);
}

/** 3Dレイヤーのリサイズ */
function resizeThreeDimensionLayer(layer: ThreeDimensionLayer) {
  onResizePerspectiveCamera(layer.camera);
}

/** HUDレイヤーのリサイズ */
function resizeHudLayer(layer: HudLayer) {
  onResizeOrthographicCamera(layer.camera);
}