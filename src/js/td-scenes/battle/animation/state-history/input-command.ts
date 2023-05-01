import type { Command, GameStateX, InputCommand, PlayerState } from "gbraver-burst-core";

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { canBurstButtonPush } from "../../can-burst-button-push";
import { canPilotButtonPush } from "../../can-pilot-button-push";
import { getEnableMaxBattery } from "../../get-enable-max-battery";
import { getInitialBattery } from "../../get-initial-battery";
import type { StateAnimationProps } from "./state-animation-props";
import { BattleSceneView } from "../../view";

/** ボタン表示アニメーションパラメータ */
type VisibleButtonsParam = Readonly<{
  /** ビュー */
  view: BattleSceneView;
  /** プレイヤーターンか否か、trueでプレイヤーターン */
  isPlayerTurn: boolean;
  /** プレイヤーが選択可能なコマンド */
  commands: Command[];
  /** プレイヤーステート */
  player: PlayerState;
}>;

/**
 * ボタン表示アニメーション
 * @param param パラメータ
 * @return アニメーション
 */
function visibleButtons(param: Readonly<VisibleButtonsParam>): Animate {
  const enableMax = getEnableMaxBattery(param.commands);
  const initialValue = getInitialBattery(enableMax);
  const okButtonLabel = param.isPlayerTurn ? "Attack" : "Defense";
  const canBurst = canBurstButtonPush(param.commands);
  const canPilotSkill = canPilotButtonPush(param.commands);
  return all(
    param.view.hud.gameObjects.batterySelector.open(
      initialValue,
      param.player.armdozer.maxBattery,
      enableMax,
      okButtonLabel
    ),
    param.view.hud.gameObjects.burstButton.open(canBurst),
    param.view.hud.gameObjects.pilotButton.open(canPilotSkill),
  );
}


/**
 * コマンド入力フェイズのアニメーション
 *
 * @param props 戦闘シーンビュー
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function inputCommandAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<InputCommand>
): Animate {
  const player = gameState.players.find((v) => v.playerId === props.playerId);
  const playerCommand = gameState.effect.players.find(
    (v) => v.playerId === props.playerId
  );
  const playerTDArmdozer = props.view.td.armdozerObjects.find(
    (v) => v.playerId === props.playerId
  );
  const playerHUD = props.view.hud.players.find(
    (v) => v.playerId === props.playerId
  );
  const enemy = gameState.players.find((v) => v.playerId !== props.playerId);
  const enemyTDArmdozer = props.view.td.armdozerObjects.find(
    (v) => v.playerId !== props.playerId
  );
  const enemyHUD = props.view.hud.players.find(
    (v) => v.playerId !== props.playerId
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
    isPlayerTurn
      ? playerTDArmdozer.sprite().startActive()
      : enemyTDArmdozer.sprite().startActive(),
    playerHUD.gauge.hp(player.armdozer.hp),
    playerHUD.gauge.battery(player.armdozer.battery),
    enemyHUD.gauge.hp(enemy.armdozer.hp),
    enemyHUD.gauge.battery(enemy.armdozer.battery),
    props.view.td.gameObjects.turnIndicator.turnChange(isPlayerTurn),
    visibleButtons({
      ...props,
      isPlayerTurn,
      player,
      commands: playerCommand.command
    }),
    props.view.hud.gameObjects.timeScaleButton.open(props.animationTimeScale)
  );
}
