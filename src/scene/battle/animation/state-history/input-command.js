// @flow

import {TweenAnimation} from "../../../../animation/tween-animation";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";
import {getEnableMax, getInitialBattery} from "../../ui-logic/battery-selector";
import {delay, empty} from "../../../../animation/delay";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param view 戦闘画面ビュー
 * @param sceneState 戦闘画面状態
 * @param gameState ゲーム状態
 * @param effect コマンド入力フェイズの効果
 * @return アニメーション
 */
export function inputCommandAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: InputCommand): TweenAnimation {
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const enemy = gameState.players.find(v => v.playerId !== sceneState.playerId);
  if (!player || !enemy) {
    return empty();
  }

  const enableMax = getEnableMax(effect, sceneState.playerId);
  const initialValue = getInitialBattery(enableMax);
  const isPlayerTurn = sceneState.playerId === gameState.activePlayerId;
  const okButtonLabel = isPlayerTurn ? 'Attack' : 'Defense';

  const {playerGauge, enemyGauge, turnIndicator, playerSprite, enemySprite} = view.threeDimensionLayer;
  const {batterySelector, burstButton} = view.hudLayer;

  return empty()
    .chain(
      delay(500),
      playerGauge.refresh(player.armdozer.hp, player.armdozer.battery),
      enemyGauge.refresh(enemy.armdozer.hp, enemy.armdozer.battery),
      turnIndicator.turnChange(isPlayerTurn),
      batterySelector.open(initialValue, enableMax, okButtonLabel),
      burstButton.visible()
    ).chain(
      isPlayerTurn ? playerSprite.myTurn() : playerSprite.stand(),
      isPlayerTurn ? enemySprite.stand() : enemySprite.myTurn(),
    );
}