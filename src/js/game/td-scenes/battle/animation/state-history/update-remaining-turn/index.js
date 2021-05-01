// @flow

import {Animate} from "../../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameStateX, UpdateRemainingTurn} from "gbraver-burst-core";
import {empty} from "../../../../../../animation/delay";
import {lightningDozer, castLightningDozerEndEffect} from "./lightning-dozer";
import {toEndArmDozerEffectParams} from "./animation-param";
import {all} from "../../../../../../animation/all";

/**
 * 効果継続ターン更新アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function updateRemainingTurnAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<UpdateRemainingTurn>): Animate {
  const animations: Animate[] = gameState.players.map(player =>
    toEndArmDozerEffectParams(player.playerId, view, gameState)
      .map(param => {
        const lightningDozerParam = castLightningDozerEndEffect(param);
        if (lightningDozerParam) {
          return lightningDozer(lightningDozerParam);
        }

        return empty();
      })
      .reduce((a, b) => a.chain(b), empty())
  );
  return all(...animations);
}
