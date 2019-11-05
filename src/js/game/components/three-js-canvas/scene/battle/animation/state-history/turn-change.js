// @flow

import {Animate} from "../../../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {all} from "../../../../../../../animation/all";
import {delay, empty} from "../../../../../../../animation/delay";

/** ターン変更のアニメーション */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  const cameraX = activeTDPlayer.sprite.getObject3D().position.x;
  return all(
    all(
      view.td.camera.moveViewPoint({x: cameraX}, 300),
      view.td.camera.moveCamera({x: cameraX, z: '-50'}, 300)
    ).chain(
      delay(1300)
    ).chain(
      view.td.camera.moveViewPoint({x: 0}, 300),
      view.td.camera.moveCamera({x: 0, z: '+50'}, 300)
    ),

    delay(700).chain(all(
      // TODO バッテリー回復値をeffectに持たせる
      activeTDPlayer.recoverBattery.popUp(3),
      activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery),
    ))
  ).chain(
    delay(300)
  );
}