// @flow

import type {GameStateX, InputCommand} from "gbraver-burst-core";
import {all} from "../../../../animation/all";
import {Animate} from "../../../../animation/animate";
import {empty} from "../../../../animation/delay";
import {canBurstButtonPush} from "../../can-burst-button-push";
import {canPilotButtonPush} from "../../can-pilot-button-push";
import {getEnableMaxBattery} from "../../get-enable-max-battery";
import {getInitialBattery} from "../../get-initial-battery";
import type {StateAnimationProps} from "./state-animation-props";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param props 戦闘シーンビュー
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function inputCommandAnimation(props: StateAnimationProps, gameState: GameStateX<InputCommand>): Animate {
  const player = gameState.players.find(v => v.playerId === props.playerId);
  const playerCommand = gameState.effect.players.find(v => v.playerId === props.playerId);
  const playerHUD = props.view.hud.players.find(v => v.playerId === props.playerId);
  const enemy = gameState.players.find(v => v.playerId !== props.playerId);
  const enemyHUD = props.view.hud.players.find(v => v.playerId !== props.playerId);
  if (!player || !playerCommand || !playerHUD || !enemy || !enemyHUD) {
    return empty();
  }

  if (playerCommand.selectable === false) {
    return empty();
  }

  const isPlayerTurn = props.playerId === gameState.activePlayerId;
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
    props.view.td.gameObjects.turnIndicator.turnChange(isPlayerTurn),
    props.view.hud.gameObjects.batterySelector.open(initialValue, enableMax, okButtonLabel),
    props.view.hud.gameObjects.burstButton.open(canBurst),
    props.view.hud.gameObjects.pilotButton.open(canPilotSkill),
    props.view.hud.gameObjects.timeScaleButton.open(props.animationTimeScale),
  );
}