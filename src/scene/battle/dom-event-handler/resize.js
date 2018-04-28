// @flow

import {ThreeDimensionLayer} from "../view/three-dimension-layer";
import {HudLayer} from "../view/hud-layer/index";
import type {BattleSceneState} from "../state";
import {BattleSceneView} from "../view";
import {onResizeOrthographicCamera, onResizePerspectiveCamera} from "../../../camera/resize";
import {fitToWindowSize} from "../../../render/fit-to-window-size";

/** リサイズ時の処理 */
export function resize(view: BattleSceneView, state: BattleSceneState): void {
  fitToWindowSize(view.renderer);
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