// @flow

import {Animate} from "../../../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {all} from "../../../../../../../animation/all";
import {delay, empty} from "../../../../../../../animation/delay";
import {zoomIn} from "../td-camera";

/** ターン変更のアニメーション */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  const activePlayerX = activeTDPlayer.sprite.getObject3D().position.x;
  return all(
    zoomIn(view.td.camera,activePlayerX, 500)
      .chain(delay(3000)),

    delay(700).chain(all(
      activeHUDPlayer.turnStart.show()
        .chain(delay(1000))
        .chain(activeHUDPlayer.turnStart.hidden())
    )).chain(
      delay(300)
    ).chain(
      // TODO バッテリー回復値をeffectに持たせる
      activeTDPlayer.recoverBattery.popUp(3),
      activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery),
    ),
  ).chain(
    delay(800)
  );
}