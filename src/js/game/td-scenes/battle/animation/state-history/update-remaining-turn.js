// @flow

import type {GameStateX, UpdateRemainingTurn} from "gbraver-burst-core";
import {all} from "../../../../../animation/all";
import {Animate} from "../../../../../animation/animate";
import {empty} from "../../../../../animation/delay";
import type {BattleSceneState} from "../../state/battle-scene-state";
import {BattleSceneView} from "../../view";
import {LightningDozerTD} from "../../view/td/armdozer-objects/lightning-dozer";

/**
 * 効果継続ターン更新アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function updateRemainingTurnAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<UpdateRemainingTurn>): Animate {
  const endLightningBarrier = gameState.effect.endArmdozerEffects
    .filter(end => end.effect.type === 'TryReflect' && end.effect.effect === 'Lightning');
  const endLightningBarrierAnimates: Animate[] = view.td.armdozerObjects
    .filter(td => endLightningBarrier.find(end => end.playerId === td.playerId))
    .map(td => td instanceof LightningDozerTD ? td.lightningBarrier.hidden() : empty());
  return all(
    ...endLightningBarrierAnimates
  );
}
