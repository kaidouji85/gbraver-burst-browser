// @flow

import type {BattleAppState} from "../state";
import {BattleView} from "../view/index";

/** リサイズ時の処理 */
export function resize(state: BattleAppState, view: BattleView) {
  view.renderer.setSize(window.innerWidth, window.innerHeight);
  view.threeDimensionLayer.camera.aspect = window.innerWidth / window.innerHeight;
  view.threeDimensionLayer.camera.updateProjectionMatrix();
}