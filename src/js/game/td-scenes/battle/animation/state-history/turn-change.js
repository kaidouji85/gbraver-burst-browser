// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {all} from "../../../../../animation/all";
import {delay, empty} from "../../../../../animation/delay";
import {attentionArmDozer, toInitial} from "../td-camera";

/**
 * ターン変更のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーン状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeTDSprite = view.td.sprites.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeTDSprite || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  return all(
    attentionArmDozer(view.td.camera, activeTDSprite.sprite, 500)
      .chain(delay(500))
      .chain(activeTDPlayer.turnStart.popUp())
      .chain(delay(300))
      .chain(all(
        // TODO バッテリー回復値をeffectに持たせる
        activeTDPlayer.recoverBattery.popUp(3),
        activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery))
      ),
    activeTDSprite.sprite.turnStart(),
  ).chain(delay(800)
  ).chain(all(
    activeTDSprite.sprite.turnStartToStand(),
    toInitial(view.td.camera, 500))
  ).chain(delay(500));
}