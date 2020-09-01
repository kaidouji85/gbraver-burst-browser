// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState, TurnChange} from "gbraver-burst-core";
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
  if (gameState.effect.name !== 'TurnChange') {
    return empty();
  }
  const turnChange: TurnChange = gameState.effect;

  const activeTDPlayer = view.td.players.find(v => v.playerId === gameState.activePlayerId);
  const activeTDSprite = view.td.sprites.find(v => v.playerId === gameState.activePlayerId);
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  const activeStatus = gameState.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeTDPlayer || !activeTDSprite || !activeHUDPlayer || !activeStatus) {
    return empty();
  }

  return all(
    activeTDSprite.sprite.turnStart(),
    attentionArmDozer(view.td.camera, activeTDSprite.sprite, 500)
      .chain(delay(500))
      .chain(activeTDPlayer.turnStart.popUp())
      .chain(delay(500))
      .chain((0 < turnChange.recoverBattery)
        ? all(
          activeTDPlayer.recoverBattery.popUp(turnChange.recoverBattery),
          activeHUDPlayer.gauge.battery(activeStatus.armdozer.battery)
        )
        : empty()
      )
  )
    .chain(delay(500))
    .chain(all(
      activeTDSprite.sprite.turnStartToStand(),
      toInitial(view.td.camera, 500))
    )
    .chain(delay(500));
}