// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, UpdateRemainingTurn} from "gbraver-burst-core";
import {empty} from "../../../../../animation/delay";
import {LightningDozerTD} from "../../view/td/armdozer-objects/lightning-dozer";
import {all} from "../../../../../animation/all";

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
