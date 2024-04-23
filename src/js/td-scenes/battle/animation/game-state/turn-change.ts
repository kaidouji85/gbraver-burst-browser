import type { GameStateX, TurnChange } from "gbraver-burst-core";

import { Animate } from "../../../../animation/animate";
import { delay, empty } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import type { StateAnimationProps } from "./state-animation-props";

/**
 * ターン変更のアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function turnChangeAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<TurnChange>,
): Animate {
  const turnChange: TurnChange = gameState.effect;
  const activeTDPlayer = props.view.td.players.find(
    (v) => v.playerId === gameState.activePlayerId,
  );
  const activeTDArmdozer = props.view.td.armdozers.find(
    (v) => v.playerId === gameState.activePlayerId,
  );
  const activeHUDPlayer = props.view.hud.players.find(
    (v) => v.playerId === gameState.activePlayerId,
  );
  const activeStatus = gameState.players.find(
    (v) => v.playerId === gameState.activePlayerId,
  );
  if (
    !activeTDPlayer ||
    !activeTDArmdozer ||
    !activeHUDPlayer ||
    !activeStatus
  ) {
    return empty();
  }

  const isTurnChange = 0 < turnChange.recoverBattery;
  const turnStart = activeHUDPlayer.turnStart
    .show()
    .chain(delay(400))
    .chain(activeHUDPlayer.turnStart.hidden());
  const forTurnChange = empty().chain(
    delay(800),
    turnStart,
    activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery),
    activeTDPlayer.recoverBattery
      .show(turnChange.recoverBattery)
      .chain(delay(400))
      .chain(activeTDPlayer.recoverBattery.hidden()),
    activeTDArmdozer.sprite().startActive(),
  );
  const forContinuousAttack = empty().chain(
    delay(800),
    turnStart,
    onStart(() => {
      props.se.play(props.sounds.batteryRecover);
    }),
    activeTDArmdozer.sprite().startActive(),
  );
  return isTurnChange ? forTurnChange : forContinuousAttack;
}
