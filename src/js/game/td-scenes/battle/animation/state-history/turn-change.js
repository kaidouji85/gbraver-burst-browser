// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, TurnChange} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";

/**
 * ターン変更のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーン状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<TurnChange>): Animate {
  const turnChange: TurnChange = gameState.effect;
  const activeTDArmdozer = view.td.armdozerObjects.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDArmdozer = view.hud.armdozers.find(v => v.playerId === gameState.activePlayerId);
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDArmdozer || !activeHUDArmdozer || !activeTDPlayer || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  const isBatteryRecover = 0 < turnChange.recoverBattery;
  const batteryGauge = isBatteryRecover
    ? activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery)
    : empty();
  const showRecoverBattery = isBatteryRecover
    ? activeTDPlayer.recoverBattery.show(turnChange.recoverBattery)
    : empty();
  return empty().chain(
    delay(800),
    batteryGauge,
    showRecoverBattery
      .chain(delay(400))
      .chain(activeTDPlayer.recoverBattery.hidden()),
    activeHUDPlayer.turnStart.show()
      .chain(delay(400))
      .chain(activeHUDPlayer.turnStart.hidden()),
  );
}