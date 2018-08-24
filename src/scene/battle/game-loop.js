// @flow

import {ThreeDimensionLayer} from "./view/three-dimension-layer/index";
import {HudLayer} from "./view/hud-layer/index";
import {BattleSceneView} from "./view/index";
import type {BattleSceneState} from "./state";

// TODO 削除する
/** ゲームループ時の処理 */
export function gameLoop(view: BattleSceneView, state: BattleSceneState, time: DOMHighResTimeStamp): void {
  threeDimension(view.threeDimensionLayer, time);
  view.render();
}

/** 3Dレイヤーのゲームループ時の処理 */
function threeDimension(view: ThreeDimensionLayer, time: DOMHighResTimeStamp) {
  view.playerSprite.gameLoop(time, view.camera);
  view.enemySprite.gameLoop(time, view.camera);
  view.stage.gameLoop(view.camera);
}