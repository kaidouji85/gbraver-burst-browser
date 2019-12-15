// @flow

import {Animate} from "../../../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {all} from "../../../../../../../animation/all";
import {delay, empty} from "../../../../../../../animation/delay";
import {dolly, toInitial} from "../td-camera";

/** ターン変更のアニメーション */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeStatus) {
    return empty();
  }

  const activePlayerX = activeTDPlayer.sprite.getObject3D().position.x;
  return dolly(view.td.camera, activePlayerX, 500)
    .chain(delay(100))
    .chain(all(
      activeTDPlayer.sprite.turnStart(),
      activeTDPlayer.turnStart.popUp()
        .chain(delay(700))
        .chain(all(
          // TODO バッテリー回復値をeffectに持たせる
          activeTDPlayer.recoverBattery.popUp(3),
          activeTDPlayer.gauge.battery(activeStatus.armdozer.battery),
        ))
    ))
    .chain(delay(100))
    .chain(activeTDPlayer.sprite.turnStartToStand())
    .chain(delay(800))
    .chain(toInitial(view.td.camera, 500));
}