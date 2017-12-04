// @flow

import type {BattleAppState} from "../state";
import {BattleView} from "../view";
import {ThreeDimensionLayer} from "../view/three-dimension-layer";
import {HudLayer} from "../view/hud-layer/index";
import {MESH_HEIGHT, MESH_WIDTH} from "../../../gauge";

/** ゲームループ時の処理 */
export function gameLoop(state: BattleAppState, view: BattleView) {
  threeDimension(view.threeDimensionLayer);
  hud(view.hudLayer);
}

/** 3Dレイヤーのゲームループ時の処理 */
function threeDimension(view: ThreeDimensionLayer) {
  view.playerSprite.gameLoop(view.camera);
  view.enemySprite.gameLoop(view.camera);
  view.battleField.gameLoop(view.camera);
}

/** hudレイヤーのゲームループ時の処理 */
function hud(view: HudLayer) {
  view.playerGauge.state.gameLoop(view.playerGauge.target);

  view.enemyGauge.mesh.position.x = (-window.innerWidth + MESH_WIDTH) / 2;
  view.enemyGauge.mesh.position.y = (window.innerHeight - MESH_HEIGHT) / 2;
}