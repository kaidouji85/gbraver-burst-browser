// @flow

import {ThreeDimensionLayer} from "../view/three-dimension-layer";
import {HudLayer} from "../view/hud-layer/index";
import {BattleSceneView} from "../view";
import type {BattleSceneState} from "../index";
import type {GameLoopAction} from "../../action";

/** ゲームループ時の処理 */
export function gameLoop(view: BattleSceneView, state: BattleSceneState, action: GameLoopAction): void {
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
  view.playerHpGauge.gameLoop();
  view.enemyHpGauge.gameLoop();
}