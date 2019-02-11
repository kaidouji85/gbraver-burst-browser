// @flow

import {Animate} from "../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {all} from "../../../../animation/all";
import {empty} from "../../../../animation/delay";

/** ターン変更のアニメーション */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const activeArmdozer = view.td.armdozers.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeArmdozer || !activeStatus) {
    return empty();
  }

  return all(
    // TODO バッテリー回復値をeffectに持たせる
    activeArmdozer.recoverBattery.popUp(3),
    activeArmdozer.gauge.battery(activeStatus.armdozer.battery),
  );
}