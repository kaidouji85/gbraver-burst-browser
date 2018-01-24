// @flow

import {ThreeDimensionLayer} from "../view/three-dimension-layer";
import {HudLayer} from "../view/hud-layer/index";
import {BattleSceneView} from "../view";
import type {BattleSceneState} from "../index";
import type {GameLoopAction} from "../../action";

/** ゲームループ時の処理 */
export function gameLoop(view: BattleSceneView, state: BattleSceneState, action: GameLoopAction): void {
  threeDimension(view.threeDimensionLayer, action.time);
  hud(view.hudLayer, action.time);

  view.render();
}

/** 3Dレイヤーのゲームループ時の処理 */
function threeDimension(view: ThreeDimensionLayer, time: DOMHighResTimeStamp) {
  view.playerSprite.gameLoop(view.camera, time);
  view.enemySprite.gameLoop(view.camera, time);
  view.stage.gameLoop(view.camera);
}

/** hudレイヤーのゲームループ時の処理 */
function hud(view: HudLayer, time: DOMHighResTimeStamp) {
  view.playerHpGauge.gameLoop(time);
  view.playerBatteryGauge.gameLoop(time);
  view.enemyHpGauge.gameLoop(time);
  view.enemyBatteryGauge.gameLoop(time);
}