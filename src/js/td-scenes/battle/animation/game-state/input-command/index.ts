import type { GameStateX, InputCommand } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import type { StateAnimationProps } from "../state-animation-props";
import { showCommand } from "./show-command";

/**
 * コマンド入力フェイズのアニメーション
 *
 * @param props 戦闘シーンビュー
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function inputCommandAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<InputCommand>,
): Animate {
  const player = gameState.players.find((v) => v.playerId === props.playerId);
  const playerCommand = gameState.effect.players.find(
    (v) => v.playerId === props.playerId,
  );
  const playerTDArmdozer = props.view.td.armdozerObjects.find(
    (v) => v.playerId === props.playerId,
  );
  const playerHUD = props.view.hud.players.find(
    (v) => v.playerId === props.playerId,
  );
  const enemy = gameState.players.find((v) => v.playerId !== props.playerId);
  const enemyTDArmdozer = props.view.td.armdozerObjects.find(
    (v) => v.playerId !== props.playerId,
  );
  const enemyHUD = props.view.hud.players.find(
    (v) => v.playerId !== props.playerId,
  );

  if (
    !player ||
    !playerTDArmdozer ||
    !playerCommand ||
    !playerHUD ||
    !enemy ||
    !enemyTDArmdozer ||
    !enemyHUD
  ) {
    return empty();
  }

  if (playerCommand.selectable === false) {
    return empty();
  }

  const isPlayerTurn = props.playerId === gameState.activePlayerId;
  return all(
    playerHUD.gauge.hp(player.armdozer.hp),
    playerHUD.gauge.battery(player.armdozer.battery),
    enemyHUD.gauge.hp(enemy.armdozer.hp),
    enemyHUD.gauge.battery(enemy.armdozer.battery),
    showCommand({
      view: props.view,
      isPlayerTurn,
      maxBattery: player.armdozer.maxBattery,
      commands: playerCommand.command,
      controllerType: props.controllerType,
    }),
    props.view.hud.gameObjects.timeScaleButton.open(props.animationTimeScale),
  );
}
