import {BattleSceneView} from "../view/index";
import type {BattleSceneState} from "../state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import {GameState} from "gbraver-burst-core";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param view 戦闘画面ビュー
 * @param sceneState 戦闘画面状態
 * @return アニメーション
 */
export function inputCommand(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): MultiTween {
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const enableMax = player ? player.armdozer.battery : 0;
  sceneState.lastBatteryValue = 0;
  return view.hudLayer.batterySelector.open(enableMax);
}