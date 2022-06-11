// @flow

import type {GameState} from "gbraver-burst-core";
import {all} from "../../../../../animation/all";
import {Animate} from "../../../../../animation/animate";
import {empty} from "../../../../../animation/delay";
import type {BattleSceneState} from "../../state/battle-scene-state";
import {BattleSceneView} from "../../view";

/**
 * ゲージを最新状態に更新する
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @return アニメーション
 */
export function updateGauge(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const player = gameState.players.find(v => v.playerId === sceneState.playerId);
  const playerHUD = view.hud.players.find(v => v.playerId === sceneState.playerId);
  const enemy = gameState.players.find(v => v.playerId !== sceneState.playerId);
  const enemyHUD = view.hud.players.find(v => v.playerId !== sceneState.playerId);
  if (!player || !playerHUD || !enemy || !enemyHUD) {
    return empty();
  }

  return all(
    playerHUD.gauge.hp(player.armdozer.hp),
    playerHUD.gauge.battery(player.armdozer.battery),
    enemyHUD.gauge.hp(enemy.armdozer.hp),
    enemyHUD.gauge.battery(enemy.armdozer.battery)
  );
}