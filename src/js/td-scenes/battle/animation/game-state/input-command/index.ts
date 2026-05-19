import { GameStateX, InputCommand } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { getEnableMaxBattery } from "../../../get-enable-max-battery";
import { getInitialBattery } from "../../../get-initial-battery";
import { getPredicatedDamage } from "../get-predicated-damage";
import { StateAnimationProps } from "../state-animation-props";
import { activeArmdozerSprite } from "./active-armdozer-sprite";
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
  const { playerId, view, controllerType, animationTimeScale } = props;
  const { players, effect, activePlayerId } = gameState;

  const player = players.find((v) => v.playerId === playerId);
  const playerCommand = effect.players.find((v) => v.playerId === playerId);
  const defenderHUD = view.hud.players.find(
    (h) => h.playerId !== activePlayerId,
  );
  if (!player || !playerCommand || !defenderHUD) {
    return empty();
  }

  if (!playerCommand.selectable) {
    return empty();
  }

  const isPlayerTurn = playerId === activePlayerId;
  const enableMaxBattery = getEnableMaxBattery(playerCommand.command);
  const initialBattery = getInitialBattery(enableMaxBattery);
  const nowPlayerBattery =
    props.controllerType === "BigButton"
      ? initialBattery
      : player.armdozer.battery;
  const predicatedDamage = getPredicatedDamage({
    hudPlayers: view.hud.players,
    players,
    activePlayerId,
    playerId,
    nowPlayerBattery,
  });
  return all(
    updateGauge(view.hud.players, players),
    showCommand({
      view,
      isPlayerTurn,
      maxBattery: player.armdozer.maxBattery,
      commands: playerCommand.command,
      controllerType,
    }),
    view.hud.gameObjects.timeScaleButton.open(animationTimeScale),
    ...view.hud.players.map((p) => p.statusIcon.open()),
    activeArmdozerSprite(view.td.armdozers, activePlayerId),
    defenderHUD.predicatedDamage.show(predicatedDamage),
  );
}
