// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, UpdateRemainingTurn} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";
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
  const lightningDozerTDs: LightningDozerTD[] = view.td.armdozerObjects
    .filter(v => v instanceof LightningDozerTD)
    .map(v => ((v: any): LightningDozerTD));
  const endLightningBarrier = gameState.effect.endArmdozerEffects
    .filter(end => end.effect.type === 'TryReflect' && end.effect.effect === 'Lightning');
  const endLightningBarrierAnimates: Animate[] = lightningDozerTDs.map(td => {
    const hasEndEffect = endLightningBarrier.find(end => end.playerId === td.playerId);
    return hasEndEffect ? td.lightningBarrier.hidden() : empty();
  });
  return empty().chain(
    delay(0),
    ...endLightningBarrierAnimates
  );
}
