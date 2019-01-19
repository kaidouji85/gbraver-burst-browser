// @flow

import {Animate} from "../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {all} from "../../../../animation/all";

/** ターン変更のアニメーション */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const isActivePlayer = gameState.activePlayerId === sceneState.playerId;
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId) || gameState.players[0];
  const activeArmdozer = isActivePlayer ? view.td.player : view.td.enemy;
  return all(
    // TODO バッテリー回復値をeffectに持たせる
    activeArmdozer.recoverBattery.popUp(3),
    activeArmdozer.gauge.battery(activeStatus.armdozer.battery),
  );
}