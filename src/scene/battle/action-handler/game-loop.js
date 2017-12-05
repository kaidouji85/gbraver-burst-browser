// @flow

import {ThreeDimensionLayer} from "../view/three-dimension-layer";
import {HudLayer} from "../view/hud-layer/index";
import {MESH_HEIGHT, MESH_WIDTH} from "../../../gauge";
import {BattleSceneView} from "../view";
import type {BattleSceneState} from "../state";

/** ゲームループ時の処理 */
export function gameLoop(view: BattleSceneView, state: BattleSceneState): void {
  threeDimension(view.threeDimensionLayer);
  hud(view.hudLayer);

  view.render();
}

/** 3Dレイヤーのゲームループ時の処理 */
function threeDimension(view: ThreeDimensionLayer) {
  view.playerSprite.gameLoop(view.camera);
  view.enemySprite.gameLoop(view.camera);
  view.battleField.gameLoop(view.camera);
}

/** hudレイヤーのゲームループ時の処理 */
function hud(view: HudLayer) {
  view.playerGauge.gameLoop();

  view.enemyGauge.mesh.position.x = (-window.innerWidth + MESH_WIDTH) / 2;
  view.enemyGauge.mesh.position.y = (window.innerHeight - MESH_HEIGHT) / 2;
}