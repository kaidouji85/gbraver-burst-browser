import {BattleSceneView} from "../view/index";
import type {BattleSceneState} from "../state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

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
  const initialValue = 0;
  sceneState.lastBatteryValue = initialValue;
  return view.hudLayer.batterySelector.open(initialValue, enableMax);
}