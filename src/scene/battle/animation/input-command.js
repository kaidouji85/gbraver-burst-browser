import {BattleSceneView} from "../view/index";
import type {BattleSceneState} from "../state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";
import {createEmptyTween} from "../../../tween/empty-tween";
import {createEmptyMultiTween} from "../../../tween/multi-tween/empty-multi-tween";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";

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
  sceneState.lastBatteryValue = initialValue;

  const start = createEmptyTween();
  const open = view.hudLayer.batterySelector.open(initialValue, enableMax);
  const refreshPlayer = view.hudLayer.playerGauge.refresh(player.armdozer.hp, player.armdozer.battery);
  const refreshEnemy = view.hudLayer.enemyGauge.refresh(enemy.armdozer.hp, enemy.armdozer.battery);
  const end = createEmptyTween();

  start.chain(open, refreshPlayer, refreshEnemy);
  refreshEnemy.chain(end);

  return {start, end};
}

function getEnableMax(effect: InputCommand, playerId: PlayerId): Tween {
  const playerCommand = effect.players.find(v => v.playerId === playerId);
  if (!playerCommand) {
    return 0;
  }

  return playerCommand.command
    .filter(v => v.type === 'BATTERY_COMMAND')
    .map(v => v.battery)
    .reduce((a, b) => Math.max(a, b), 0);
}