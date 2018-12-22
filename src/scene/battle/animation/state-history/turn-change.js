// @flow

import {Animate} from "../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {TurnChange} from "gbraver-burst-core/lib/effect/turn-change/turn-change";
import {all} from "../../../../animation/all";
import {delay, empty} from "../../../../animation/delay";

export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: TurnChange): Animate {
  const isActivePlayer = gameState.activePlayerId === sceneState.playerId;
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId) || gameState.players[0];

  return empty();

  // const {
  //   playerGauge,
  //   playerRecoverBattery,
  //   enemyGauge,
  //   enemyRecoverBattery
  // } = view.tdLayer;
  // const activeRecoverBattery = isActivePlayer ? playerRecoverBattery : enemyRecoverBattery;
  // const activeGauge = isActivePlayer ? playerGauge : enemyGauge;
  //
  // return delay(500)
  //   .chain(
  //     all(
  //       // TODO バッテリー回復値をeffectに持たせる
  //       activeRecoverBattery.popUp(3),
  //       activeGauge.battery(activeStatus.armdozer.battery)
  //     )
  //   );
}