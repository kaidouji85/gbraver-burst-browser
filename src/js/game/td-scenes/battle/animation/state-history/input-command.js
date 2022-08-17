// @flow

import type {GameStateX, InputCommand} from "gbraver-burst-core";
import {all} from "../../../../../animation/all";
import {Animate} from "../../../../../animation/animate";
import {empty} from "../../../../../animation/delay";
import {canBurstButtonPush} from "../../can-burst-button-push";
import {canPilotButtonPush} from "../../can-pilot-button-push";
import {getEnableMaxBattery} from "../../get-enable-max-battery";
import {getInitialBattery} from "../../get-initial-battery";
import type {BattleSceneState} from "../../state/battle-scene-state";
import {BattleSceneView} from "../../view";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param view 戦闘画面ビュー
 * @param sceneState 戦闘画面状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function inputCommandAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<InputCommand>): Animate {
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const playerCommand = gameState.effect.players.find(v => v.playerId === sceneState.playerId);
  const playerHUD = view.hud.players.find(v => v.playerId === sceneState.playerId);
  const enemy = gameState.players.find(v => v.playerId !== sceneState.playerId);
  const enemyHUD = view.hud.players.find(v => v.playerId !== sceneState.playerId);
  if (!player || !playerCommand || !playerHUD || !enemy || !enemyHUD) {
    return empty();
  }

  if (playerCommand.selectable === false) {
    return empty();
  }

  const isPlayerTurn = sceneState.playerId === gameState.activePlayerId;
  const enableMax = getEnableMaxBattery(playerCommand.command);
  const initialValue = getInitialBattery(enableMax);
  const okButtonLabel = isPlayerTurn ? 'Attack' : 'Defense';
  const canBurst = canBurstButtonPush(playerCommand.command);
  const canPilotSkill = canPilotButtonPush(playerCommand.command);
  return all(
    playerHUD.gauge.hp(player.armdozer.hp),
    playerHUD.gauge.battery(player.armdozer.battery),
    enemyHUD.gauge.hp(enemy.armdozer.hp),
    enemyHUD.gauge.battery(enemy.armdozer.battery),
    view.td.gameObjects.turnIndicator.turnChange(isPlayerTurn),
    view.hud.gameObjects.batterySelector.open(initialValue, enableMax, okButtonLabel),
    view.hud.gameObjects.burstButton.open(canBurst),
    view.hud.gameObjects.pilotButton.open(canPilotSkill),
    view.hud.gameObjects.timeScaleButton.open(sceneState.animationTimeScale),
  );
}