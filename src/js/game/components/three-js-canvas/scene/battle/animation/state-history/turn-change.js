// @flow

import {Animate} from "../../../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {all} from "../../../../../../../animation/all";
import {delay, empty} from "../../../../../../../animation/delay";
import {dolly} from "../td-camera";

/** ターン変更のアニメーション */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeStatus) {
    return empty();
  }

  const activePlayerX = activeTDPlayer.sprite.getObject3D().position.x;
  return all(
    dolly(view.td.camera,activePlayerX, 500)
      .chain(delay(3000)),

    delay(700)
      .chain(activeTDPlayer.turnStart.popUp())
      .chain(delay(300))
      .chain(all(
        // TODO バッテリー回復値をeffectに持たせる
        activeTDPlayer.recoverBattery.popUp(3),
        activeTDPlayer.gauge.battery(activeStatus.armdozer.battery),
      )),

  ).chain(
    delay(800)
  );
}