import {BattleSceneView} from "../view/index";
import type {BattleSceneState} from "../state/battle-scene-state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";
import {createEmptyTween} from "../../../tween/empty-tween";
import {createEmptyMultiTween} from "../../../tween/multi-tween/empty-multi-tween";
import {getEnableMax} from "../state/get-enable-max";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param view 戦闘画面ビュー
 * @param sceneState 戦闘画面状態
 * @param gameState ゲーム状態
 * @param effect コマンド入力フェイズの効果
 * @return アニメーション
 */
export function inputCommandAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: InputCommand): MultiTween {
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const enemy = gameState.players.find(v => v.playerId !== sceneState.playerId);
  if (!player || !enemy) {
    return createEmptyMultiTween();
  }

  const enableMax = getEnableMax(effect, sceneState.playerId);
  const initialValue = 0;
  const isPlayerTurn = sceneState.playerId === gameState.activePlayerId;
  const okButtonLabel = isPlayerTurn ? 'Attack' : 'Defense';

  const start = createEmptyTween()
    .onStart(() => {
      view.hudLayer.turnIndicator.turnChange(isPlayerTurn);
    });
  const open = view.hudLayer.batterySelector.open(initialValue, enableMax, okButtonLabel);
  const refreshPlayer = view.hudLayer.playerGauge.refresh(player.armdozer.hp, player.armdozer.battery);
  const refreshEnemy = view.hudLayer.enemyGauge.refresh(enemy.armdozer.hp, enemy.armdozer.battery);
  const end = createEmptyTween();

  start.chain(
    open.start,
    refreshPlayer,
    refreshEnemy
  );
  refreshEnemy.chain(end);

  return {start, end};
}