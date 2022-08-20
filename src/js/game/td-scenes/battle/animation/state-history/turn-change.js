// @flow
import type {GameStateX, TurnChange} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import {process} from '../../../../../animation/process';
import type {ReferableBattleSceneProps} from "./referable-battle-scene-props";

/**
 * ターン変更のアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function turnChangeAnimation(props: ReferableBattleSceneProps, gameState: GameStateX<TurnChange>): Animate {
  const turnChange: TurnChange = gameState.effect;
  const activeTDPlayer = props.view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = props.view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  const isTurnChange = 0 < turnChange.recoverBattery;
  const turnStart = activeHUDPlayer.turnStart.show()
    .chain(delay(400))
    .chain(activeHUDPlayer.turnStart.hidden());
  const forTurnChange = empty().chain(
    delay(800),
    turnStart,
    activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery),
    activeTDPlayer.recoverBattery.show(turnChange.recoverBattery)
      .chain(delay(400))
      .chain(activeTDPlayer.recoverBattery.hidden()),
  );
  const forContinuousAttack = empty().chain(
    delay(800),
    turnStart,
    process(() => {
      props.sounds.batteryRecover.play();
    })
  );
  return isTurnChange ? forTurnChange : forContinuousAttack;
}