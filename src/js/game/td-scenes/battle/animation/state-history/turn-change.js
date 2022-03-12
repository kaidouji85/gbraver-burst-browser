// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, TurnChange} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";
import {process} from '../../../../../animation/process';
import {BattleSceneSounds} from "../../sounds/sounds";

/**
 * ターン変更のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーン状態
 * @param sounds 戦闘シーン効果音
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, sounds: BattleSceneSounds, gameState: GameStateX<TurnChange>): Animate {
  const turnChange: TurnChange = gameState.effect;
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
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
      sounds.batteryRecover.play();
    })
  );
  return isTurnChange ? forTurnChange : forContinuousAttack;
}