// @flow

import type {BattleAppState} from "../state";
import {BattleView} from "../view";
import {ThreeDimensionLayer} from "../view/three-dimension-layer";

/** ゲームループ時の処理 */
export function gameLoop(state: BattleAppState, view: BattleView) {
  threeDimension(view.threeDimensionLayer);
}

/** 3Dレイヤーのゲームループ時の処理 */
function threeDimension(view: ThreeDimensionLayer) {
  view.playerSprite.gameLoop(view.camera);
  view.enemySprite.gameLoop(view.camera);
  view.battleField.gameLoop(view.camera);
}