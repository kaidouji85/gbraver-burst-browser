import { GameStateX, InputCommand } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { StateAnimationProps } from "../state-animation-props";
import { showCommand } from "./show-command";
import { updateGauge } from "./update-gauge";

/**
 * コマンド入力フェイズのアニメーション
 * @param props 戦闘シーンビュー
 * @param gameState ゲーム状態
 * @returns アニメーション
 */
export function inputCommandAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<InputCommand>,
): Animate {
  const { playerId, view, controllerType, animatePlayer } = props;
  const { players, effect, activePlayerId } = gameState;

  const player = players.find((v) => v.playerId === playerId);
  const playerCommand = effect.players.find((v) => v.playerId === playerId);
  const activeTDArmdozer = view.td.armdozers.find(
    (v) => v.playerId === activePlayerId,
  );
  if (!player || !playerCommand || !activeTDArmdozer) {
    return empty();
  }

  if (playerCommand.selectable === false) {
    return empty();
  }

  const isPlayerTurn = playerId === activePlayerId;
  return all(
    ...updateGauge(view.hud.players, players),
    showCommand({
      view,
      isPlayerTurn,
      maxBattery: player.armdozer.maxBattery,
      commands: playerCommand.command,
      controllerType,
    }),
    view.hud.gameObjects.timeScaleButton.open(animatePlayer.timeScale),
    activeTDArmdozer.sprite().startActive(),
  );
}
